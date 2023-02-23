import {
  CreateRelationshipMutation,
  CreateRelationshipMutationVariables,
  DeleteRelationshipMutation,
  DeleteRelationshipMutationVariables,
  ListRelationshipsQueryVariables,
  SearchableSortDirection,
  SearchRelationshipsQueryVariables,
} from '../../API';
import {
  PAGINATED_USER_LIMIT,
  PAGINATED_USER_RECOMMENDATION_LIMIT,
} from '../../constants';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import {
  SearchRelationshipsQuery,
  ListRelationshipsQuery,
} from '../../graphqlCustom/types';
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
  nextToken?: string | undefined,
  paginatedLimit?: number | undefined,
): Promise<iApiResponse<SearchRelationshipsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      SearchRelationshipsQuery,
      SearchRelationshipsQueryVariablesCustom
    >(customQueries.searchFollowingSignedIn, {
      filter: {
        followingUserId: { eq: followingUserId },
      },
      limit: paginatedLimit || PAGINATED_USER_LIMIT,
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

// tries to solve problem where we're only getting the most/least recently followed instead of a random sample
const returnOneOrZero = () => Math.round(Math.random());

export const getRecommendedFollowersFromFriends = async (
  authUserId: string,
  nextToken?: string | undefined,
  paginatedLimit?: number, // Careful: Returns x^2 users, because it finds X friends, multiplied by X of their friends
): Promise<iApiResponse<SearchRelationshipsQuery>> => {
  try {
    const oneOrZero = returnOneOrZero();
    // get users who authUser is following and suggest their friends' friends
    const { data, errors } = await GraphqlAPI<
      SearchRelationshipsQuery,
      SearchRelationshipsQueryVariablesCustom
    >(customQueries.searchRecommendedFollowing, {
      filter: {
        followingUserId: { eq: authUserId },
      },
      limit: paginatedLimit || PAGINATED_USER_LIMIT,
      // so it's not biased towards old or new users
      sort: oneOrZero
        ? [{ direction: SearchableSortDirection.asc }]
        : [{ direction: SearchableSortDirection.desc }],
      authUserId,
      nextToken,
    });
    if (!data?.searchRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting recommended followers', err);
  }
};

// Even when looking for random followers, it's still a better idea to suggest random people's friends rather than random people, because the probability of suggesting a popular person is higher
export const getRecommendedFollowersFromRandom = async (
  authUserId: string,
  nextToken?: string | undefined,
  paginatedLimit?: number, // Careful: Returns x^2 users, because it finds X friends, multiplied by X of their friends
): Promise<iApiResponse<SearchRelationshipsQuery>> => {
  try {
    const oneOrZero = returnOneOrZero();
    // get random users and suggest user follow them
    const { data, errors } = await GraphqlAPI<
      SearchRelationshipsQuery,
      SearchRelationshipsQueryVariablesCustom
    >(customQueries.searchRecommendedFollowing, {
      limit: paginatedLimit || PAGINATED_USER_RECOMMENDATION_LIMIT,
      // so it's not biased towards old or new users
      sort: oneOrZero
        ? [{ direction: SearchableSortDirection.asc }]
        : [{ direction: SearchableSortDirection.desc }],
      authUserId,
      nextToken,
    });
    if (!data?.searchRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting recommended followers', err);
  }
};

// might want to use for signed out users
export const getRecommendedFollowersFromRandomSignedOut = async (
  nextToken?: string | undefined,
  paginatedLimit?: number, // Careful: Returns x^2 users, because it finds X friends, multiplied by X of their friends
): Promise<iApiResponse<SearchRelationshipsQuery>> => {
  try {
    const oneOrZero = returnOneOrZero();
    const { data, errors } = await GraphqlAPI<
      SearchRelationshipsQuery,
      SearchRelationshipsQueryVariables
    >(customQueries.searchRecommendedFollowingSignedOut, {
      limit: paginatedLimit || PAGINATED_USER_RECOMMENDATION_LIMIT,
      // so it's not biased towards old or new users
      sort: oneOrZero
        ? [{ direction: SearchableSortDirection.asc }]
        : [{ direction: SearchableSortDirection.desc }],
      nextToken,
    });
    if (!data?.searchRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting recommended followers', err);
  }
};

export const getFriendsPredictingEvent = async (
  followingUserId: string,
  eventId: string,
): Promise<iApiResponse<ListRelationshipsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      ListRelationshipsQuery,
      { followingUserId: string; eventId: string }
    >(customQueries.getFriendsPredictingEventQuery, {
      followingUserId,
      eventId,
    });
    if (!data?.listRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting friends predicting event', err);
  }
};
