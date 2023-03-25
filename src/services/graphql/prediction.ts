import {
  CreatePredictionMutation,
  CreatePredictionMutationVariables,
  CreatePredictionSetMutation,
  CreatePredictionSetMutationVariables,
  DeletePredictionMutation,
  DeletePredictionMutationVariables,
  DeletePredictionSetMutation,
  DeletePredictionSetMutationVariables,
  ListPredictionSetsQueryVariables,
  ModelPredictionSetFilterInput,
  PredictionSetByUserIdAndEventIdQueryVariables,
  PredictionType,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as customQueries from '../../graphqlCustom/queries';
import {
  ListPredictionSetsQuery,
  PredictionSetByUserIdAndEventIdQuery,
} from '../../graphqlCustom/types';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

// there can only be one prediction set from these parameters
export type iPredictionSetParams = {
  userId: string;
  categoryId: string;
  eventId: string;
  type: PredictionType;
};

type iPredictionParams = {
  userId: string;
  predictionSetId: string;
  contenderId: string;
  ranking: number;
};

// NOTE: Should be atomic
const deletePredictions = async (
  params: iPredictionSetParams,
): Promise<iApiResponse<any>> => {
  try {
    // get prediction sets (user + category)
    const { data: pSets } = await getPredictionSets(params);
    const predictionSets = pSets?.listPredictionSets?.items;
    if (!predictionSets) {
      // no prediction sets found, which is fine
      return { status: 'success' };
    }

    // Delete all predictions associated (there should only be one predictionSet, but for safety, loop through)
    predictionSets.forEach(async (ps) => {
      if (!ps?.predictions) return;
      await Promise.all(
        ps.predictions.items.map(async (p) => {
          if (!p?.id) return;
          return deletePrediction(p.id);
        }),
      );
      // Delete prediction set
      await deletePredictionSetById(ps.id);
    });

    return { status: 'success' };
  } catch (err) {
    return handleError('error deleting predictions by prediction set', err);
  }
};

const deletePredictionSetById = async (
  id: string,
): Promise<iApiResponse<DeletePredictionSetMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      DeletePredictionSetMutation,
      DeletePredictionSetMutationVariables
    >(mutations.deletePredictionSet, { input: { id } });
    if (!data?.deletePredictionSet) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting prediction set', err);
  }
};

const createPredictionSet = async (
  params: iPredictionSetParams,
): Promise<iApiResponse<CreatePredictionSetMutation>> => {
  const { userId, categoryId, eventId, type } = params;
  try {
    const { data, errors } = await GraphqlAPI<
      CreatePredictionSetMutation,
      CreatePredictionSetMutationVariables
    >(mutations.createPredictionSet, {
      input: {
        userId,
        categoryId,
        eventId,
        type,
      },
    });
    if (!data?.createPredictionSet) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating prediction set', err);
  }
};

const createPrediction = async (
  params: iPredictionParams,
): Promise<iApiResponse<CreatePredictionMutation>> => {
  const { contenderId, predictionSetId, ranking } = params;
  try {
    const { data, errors } = await GraphqlAPI<
      CreatePredictionMutation,
      CreatePredictionMutationVariables
    >(mutations.createPrediction, {
      input: {
        predictionSetId,
        contenderId,
        ranking,
      },
    });
    if (!data?.createPrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating prediction set', err);
  }
};

const deletePrediction = async (
  id: string,
): Promise<iApiResponse<DeletePredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      DeletePredictionMutation,
      DeletePredictionMutationVariables
    >(mutations.deletePrediction, { input: { id } });
    if (!data?.deletePrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting prediction set', err);
  }
};

export const getPredictionSets = async (
  params: iPredictionSetParams,
): Promise<iApiResponse<ListPredictionSetsQuery>> => {
  const { userId, categoryId } = params;
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPI<
      ListPredictionSetsQuery,
      ListPredictionSetsQueryVariables
    >(customQueries.listPredictionSets, {
      filter: {
        userId: { eq: userId },
        categoryId: { eq: categoryId },
      },
    });
    if (!data?.listPredictionSets) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting prediction set', err);
  }
};

// declare the request
export const getPersonalPredictionsByEventLimitSlots = async (
  userId: string,
  filter: ModelPredictionSetFilterInput,
  predictionLimit: number,
): Promise<iApiResponse<PredictionSetByUserIdAndEventIdQuery>> => {
  const { data: maybePreSets, errors } = await GraphqlAPI<
    PredictionSetByUserIdAndEventIdQuery,
    PredictionSetByUserIdAndEventIdQueryVariables & { predictionLimit: number }
  >(customQueries.predictionSetByUserIdAndEventId, {
    userId,
    filter,
    predictionLimit,
  });
  if (!maybePreSets?.predictionSetByUserIdAndEventId) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data: maybePreSets };
};

