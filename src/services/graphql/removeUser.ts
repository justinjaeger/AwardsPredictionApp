/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DeleteHistoryPredictionMutation,
  DeleteHistoryPredictionMutationVariables,
  DeleteHistoryPredictionSetMutation,
  DeleteHistoryPredictionSetMutationVariables,
  DeletePredictionMutation,
  DeletePredictionMutationVariables,
  DeletePredictionSetMutation,
  DeletePredictionSetMutationVariables,
  DeleteRelationshipMutation,
  DeleteRelationshipMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  ListHistoryPredictionSetsQuery,
  ListHistoryPredictionSetsQueryVariables,
  ListHistoryPredictionsQuery,
  ListHistoryPredictionsQueryVariables,
  ListPredictionSetsQueryVariables,
  ListPredictionsQuery,
  ListPredictionsQueryVariables,
  ListRelationshipsQuery,
  ListRelationshipsQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import { ListPredictionSetsQuery } from '../../graphqlCustom/types';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';
/**
 * All operations associated with removing a user
 */

// QUERIES

const listRelationshipsQuery = /* GraphQL */ `
  query ListRelationships($id: ID, $filter: ModelRelationshipFilterInput) {
    listRelationships(id: $id, filter: $filter) {
      items {
        id
      }
    }
  }
`;

const listPredictionSetsQuery = /* GraphQL */ `
  query ListPredictionSets($id: ID, $filter: ModelPredictionSetFilterInput) {
    listPredictionSets(id: $id, filter: $filter) {
      items {
        id
        userId
      }
    }
  }
`;

const listPredictionsQuery = /* GraphQL */ `
  query ListPredictions($id: ID, $filter: ModelPredictionFilterInput) {
    listPredictions(id: $id, filter: $filter) {
      items {
        id
      }
    }
  }
`;

const listHistoryPredictionSetsQuery = /* GraphQL */ `
  query ListHistoryPredictionSets(
    $id: ID
    $filter: ModelHistoryPredictionSetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listHistoryPredictionSets(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
      }
    }
  }
`;

const listHistoryPredictionsQuery = /* GraphQL */ `
  query ListHistoryPredictions(
    $id: ID
    $filter: ModelHistoryPredictionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listHistoryPredictions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
      }
    }
  }
`;

// MUTATIONS

const deleteRelationshipMutation = /* GraphQL */ `
  mutation DeleteRelationship(
    $input: DeleteRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    deleteRelationship(input: $input, condition: $condition) {
      id
    }
  }
`;

const deletePredictionSetMutation = /* GraphQL */ `
  mutation DeletePredictionSet(
    $input: DeletePredictionSetInput!
    $condition: ModelPredictionSetConditionInput
  ) {
    deletePredictionSet(input: $input, condition: $condition) {
      id
    }
  }
`;

const deleteHistoryPredictionSetMutation = /* GraphQL */ `
  mutation DeleteHistoryPredictionSet(
    $input: DeleteHistoryPredictionSetInput!
    $condition: ModelHistoryPredictionSetConditionInput
  ) {
    deleteHistoryPredictionSet(input: $input, condition: $condition) {
      id
    }
  }
`;

const deletePredictionMutation = /* GraphQL */ `
  mutation DeletePrediction(
    $input: DeletePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    deletePrediction(input: $input, condition: $condition) {
      id
    }
  }
`;

const deleteHistoryPredictionMutation = /* GraphQL */ `
  mutation DeleteHistoryPrediction(
    $input: DeleteHistoryPredictionInput!
    $condition: ModelHistoryPredictionConditionInput
  ) {
    deleteHistoryPrediction(input: $input, condition: $condition) {
      id
    }
  }
`;

// OPERATIONS
// NOTE: We don't handle errors in here because we want them to be caught in major operation catch blocks instead

const getPredictionSets = async (
  userId: string,
): Promise<iApiResponse<ListPredictionSetsQuery>> => {
  // Get all prediction sets matching params (should only be one)
  const { data, errors } = await GraphqlAPI<
    ListPredictionSetsQuery,
    ListPredictionSetsQueryVariables
  >(listPredictionSetsQuery, {
    filter: {
      userId: { eq: userId },
    },
  });
  if (!data?.listPredictionSets) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data };
};

