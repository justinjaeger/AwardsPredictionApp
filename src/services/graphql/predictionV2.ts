import {
  ContenderAccolade,
  V2PredictionSetsByUserIdAndCategoryIdAndPhaseQuery,
  V2PredictionSetsByUserIdAndCategoryIdAndPhaseQueryVariables,
  V2PredictionSetsByUserIdAndEventIdAndPhaseQuery,
  V2PredictionSetsByUserIdAndEventIdAndPhaseQueryVariables,
} from '../../API';
import * as customMutations from '../../graphqlCustom/mutations';
import * as customQueries from '../../graphqlCustom/queries';
import {
  ListPredictionSetsQuery,
  PredictionSetByUserIdAndEventIdQuery,
} from '../../graphqlCustom/types';
import {
  GraphqlAPIProtected,
  GraphqlAPIPublic,
  handleError,
  iApiResponse,
} from '../utils';

// there can only be one prediction set from these parameters
export type iPredictionSetParams = {
  userId: string;
  categoryId: string;
  eventId: string;
  phase: ContenderAccolade;
};

type iPredictionParams = {
  userId: string;
  predictionSetId: string;
  contenderId: string;
  ranking: number;
};

/**
 * GET UNIQUE / CURRENT
 */

export const getV2CurrentPredictionsByEvent = async (params: {
  userId: string;
  eventId: string;
  phase: ContenderAccolade;
}): Promise<iApiResponse<V2PredictionSetsByUserIdAndEventIdAndPhaseQuery>> => {
  const { userId, eventId, phase } = params;
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPIPublic<
      V2PredictionSetsByUserIdAndEventIdAndPhaseQuery,
      V2PredictionSetsByUserIdAndEventIdAndPhaseQueryVariables
    >(customQueries.v2GetMostRecentPredictionSetByCategory, {
      userId,
      eventIdPhase: {
        eq: {
          eventId,
          phase,
        },
      },
    });
    if (!data?.v2PredictionSetsByUserIdAndEventIdAndPhase) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting prediction set', err);
  }
};

export const getV2CurrentPredictionsByCategory = async (params: {
  userId: string;
  categoryId: string;
  phase: ContenderAccolade;
}): Promise<iApiResponse<V2PredictionSetsByUserIdAndCategoryIdAndPhaseQuery>> => {
  const { userId, categoryId, phase } = params;
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPIPublic<
      V2PredictionSetsByUserIdAndCategoryIdAndPhaseQuery,
      V2PredictionSetsByUserIdAndCategoryIdAndPhaseQueryVariables
    >(customQueries.v2GetMostRecentPredictionSetByCategory, {
      userId,
      categoryIdPhase: {
        eq: {
          categoryId,
          phase,
        },
      },
    });
    if (!data?.v2PredictionSetsByUserIdAndCategoryIdAndPhase) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting prediction set', err);
  }
};

export const getPersonalPredictionsByEvent = async (
  eventId: string,
  userId: string,
): Promise<iApiResponse<V2PredictionSetByUserIdAndEventIdQuery>> => {
  try {
    const { data: maybePreSets, errors } = await GraphqlAPIPublic<
      V2PredictionSetByUserIdAndEventIdQuery,
      V2PredictionSetByUserIdAndEventIdQueryVariables
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

/**
 * DELETE MUTATIONS
 */

const deletePredictions = async (
  params: iPredictionSetParams,
): Promise<iApiResponse<any>> => {
  try {
    // get prediction sets (user + category)
    const { data: pSets } = await getPersonalPredictionsByCategory({
      userId: params.userId,
      categoryId: params.categoryId,
    });
    const predictionSets = pSets?.predictionSetByUserIdAndCategoryId?.items;
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
          return deleteV2PredictionById(p.id);
        }),
      );
      // Delete prediction set
      await deleteV2PredictionSetById(ps.id, ps.userId);
    });

    return { status: 'success' };
  } catch (err) {
    return handleError('error deleting predictions by prediction set', err);
  }
};

