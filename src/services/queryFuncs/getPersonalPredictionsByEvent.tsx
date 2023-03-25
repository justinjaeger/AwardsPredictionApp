import _ from 'lodash';
import { CategoryName, ContenderVisibility, PredictionType } from '../../API';
import { getAwardsBodyCategories } from '../../constants/categories';
import { PredictionSetByUserIdAndEventIdQuery } from '../../graphqlCustom/types';
import { iEvent, iIndexedPredictionsByCategory } from '../../types';
import { sortPersonalPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';
import { iApiResponse } from '../utils';

const getPersonalPredictionsByEvent = async (
  event: iEvent,
  userId: string | undefined,
) => {
  if (!userId) return {};
  const predictionSetQueries = await getPersonalPredictionsByEventLimitSlots(
    event,
    userId,
  );
  const pSets = _.flatten(
    predictionSetQueries?.map(
      (predictionSets) => predictionSets?.predictionSetByUserIdAndEventId?.items,
    ),
  );
  if (!pSets) return {};
  // Format the prediction sets
  const data: iIndexedPredictionsByCategory = {};
  pSets.forEach((ps) => {
    const categoryId = ps?.categoryId || '';
    const predictions = (ps?.predictions?.items || []).map((p) => ({
      ranking: p?.ranking || 0,
      accolade: p?.contender.accolade || undefined,
      visibility: p?.contender.visibility || ContenderVisibility.VISIBLE,
      predictionType: ps?.type || PredictionType.NOMINATION,
      contenderId: p?.contenderId || '',
      contenderMovie: p?.contender.movie || undefined,
      contenderPerson: p?.contender.person || undefined,
      contenderSong: p?.contender.song || undefined,
      lastUpdated: p?.updatedAt || '',
    }));
    const sortedPredictions = sortPersonalPredictions(predictions);
    data[categoryId] = { predictions: sortedPredictions, updatedAt: ps?.updatedAt || '' };
  });
  return data;
};

export default getPersonalPredictionsByEvent;

/**
 * Returns exactly the number of predictions per slots specified in the category
 */
const getPersonalPredictionsByEventLimitSlots = async (
  event: iEvent,
  userId: string,
  defaultSlots?: number,
): Promise<PredictionSetByUserIdAndEventIdQuery[]> => {
  const SLOTS = defaultSlots || 5;
  const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
  // group by slots
  const iterable = _.entries(awardsBodyCategories).filter(([, c]) => c !== undefined); // [{ 10: { catData} }]
  const grouped = _.groupBy(iterable, ([, c]) => c?.slots || SLOTS); // { 10: [PICTURE: {}], 5: [DIRECTOR: {}] }

  // get categories that deviate from default num of slots
  // we do this for deviant categories because it costs to fetch their ids, which are required to filter predictions
  const categoriesWithNotDeviantSlotNum = _.entries(grouped).filter(
    ([k]) => k !== SLOTS.toString(),
  );

  // get categories that have deviant num of slots

  // push requests to array
  const categoryRequests = [];
  for (const [, categories] of categoriesWithNotDeviantSlotNum) {
    const categoryNames = categories.map(([k]) => k) as CategoryName[];
    categoryRequests.push(ApiServices.getCategoriesByName(categoryNames));
  }
  // execute all requests
  const results = await Promise.all(categoryRequests);

  // format requests as: { 10: [catId1, catId2], 5: [catId3, catId4] }
  const slotsToCategoryIds: { [slots: string]: string[] } = {};
  const iterableSlots = categoriesWithNotDeviantSlotNum.map(([k]) => k);
  for (let i = 0; i < results.length; i++) {
    const { data } = results[i];
    const categoryIds = data?.listCategories?.items.map((c) => c?.id || '') || [];
    slotsToCategoryIds[iterableSlots[i]] = categoryIds;
  }

  const requests: Promise<iApiResponse<PredictionSetByUserIdAndEventIdQuery>>[] = [];

  // loop through deviant slot categories and fetch [key] number of predictions for each of these categories
  for (const [slots, categoryIds] of _.entries(slotsToCategoryIds)) {
    const req: Promise<
      iApiResponse<PredictionSetByUserIdAndEventIdQuery>
    > = ApiServices.getPersonalPredictionsByEventLimitSlots(
      userId,
      { or: categoryIds.map((id) => ({ categoryId: { eq: id } })) },
      parseInt(slots, 10),
    );
    requests.push(req);
  }

  // fetch remaining non-deviant predictions
  const allDeviantCategoryIds = _.flatten(Object.values(slotsToCategoryIds));
  const req = ApiServices.getPersonalPredictionsByEventLimitSlots(
    userId,
    { and: allDeviantCategoryIds.map((id) => ({ categoryId: { ne: id } })) },
    SLOTS,
  );
  requests.push(req);

  const predictionSetsResponse = await Promise.all(requests);
  const output = predictionSetsResponse
    .map((o) => o.data)
    .filter((o) => o !== undefined) as PredictionSetByUserIdAndEventIdQuery[];

  return output;
};