const getHistoryPredictionSets = async (
  userId: string,
): Promise<iApiResponse<ListHistoryPredictionSetsQuery>> => {
  // Get all prediction sets matching params (should only be one)
  const { data, errors } = await GraphqlAPI<
    ListHistoryPredictionSetsQuery,
    ListHistoryPredictionSetsQueryVariables
  >(listHistoryPredictionSetsQuery, {
    filter: {
      userId: { eq: userId },
    },
  });
  if (!data?.listHistoryPredictionSets) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data };
};

const getPredictions = async (
  predictionSetId: string,
): Promise<iApiResponse<ListPredictionsQuery>> => {
  // Get all prediction sets matching params (should only be one)
  const { data, errors } = await GraphqlAPI<
    ListPredictionsQuery,
    ListPredictionsQueryVariables
  >(listPredictionsQuery, {
    filter: {
      predictionSetId: { eq: predictionSetId },
    },
  });
  if (!data?.listPredictions) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data };
};

const getHistoryPredictions = async (
  historyPredictionSetId: string,
): Promise<iApiResponse<ListHistoryPredictionsQuery>> => {
  // Get all prediction sets matching params (should only be one)
  const { data, errors } = await GraphqlAPI<
    ListHistoryPredictionsQuery,
    ListHistoryPredictionsQueryVariables
  >(listHistoryPredictionsQuery, {
    filter: {
      historyPredictionSetId: { eq: historyPredictionSetId },
    },
  });
  if (!data?.listHistoryPredictions) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data };
};

const deletePrediction = async (
  id: string,
): Promise<iApiResponse<DeletePredictionMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      DeletePredictionMutation,
      DeletePredictionMutationVariables
    >(deletePredictionMutation, { input: { id } });
    if (!data?.deletePrediction) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error deleting prediction in removeUser', err);
  }
};

const deletePredictionSet = async (
  id: string,
): Promise<iApiResponse<DeletePredictionSetMutation>> => {
  const { data, errors } = await GraphqlAPI<
    DeletePredictionSetMutation,
    DeletePredictionSetMutationVariables
  >(deletePredictionSetMutation, { input: { id } });
  if (!data?.deletePredictionSet) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data: data };
};

const deleteHistoryPrediction = async (
  id: string,
): Promise<iApiResponse<DeleteHistoryPredictionMutation>> => {
  const { data, errors } = await GraphqlAPI<
    DeleteHistoryPredictionMutation,
    DeleteHistoryPredictionMutationVariables
  >(deleteHistoryPredictionMutation, { input: { id } });
  if (!data?.deleteHistoryPrediction) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data: data };
};

const deleteHistoryPredictionSet = async (
  id: string,
): Promise<iApiResponse<DeleteHistoryPredictionSetMutation>> => {
  const { data, errors } = await GraphqlAPI<
    DeleteHistoryPredictionSetMutation,
    DeleteHistoryPredictionSetMutationVariables
  >(deleteHistoryPredictionSetMutation, { input: { id } });
  if (!data?.deleteHistoryPredictionSet) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data: data };
};

const getAllFollowings = async (
  followedUserId: string,
): Promise<iApiResponse<ListRelationshipsQuery>> => {
  const { data, errors } = await GraphqlAPI<
    ListRelationshipsQuery,
    ListRelationshipsQueryVariables
  >(listRelationshipsQuery, {
    filter: {
      followedUserId: { eq: followedUserId },
    },
  });
  if (!data?.listRelationships) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data: data };
};

const getAllFollowers = async (
  followingUserId: string,
): Promise<iApiResponse<ListRelationshipsQuery>> => {
  const { data, errors } = await GraphqlAPI<
    ListRelationshipsQuery,
    ListRelationshipsQueryVariables
  >(listRelationshipsQuery, {
    filter: {
      followingUserId: { eq: followingUserId },
    },
  });
  if (!data?.listRelationships) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data: data };
};

const deleteRelationship = async (
  id: string,
): Promise<iApiResponse<DeleteRelationshipMutation>> => {
  const { data, errors } = await GraphqlAPI<
    DeleteRelationshipMutation,
    DeleteRelationshipMutationVariables
  >(deleteRelationshipMutation, { input: { id } });
  if (!data?.deleteRelationship) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data: data };
};

// MAJOR FUNCS

