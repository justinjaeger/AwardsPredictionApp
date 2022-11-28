import {
  CreatePredictionMutation,
  CreatePredictionMutationVariables,
  CreatePredictionSetMutation,
  CreatePredictionSetMutationVariables,
  DeletePredictionMutation,
  DeletePredictionMutationVariables,
  DeletePredictionSetMutation,
  DeletePredictionSetMutationVariables,
  ListPredictionSetsQuery,
  ListPredictionSetsQueryVariables,
  ListPredictionsQuery,
  ListPredictionsQueryVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

// there can only be one prediction set from these parameters
export type iPredictionSetParams = {
  userId: string;
  categoryId: string;
  eventId: string;
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

    // Delete all predictions associated (there should only be one, but for safety, loop through)
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
  const { userId, categoryId, eventId } = params;
  try {
    const { data, errors } = await GraphqlAPI<
      CreatePredictionSetMutation,
      CreatePredictionSetMutationVariables
    >(mutations.createPredictionSet, {
      input: {
        predictionSetUserId: userId,
        predictionSetCategoryId: categoryId,
        predictionSetEventId: eventId,
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
  const { userId, contenderId, predictionSetId, ranking } = params;
  try {
    const { data, errors } = await GraphqlAPI<
      CreatePredictionMutation,
      CreatePredictionMutationVariables
    >(mutations.createPrediction, {
      input: {
        predictionUserId: userId,
        predictionSetPredictionsId: predictionSetId,
        contenderPredictionsId: contenderId,
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
    >(queries.listPredictionSets, {
      filter: {
        predictionSetUserId: { eq: userId },
        predictionSetCategoryId: { eq: categoryId },
      },
    });
    if (!data?.listPredictionSets) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error prediction set', err);
  }
};

export const getPredictionsByPredictionSetId = async (
  pSetId: string,
): Promise<iApiResponse<ListPredictionsQuery>> => {
  try {
    // Get all prediction sets matching params (should only be one)
    const { data: maybePredictions, errors } = await GraphqlAPI<
      ListPredictionsQuery,
      ListPredictionsQueryVariables
    >(queries.listPredictions, {
      filter: { predictionSetPredictionsId: { eq: pSetId } },
    });
    if (!maybePredictions?.listPredictions) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: maybePredictions };
  } catch (err) {
    return handleError('error predictions', err);
  }
};

// TODO: make lambda function since sorta big
export const getPersonalPredictionsByEvent = async (
  eventId: string,
  userId: string,
): Promise<iApiResponse<ListPredictionSetsQuery>> => {
  try {
    //
    const { data: maybePreSets, errors } = await GraphqlAPI<
      ListPredictionSetsQuery,
      ListPredictionSetsQueryVariables
    >(customQueries.listPredictionSets, {
      filter: {
        predictionSetEventId: { eq: eventId },
        predictionSetUserId: { eq: userId },
      },
    });
    if (!maybePreSets?.listPredictionSets) {
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

// NOTE: not sure what this will return yet...
// NOTE: Should make this atomic
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

export const getPredictionsByContender = async (
  contenderId: string,
): Promise<iApiResponse<ListPredictionsQuery>> => {
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPI<
      ListPredictionsQuery,
      ListPredictionsQueryVariables
    >(queries.listPredictions, {
      filter: { contenderPredictionsId: { eq: contenderId } },
    });
    if (!data?.listPredictions) {
      throw new Error(JSON.stringify(errors));
    }
    // Return GetPredictionSet result
    return { status: 'success', data };
  } catch (err) {
    return handleError('error prediction set', err);
  }
};
