import {
  CategoryIsShortlisted,
  ContenderAccolade,
  ContenderVisibility,
  PredictionType,
} from '../../API';
import { iIndexedPredictionsByCategory, iPrediction } from '../../types';
import { isWithinLastMonth } from '../../util/isWithinLastMonth';
import { sortCommunityPredictionsByRanking } from '../../util/sortPredictions';
import ApiServices from '../graphql';

const getCommunityPredictionsByEvent = async (eventId: string, includeHidden = false) => {
  // TODO: move this logic to lambda function. Pull directly from CommunityPredictionSet
  const { data: predictionSets } = await ApiServices.getCommunityPredictionsByEvent(
    eventId,
  );
  const pSets = predictionSets?.communityPredictionSetByEventId?.items;
  if (!pSets) return {}; // handle in some other way?
  // Format the prediction sets
  const data: iIndexedPredictionsByCategory = {};
  pSets.forEach((ps) => {
    const categoryId = ps?.categoryId || '';
    const predictions: iPrediction[] = [];
    const contenders = ps?.predictions?.items || [];
    // populate predictions array
    contenders.forEach((p) => {
      // NOTE: Below is same as in updateCommuityPredictions/getPredictions. So it should all be unnecessary. But can keep as safety
      const contender = p?.contender;
      if (!contender) return;
      const ranking = p?.ranking || 0;
      const lastUpdated = p?.updatedAt || '';
      // don't include hidden contenders in tally
      // don't include rankings higher than 50
      // don't include if prediction is more than a month old
      // don't include if category is shortlisted and contender doesn't have an accolade
      // don't include if nominations have happened and contender is not a nominee
      const isRecentPrediction = isWithinLastMonth(lastUpdated);
      const isHidden = contender.visibility === ContenderVisibility.HIDDEN;
      const isLowOnList = ranking > 50;
      const contenderIsNotShortlisted =
        ps?.category.isShortlisted === CategoryIsShortlisted.TRUE && !contender.accolade;
      const contenderIsNotNominated =
        ps?.type === PredictionType.WIN &&
        contender.accolade !== ContenderAccolade.NOMINEE &&
        contender.accolade !== ContenderAccolade.WINNER;
      if (includeHidden) {
        // skip
      } else if (
        !isRecentPrediction ||
        isLowOnList ||
        isHidden ||
        contenderIsNotShortlisted ||
        contenderIsNotNominated
      ) {
        return;
      }
      // Have to parse this because the field is a json stringified object
      const indexedRankings = (p?.indexedRankings
        ? JSON.parse(p?.indexedRankings)
        : {}) as { [key: number]: number };

      predictions.push({
        ranking: p?.ranking || 0,
        accolade: contender.accolade || undefined,
        indexedRankings: indexedRankings,
        predictionType: ps?.type || PredictionType.NOMINATION,
        visibility: contender.visibility || ContenderVisibility.VISIBLE,
        contenderId: contender.id || '',
        contenderMovie: contender.movie || undefined,
        contenderPerson: contender.person || undefined,
        contenderSong: contender.song || undefined,
      });
    });
    const sortedPredictions = sortCommunityPredictionsByRanking(predictions);
    data[categoryId] = { predictions: sortedPredictions, updatedAt: ps?.updatedAt || '' };
  });
  return data;
};

export default getCommunityPredictionsByEvent;