const deleteV2PredictionSetById = async (
  id: string,
  userId: string,
): Promise<iApiResponse<DeletePredictionSetMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      DeletePredictionSetMutation,
      DeletePredictionSetMutationVariables
    >(customMutations.deletePredictionSet, {
      input: { id },
      condition: { userId: { eq: userId } },
    });
    if (!data?.deletePredictionSet) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting prediction set by id', err);
  }
};

const deleteV2PredictionById = async (
  id: string,
  userId: string,
): Promise<iApiResponse<DeletePredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      DeletePredictionMutation,
      DeletePredictionMutationVariables
    >(customMutations.deletePrediction, {
      input: { id },
      condition: { userId: { eq: userId } },
    });
    if (!data?.deletePrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting prediction set', err);
  }
};

/**
 * CREATE MUTATIONS
 */

const createPredictionSet = async (
  params: iPredictionSetParams,
): Promise<iApiResponse<CreatePredictionSetMutation>> => {
  const { userId, categoryId, eventId, type } = params;
  try {
    const { data, errors } = await GraphqlAPIProtected<
      CreatePredictionSetMutation,
      CreatePredictionSetMutationVariables
    >(customMutations.createPredictionSet, {
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
  const { contenderId, predictionSetId, ranking, userId } = params;
  try {
    const { data, errors } = await GraphqlAPIProtected<
      CreatePredictionMutation,
      CreatePredictionMutationVariables
    >(customMutations.createPrediction, {
      input: {
        predictionSetId,
        contenderId,
        ranking,
        userId,
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

/**
 * FOR DELETE DUPLICATE SCRIPT
 */

const PAGINATED_LIMIT = 2000;
export const listEveryPersonalPrediction = async (
  nextToken?: string | null,
): Promise<iApiResponse<ListPredictionsQuery>> => {
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPIPublic<
      ListPredictionsQuery,
      ListPredictionsQueryVariables
    >(customQueries.listEveryPersonalPrediction, { nextToken, limit: PAGINATED_LIMIT });
    if (!data?.listPredictions) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error listing every prediction', err);
  }
};

export const listEveryPersonalHistoryPrediction = async (
  nextToken?: string | null,
): Promise<iApiResponse<ListHistoryPredictionsQuery>> => {
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPIPublic<
      ListHistoryPredictionsQuery,
      ListHistoryPredictionsQueryVariables
    >(customQueries.listEveryPersonalHistoryPrediction, {
      nextToken,
      limit: PAGINATED_LIMIT,
    });
    if (!data?.listHistoryPredictions) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error listing every history prediction', err);
  }
};

export const listEveryCommunityPrediction = async (
  nextToken?: string | null,
): Promise<iApiResponse<ListCommunityPredictionsQuery>> => {
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPIPublic<
      ListCommunityPredictionsQuery,
      ListCommunityPredictionsQueryVariables
    >(customQueries.listEveryCommunityPrediction, {
      nextToken,
      limit: PAGINATED_LIMIT,
    });
    if (!data?.listCommunityPredictions) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error listing every community prediction', err);
  }
};

export const listEveryCommunityHistoryPrediction = async (
  nextToken?: string | null,
): Promise<iApiResponse<ListCommunityHistoryPredictionsQuery>> => {
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPIPublic<
      ListCommunityHistoryPredictionsQuery,
      ListCommunityHistoryPredictionsQueryVariables
    >(customQueries.listEveryCommunityHistoryPrediction, {
      nextToken,
      limit: PAGINATED_LIMIT,
    });
    if (!data?.listCommunityHistoryPredictions) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error listing every community history prediction', err);
  }
};

export const listEveryPersonalPredictionSet = async (
  nextToken?: string | null,
): Promise<iApiResponse<ListPredictionSetsQuery>> => {
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPIPublic<
      ListPredictionSetsQuery,
      ListPredictionSetsQueryVariables
    >(customQueries.listEveryPersonalPredictionSet, {
      nextToken,
      limit: PAGINATED_LIMIT,
    });
    if (!data?.listPredictionSets) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting prediction set', err);
  }
};

/**
 * UPDATE FUNCS for deletion script
 */

export const updatePredictionContender = async (
  predictionId: string,
  contenderId: string,
): Promise<iApiResponse<UpdatePredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      UpdatePredictionMutation,
      UpdatePredictionMutationVariables
    >(customMutations.updatePrediction, {
      input: { id: predictionId, contenderId },
    });
    if (!data?.updatePrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updatePredictionContender', err);
  }
};

// note: gonna be changed so ignoring
export const updateHistoryPredictionContender = async (
  predictionId: string,
  contenderId: string,
): Promise<iApiResponse<UpdateHistoryPredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      UpdateHistoryPredictionMutation,
      UpdateHistoryPredictionMutationVariables
    >(customMutations.updateHistoryPrediction, {
      input: { id: predictionId, contenderId },
    });
    if (!data?.updateHistoryPrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updateHistoryPredictionContender', err);
  }
};

export const updateCommunityPredictionContender = async (
  predictionId: string,
  contenderId: string,
): Promise<iApiResponse<UpdateCommunityPredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      UpdateCommunityPredictionMutation,
      UpdateCommunityPredictionMutationVariables
    >(customMutations.updateCommunityPrediction, {
      input: { id: predictionId, contenderId },
    });
    if (!data?.updateCommunityPrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updateCommunityPredictionContender', err);
  }
};