// Returns exactly the number of predictions per slots specified in the category
// export const getPersonalPredictionsByEventLimitSlots = async (
//   event: iEvent,
//   userId: string,
//   defaultSlots?: number,
// ): Promise<iApiResponse<PredictionSetByUserIdAndEventIdQuery[]>> => {
//   const SLOTS = defaultSlots || 5;
//   const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
//   // group by slots
//   const iterable = _.entries(awardsBodyCategories).filter(([, c]) => c !== undefined); // [{ 10: { catData} }]
//   const grouped = _.groupBy(iterable, ([, c]) => c?.slots || SLOTS); // { 10: [PICTURE: {}], 5: [DIRECTOR: {}] }

//   // get categories that deviate from default num of slots
//   // we do this for deviant categories because it costs to fetch their ids, which are required to filter predictions
//   const categoriesWithNotDeviantSlotNum = _.entries(grouped).filter(
//     ([k]) => k !== SLOTS.toString(),
//   );

//   try {
//     // get categories that have deviant num of slots

//     // push requests to array
//     const categoryRequests = [];
//     for (const [, categories] of categoriesWithNotDeviantSlotNum) {
//       const categoryNames = categories.map(([k]) => k) as CategoryName[];
//       categoryRequests.push(getCategoriesByName(categoryNames));
//     }
//     // execute all requests
//     const results = await Promise.all(categoryRequests);

//     // format requests as: { 10: [catId1, catId2], 5: [catId3, catId4] }
//     const slotsToCategoryIds: { [slots: string]: string[] } = {};
//     const iterableSlots = categoriesWithNotDeviantSlotNum.map(([k]) => k);
//     for (let i = 0; i < results.length; i++) {
//       const { data } = results[i];
//       const categoryIds = data?.listCategories?.items.map((c) => c?.id || '') || [];
//       slotsToCategoryIds[iterableSlots[i]] = categoryIds;
//     }

//     const requests: Promise<PredictionSetByUserIdAndEventIdQuery>[] = [];

//     // loop through deviant slot categories and fetch [key] number of predictions for each of these categories
//     for (const [slots, categoryIds] of _.entries(slotsToCategoryIds)) {
//       const req = fetch(
//         { or: categoryIds.map((id) => ({ categoryId: { eq: id } })) },
//         parseInt(slots, 10),
//       );
//       requests.push(req);
//     }

//     // fetch remaining non-deviant predictions
//     const allDeviantCategoryIds = _.flatten(Object.values(slotsToCategoryIds));
//     const req = fetch(
//       { and: allDeviantCategoryIds.map((id) => ({ categoryId: { ne: id } })) },
//       SLOTS,
//     );
//     requests.push(req);

//     const output = await Promise.all(requests);

//     return { status: 'success', data: output };
//   } catch (err) {
//     return handleError('error getting personal predictions by event', err);
//   }
// };

export const getPersonalPredictionsByEvent = async (
  eventId: string,
  userId: string,
): Promise<iApiResponse<PredictionSetByUserIdAndEventIdQuery>> => {
  try {
    const { data: maybePreSets, errors } = await GraphqlAPI<
      PredictionSetByUserIdAndEventIdQuery,
      PredictionSetByUserIdAndEventIdQueryVariables
    >(customQueries.predictionSetByUserIdAndEventId, {
      userId,
      eventId: { eq: eventId },
    });
    if (!maybePreSets?.predictionSetByUserIdAndEventId) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: maybePreSets };
  } catch (err) {
    return handleError('error getting personal predictions by event', err);
  }
};

export type iPredictionData = {
  contenderId: string;
  ranking: number;
}[];

// Deletes all predictions for PredictionSet associated with user+category, then creates a new prediction set and predictions
export const createOrUpdatePredictions = async (
  params: iPredictionSetParams,
  predictionData: iPredictionData,
): Promise<iApiResponse<any>> => {
  const { userId } = params;
  try {
    const { status } = await deletePredictions(params);
    if (status !== 'success') {
      throw new Error('error deleting predictions in createOrUpdatePredictions');
    }

    // create new prediction set
    const { data: pSetData } = await createPredictionSet(params);
    const newPredictionSetId = pSetData?.createPredictionSet?.id;
    if (!newPredictionSetId) {
      return { status: 'error' };
    }

    // create new predictions
    await Promise.all(
      predictionData.map(async (p) => {
        return await createPrediction({
          userId,
          predictionSetId: newPredictionSetId,
          contenderId: p.contenderId,
          ranking: p.ranking,
        });
      }),
    );

    return { status: 'success' };
  } catch (err) {
    return handleError('error creating or updating predictions', err);
  }
};