const removeAllRelationships = async (userId: string): Promise<any> => {
  // going to push all promises into an array and then await them all
  const promises: Promise<any>[] = [];
  // we handle follower and followings relationship deletion the same way
  const handleRelationships = (
    listRelationshipsResponse: iApiResponse<ListRelationshipsQuery>,
  ) => {
    if (listRelationshipsResponse.status !== 'success') {
      throw new Error(JSON.stringify(listRelationshipsResponse.error));
    }
    const relationships = listRelationshipsResponse.data?.listRelationships?.items || [];
    const relationshipIds = relationships?.map((r) => r?.id);
    for (let i = 0; i < relationshipIds.length; i++) {
      const id = relationshipIds[i];
      if (id) {
        // push delete relationship promise to queue
        promises.push(deleteRelationship(id));
      }
    }
  };
  // handle FOLLOWING relationships
  const relationships1 = await getAllFollowings(userId);
  handleRelationships(relationships1);
  const relationships2 = await getAllFollowers(userId);
  handleRelationships(relationships2);
  // Execute promises
  await Promise.all(promises);
  return { status: 'success' };
};

const deleteAllUserPredictions = async (userId: string): Promise<any> => {
  const deletePredictionPromises: Promise<any>[] = [];
  const deletePredictionSetPromises: Promise<any>[] = [];
  // get all prediction sets
  const predictionSets = await getPredictionSets(userId);
  const predictionSetIds =
    predictionSets.data?.listPredictionSets?.items?.map((p) => p?.id) || [];
  for (let i = 0; i < predictionSetIds.length; i++) {
    const predictionSetId = predictionSetIds[i];
    if (predictionSetId) {
      // add prediction set to deletion promise queue
      const psPromise = deletePredictionSet(predictionSetId);
      deletePredictionSetPromises.push(psPromise);
      // get all predictions within prediction set
      const predictions = await getPredictions(predictionSetId);
      const predictionIds =
        predictions.data?.listPredictions?.items?.map((p) => p?.id) || [];
      for (const pId of predictionIds) {
        if (pId) {
          // add prediction to deletion promise queue
          const pPromise = deletePrediction(pId);
          deletePredictionPromises.push(pPromise);
        }
      }
    }
  }

  // get all history prediction sets
  const historyPredictionSets = await getHistoryPredictionSets(userId);
  const historyPredictionSetIds =
    historyPredictionSets.data?.listHistoryPredictionSets?.items?.map((p) => p?.id) || [];
  for (let i = 0; i < historyPredictionSetIds.length; i++) {
    const historyPredictionSetId = historyPredictionSetIds[i];
    if (historyPredictionSetId) {
      // add history prediction set to deletion promise queue
      const psPromise = deleteHistoryPredictionSet(historyPredictionSetId);
      deletePredictionSetPromises.push(psPromise);
      // get all history predictions within prediction set
      const historyPredictions = await getHistoryPredictions(historyPredictionSetId);
      const historyPredictionIds =
        historyPredictions.data?.listHistoryPredictions?.items?.map((p) => p?.id) || [];
      for (const pId of historyPredictionIds) {
        if (pId) {
          // add history prediction to deletion promise queue
          const pPromise = deleteHistoryPrediction(pId);
          deletePredictionPromises.push(pPromise);
        }
      }
    }
  }

  await Promise.all(deletePredictionPromises);
  await Promise.all(deletePredictionSetPromises);
  return { status: 'success' };
};

const deleteUser = async (id: string): Promise<iApiResponse<DeleteUserMutation>> => {
  const { data, errors } = await GraphqlAPI<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(mutations.deleteUser, { input: { id } });
  if (!data?.deleteUser) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data: data };
};

const wipeUserInfo = async (id: string): Promise<iApiResponse<UpdateUserMutation>> => {
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
  const newEmail = `deleted-user-${randomSixDigits}`;
  const { data, errors } = await GraphqlAPI<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(mutations.updateUser, {
    input: {
      id,
      email: newEmail,
      username: null,
      name: null,
      bio: null,
      image: null,
    },
  });
  if (!data?.updateUser) {
    throw new Error(JSON.stringify(errors));
  }
  return { status: 'success', data: data };
};

// Should catch all exceptions since no nested functions are try/catch
export const permanentlyDeleteUser = async (id: string): Promise<iApiResponse<any>> => {
  try {
    await removeAllRelationships(id);
    // I don't think this is that important to do
    // await deleteAllUserPredictions(id);
    // deleting user can be deleting all info except for id
    await wipeUserInfo(id);
    return { status: 'success' };
  } catch (err) {
    return handleError('error permanently deleting user', err);
  }
};