export const updateCommunityHistoryPredictionContender = async (
  predictionId: string,
  contenderId: string,
): Promise<iApiResponse<UpdateCommunityHistoryPredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      UpdateCommunityHistoryPredictionMutation,
      UpdateCommunityHistoryPredictionMutationVariables
    >(customMutations.updateCommunityHistoryPrediction, {
      input: { id: predictionId, contenderId },
    });
    if (!data?.updateCommunityHistoryPrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updateCommunityHistoryPredictionContender', err);
  }
};

/**
 * DELETION FUNCS for deletion script
 */

export const deletePersonalPrediction = async (
  predictionId: string,
): Promise<iApiResponse<DeletePredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      DeletePredictionMutation,
      DeletePredictionMutationVariables
    >(customMutations.deletePrediction, { input: { id: predictionId } });
    if (!data?.deletePrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting prediction', err);
  }
};

export const deletePersonalHistoryPrediction = async (
  predictionId: string,
): Promise<iApiResponse<DeleteHistoryPredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      DeleteHistoryPredictionMutation,
      DeleteHistoryPredictionMutationVariables
    >(customMutations.deleteHistoryPrediction, { input: { id: predictionId } });
    if (!data?.deleteHistoryPrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting prediction', err);
  }
};

export const deleteCommunityPrediction = async (
  predictionId: string,
): Promise<iApiResponse<DeleteCommunityPredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      DeleteCommunityPredictionMutation,
      DeleteCommunityPredictionMutationVariables
    >(customMutations.deleteCommunityPrediction, { input: { id: predictionId } });
    if (!data?.deleteCommunityPrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting prediction', err);
  }
};

export const deleteCommunityHistoryPrediction = async (
  predictionId: string,
): Promise<iApiResponse<DeleteCommunityHistoryPredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      DeleteCommunityHistoryPredictionMutation,
      DeleteCommunityHistoryPredictionMutationVariables
    >(customMutations.deleteCommunityHistoryPrediction, { input: { id: predictionId } });
    if (!data?.deleteCommunityHistoryPrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting prediction', err);
  }
};

// Will only pass if you're the admin - otherwise users should use deleteV2PredictionSetById
export const deletePersonalPredictionSet = async (
  predictionSetId: string,
): Promise<iApiResponse<DeletePredictionSetMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      DeletePredictionSetMutation,
      DeletePredictionSetMutationVariables
    >(customMutations.deletePredictionSet, { input: { id: predictionSetId } });
    if (!data?.deletePredictionSet) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting prediction set', err);
  }
};
