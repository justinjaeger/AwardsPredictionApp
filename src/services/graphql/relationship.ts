import {
  CreateRelationshipMutation,
  CreateRelationshipMutationVariables,
  DeleteRelationshipMutation,
  DeleteRelationshipMutationVariables,
  ListRelationshipsQuery,
  ListRelationshipsQueryVariables,
  SearchRelationshipsQueryVariables,
} from '../../API';
import { PAGINATED_USER_LIMIT } from '../../constants';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import { SearchRelationshipsQuery } from '../../graphqlCustom/types';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

export const getRelationship = async (
  followedUserId: string,
  followingUserId: string,
): Promise<iApiResponse<ListRelationshipsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      ListRelationshipsQuery,
      ListRelationshipsQueryVariables
    >(queries.listRelationships, {
      filter: {
        followedUserId: { eq: followedUserId },
        followingUserId: { eq: followingUserId },
      },
    });
    if (!data?.listRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting relationship', err);
  }
};

export const followUser = async (
  followedUserId: string,
  followingUserId: string,
): Promise<iApiResponse<CreateRelationshipMutation>> => {
  try {
    // first, safety check and don't create if relationship already exists
    const maybeRelationships = await getRelationship(followedUserId, followingUserId);
    if (maybeRelationships.status !== 'success') {
      throw new Error(JSON.stringify(maybeRelationships.error));
    }
    if ((maybeRelationships.data?.listRelationships?.items || []).length > 0) {
      throw new Error('relationship already exists');
    }
    // create relationship
    const { data, errors } = await GraphqlAPI<
      CreateRelationshipMutation,
      CreateRelationshipMutationVariables
    >(mutations.createRelationship, { input: { followedUserId, followingUserId } });
    if (!data?.createRelationship) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error following user', err);
  }
};

export const unFollowUser = async (
  followedUserId: string,
  followingUserId: string,
): Promise<iApiResponse<DeleteRelationshipMutation>> => {
  try {
    // first, get the relationship id (should be only one with these inputs)
    const maybeRelationships = await getRelationship(followedUserId, followingUserId);
    if (maybeRelationships.status !== 'success') {
      throw new Error(JSON.stringify(maybeRelationships.error));
    }
    if (maybeRelationships.data?.listRelationships?.items?.length === 0) {
      throw new Error('relationship not found');
    }
    const relationship = maybeRelationships.data?.listRelationships?.items[0];
    const relationshipId = relationship?.id;
    if (!relationshipId) {
      throw new Error('relationship id not found');
    }
    // use relationship id to delete
    const { data, errors } = await GraphqlAPI<
      DeleteRelationshipMutation,
      DeleteRelationshipMutationVariables
    >(mutations.deleteRelationship, { input: { id: relationshipId } });
    if (!data?.deleteRelationship) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error unfollowing user', err);
  }
};

type SearchRelationshipsQueryVariablesCustom = SearchRelationshipsQueryVariables & {
  authUserId: string;
};
export const getPaginatedFollowersSignedIn = async (
  followedUserId: string, // get users who are following this user
  authUserId: string,
  nextToken?: string,
): Promise<iApiResponse<SearchRelationshipsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      SearchRelationshipsQuery,
      SearchRelationshipsQueryVariablesCustom
    >(customQueries.searchFollowersSignedIn, {
      filter: {
        followedUserId: { eq: followedUserId },
      },
      limit: PAGINATED_USER_LIMIT,
      authUserId,
      nextToken,
    });
    if (!data?.searchRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting paginated followers', err);
  }
};
export const getPaginatedFollowingSignedIn = async (
  followingUserId: string, // get users who this user is following
  authUserId: string,
  nextToken?: string,
): Promise<iApiResponse<SearchRelationshipsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      SearchRelationshipsQuery,
      SearchRelationshipsQueryVariablesCustom
    >(customQueries.searchFollowingSignedIn, {
      filter: {
        followingUserId: { eq: followingUserId },
      },
      limit: PAGINATED_USER_LIMIT,
      authUserId,
      nextToken,
    });
    if (!data?.searchRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting paginated following', err);
  }
};

export const getPaginatedFollowersSignedOut = async (
  followedUserId: string, // get users who are following this user
  nextToken?: string,
): Promise<iApiResponse<SearchRelationshipsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      SearchRelationshipsQuery,
      SearchRelationshipsQueryVariables
    >(customQueries.searchFollowersSignedIn, {
      filter: {
        followedUserId: { eq: followedUserId },
      },
      limit: PAGINATED_USER_LIMIT,
      nextToken,
    });
    if (!data?.searchRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting paginated followers', err);
  }
};
export const getPaginatedFollowingSignedOut = async (
  followingUserId: string, // get users who this user is following
  nextToken?: string,
): Promise<iApiResponse<SearchRelationshipsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      SearchRelationshipsQuery,
      SearchRelationshipsQueryVariables
    >(customQueries.searchFollowingSignedIn, {
      filter: {
        followingUserId: { eq: followingUserId },
      },
      limit: PAGINATED_USER_LIMIT,
      nextToken,
    });
    if (!data?.searchRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting paginated following', err);
  }
};

export const getFollowingCount = async (
  followingUserId: string,
): Promise<iApiResponse<SearchRelationshipsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      SearchRelationshipsQuery,
      SearchRelationshipsQueryVariables
    >(customQueries.getTotalRelationships, {
      filter: {
        followingUserId: { eq: followingUserId },
      },
    });
    if (!data?.searchRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting follower count', err);
  }
};

export const getFollowerCount = async (
  followedUserId: string,
): Promise<iApiResponse<SearchRelationshipsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      SearchRelationshipsQuery,
      SearchRelationshipsQueryVariables
    >(customQueries.getTotalRelationships, {
      filter: {
        followedUserId: { eq: followedUserId },
      },
    });
    if (!data?.searchRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting follower count', err);
  }
};
