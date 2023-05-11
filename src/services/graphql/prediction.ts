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
  ListPredictionsQuery,
  ListPredictionsQueryVariables,
  PredictionSetByUserIdAndCategoryIdQuery,
  PredictionSetByUserIdAndCategoryIdQueryVariables,
  PredictionSetByUserIdAndEventIdQueryVariables,
  PredictionType,
  UpdatePredictionMutation,
  UpdatePredictionMutationVariables,
} from '../../API';
import * as customMutations from '../../graphqlCustom/mutations';
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

/**
 * GET UNIQUE
 */

export const getPersonalPredictionsByCategory = async (params: {
  userId: string;
  categoryId: string;
}): Promise<iApiResponse<PredictionSetByUserIdAndCategoryIdQuery>> => {
  const { userId, categoryId } = params;
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPI<
      PredictionSetByUserIdAndCategoryIdQuery,
      PredictionSetByUserIdAndCategoryIdQueryVariables
    >(customQueries.getUniquePredictionSet, {
      userId,
      categoryId: { eq: categoryId },
    });
    if (!data?.predictionSetByUserIdAndCategoryId) {
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
          return deletePredictionById(p.id);
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
    >(customMutations.deletePredictionSet, { input: { id } });
    if (!data?.deletePredictionSet) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting prediction set', err);
  }
};

const deletePredictionById = async (
  id: string,
): Promise<iApiResponse<DeletePredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      DeletePredictionMutation,
      DeletePredictionMutationVariables
    >(customMutations.deletePrediction, { input: { id } });
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
    const { data, errors } = await GraphqlAPI<
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
  const { contenderId, predictionSetId, ranking } = params;
  try {
    const { data, errors } = await GraphqlAPI<
      CreatePredictionMutation,
      CreatePredictionMutationVariables
    >(customMutations.createPrediction, {
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
    const { data, errors } = await GraphqlAPI<
      ListPredictionsQuery,
      ListPredictionsQueryVariables
    >(customQueries.listEveryPersonalPrediction, { nextToken, limit: PAGINATED_LIMIT });
    if (!data?.listPredictions) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting prediction set', err);
  }
};

export const listEveryPersonalPredictionSet = async (
  nextToken?: string | null,
): Promise<iApiResponse<ListPredictionSetsQuery>> => {
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPI<
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

export const updatePredictionContender = async (
  predictionId: string,
  contenderId: string,
): Promise<iApiResponse<UpdatePredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
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
    return handleError('error updating contender hidden', err);
  }
};

export const deletePersonalPrediction = async (
  predictionId: string,
): Promise<iApiResponse<DeletePredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
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

export const deletePersonalPredictionSet = async (
  predictionSetId: string,
): Promise<iApiResponse<DeletePredictionSetMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
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
