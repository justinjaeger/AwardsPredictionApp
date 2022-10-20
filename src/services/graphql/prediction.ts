import {
  CreatePredictionMutation,
  CreatePredictionMutationVariables,
  CreatePredictionSetMutation,
  CreatePredictionSetMutationVariables,
  DeletePredictionMutation,
  DeletePredictionMutationVariables,
  DeletePredictionSetMutation,
  DeletePredictionSetMutationVariables,
  GetPredictionSetQuery,
  GetPredictionSetQueryVariables,
  ListPredictionSetsQuery,
  ListPredictionSetsQueryVariables,
  ListPredictionsQuery,
  ListPredictionsQueryVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

// there can only be one prediction set from these parameters
type iPredictionSetParams = {
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

const getPredictionSetById = async (
  id: string,
): Promise<iApiResponse<GetPredictionSetQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      GetPredictionSetQuery,
      GetPredictionSetQueryVariables
    >(queries.getPredictionSet, { id });
    if (!data?.getPredictionSet) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting prediction set', err);
  }
};

const deletePredictionSet = async (
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
    >(mutations.createPredictionSet, { input: { userId, categoryId, eventId } });
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
        userId,
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

export const getPredictionsSet = async (
  params: iPredictionSetParams,
): Promise<iApiResponse<GetPredictionSetQuery>> => {
  const { userId, categoryId } = params;
  try {
    // Get all prediction sets matching params (should only be one)
    const { data: maybePreSets, errors } = await GraphqlAPI<
      ListPredictionSetsQuery,
      ListPredictionSetsQueryVariables
    >(queries.listPredictionSets, {
      filter: { userId: { eq: userId }, categoryId: { eq: categoryId } },
    });
    if (!maybePreSets?.listPredictionSets) {
      throw new Error(JSON.stringify(errors));
    }
    const predictionSetId = maybePreSets.listPredictionSets.items[0]?.id; // bc should only be one
    if (!predictionSetId) {
      return { status: 'success' };
    }
    // Return GetPredictionSet result
    const { data } = await getPredictionSetById(predictionSetId);
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
    const { data: maybePreSets, errors } = await GraphqlAPI<
      ListPredictionsQuery,
      ListPredictionsQueryVariables
    >(queries.listPredictions, {
      filter: { predictionSetPredictionsId: { eq: pSetId } },
    });
    if (!maybePreSets?.listPredictions) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: maybePreSets };
  } catch (err) {
    return handleError('error predictions', err);
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
    // get prediction set (user + category)
    const { data: pSet } = await getPredictionsSet(params);
    const oldPredictionSet = pSet?.getPredictionSet;
    if (oldPredictionSet) {
      // predictions are NOT being returned here. This is a problem, it's not querying efficiently. It's forcing me to do another request
      // this isn't an error, it just means there are no current predictions
      const oldPredictions = oldPredictionSet.predictions?.items;
      if (!oldPredictions) {
        throw new Error(
          'Cannot get predictions[] from PredictionSet. Consider changing schema',
        );
      }
      if (!pSet?.getPredictionSet?.id) return { status: 'error' };
      const { data: ps } = await getPredictionsByPredictionSetId(
        pSet.getPredictionSet.id,
      );
      if (!ps?.listPredictions) return { status: 'error' };
      // delete all predictions within prediction set
      await Promise.all(
        ps?.listPredictions.items.map(async (p) => {
          if (!p?.id) return;
          return deletePrediction(p.id);
        }),
      );
      // delete existing prediction set
      const { status } = await deletePredictionSet(oldPredictionSet.id);
      if (status !== 'success') {
        return { status: 'error' };
      }
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
