import {
  CreateRelationshipMutation,
  CreateRelationshipMutationVariables,
  DeleteRelationshipMutation,
  DeleteRelationshipMutationVariables,
  ListRelationshipsQuery,
  ListRelationshipsQueryVariables,
  ListUsersQueryVariables,
  RelationshipByFollowedUserIdQuery,
  RelationshipByFollowedUserIdQueryVariables,
  RelationshipByFollowingUserIdQueryVariables,
  SearchRelationshipsQueryVariables,
  UniqueRelationshipViaFollowedUserQuery,
  UniqueRelationshipViaFollowedUserQueryVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as customQueries from '../../graphqlCustom/queries';
import {
  ListUsersQuery,
  RelationshipByFollowingUserIdQueryCustom,
  SearchRelationshipsQuery,
} from '../../graphqlCustom/types';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

export const getUniqueRelationship = async (
  followedUserId: string,
  followingUserId: string,
): Promise<iApiResponse<UniqueRelationshipViaFollowedUserQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UniqueRelationshipViaFollowedUserQuery,
      UniqueRelationshipViaFollowedUserQueryVariables
    >(customQueries.uniqueRelationshipViaFollowedUser, {
      followedUserId,
      followingUserId: { eq: followingUserId },
    });
    if (!data?.uniqueRelationshipViaFollowedUser) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting relationship', err);
  }
};

/**
 * MUTTIONS
 */

export const followUser = async (
  followedUserId: string,
  followingUserId: string,
): Promise<iApiResponse<CreateRelationshipMutation>> => {
  try {
    // first, safety check and don't create if relationship already exists
    const maybeRelationships = await getUniqueRelationship(
      followedUserId,
      followingUserId,
    );
    if (maybeRelationships.status !== 'success') {
      throw new Error(JSON.stringify(maybeRelationships.error));
    }
    if (
      (maybeRelationships.data?.uniqueRelationshipViaFollowedUser?.items || []).length > 0
    ) {
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
    const maybeRelationships = await getUniqueRelationship(
      followedUserId,
      followingUserId,
    );
    if (maybeRelationships.status !== 'success') {
      throw new Error(JSON.stringify(maybeRelationships.error));
    }
    if (maybeRelationships.data?.uniqueRelationshipViaFollowedUser?.items?.length === 0) {
      throw new Error('relationship not found');
    }
    const relationship =
      maybeRelationships.data?.uniqueRelationshipViaFollowedUser?.items[0];
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

export const deleteRelationshipById = async (
  id: string,
): Promise<iApiResponse<DeleteRelationshipMutation>> => {
  try {
    // use relationship id to delete
    const { data, errors } = await GraphqlAPI<
      DeleteRelationshipMutation,
      DeleteRelationshipMutationVariables
    >(mutations.deleteRelationship, { input: { id } });
    if (!data?.deleteRelationship) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error unfollowing user', err);
  }
};

/**
 * GENERIC "WHO IS FOLLOWING" QUERIES (optional pagination)
 */

// aka, get followers (returns followingUsers)
export const getWhoUserIsFollowedBy = async (
  followedUserId: string,
  options?: { limit?: number; nextToken?: string },
): Promise<iApiResponse<RelationshipByFollowedUserIdQuery>> => {
  const { limit, nextToken } = options || {};
  try {
    const { data, errors } = await GraphqlAPI<
      RelationshipByFollowedUserIdQuery,
      RelationshipByFollowedUserIdQueryVariables
    >(customQueries.getWhoUserIsFollowedBy, {
      followedUserId,
      limit,
      nextToken,
    });
    if (!data?.relationshipByFollowedUserId) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting who user is followed by', err);
  }
};

// aka, get followings (returns followedUsers)
export const getWhoUserIsFollowing = async (
  followingUserId: string, // get users who this user is following
  options?: { limit?: number; nextToken?: string },
): Promise<iApiResponse<RelationshipByFollowingUserIdQueryCustom>> => {
  const { limit, nextToken } = options || {};
  try {
    const { data, errors } = await GraphqlAPI<
      RelationshipByFollowingUserIdQueryCustom,
      RelationshipByFollowingUserIdQueryVariables
    >(customQueries.getWhoUserIsFollowing, {
      followingUserId,
      limit,
      nextToken,
    });
    if (!data?.relationshipByFollowingUserId) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting who user is following', err);
  }
};

/**
 * PAGINATED QUERIES (for recommendations, pagination enforced in query)
 */

// Gets users who you are following, then who THEY are following
export const getWhoPeopleUserFollowsAreFollowing = async (
  followingUserId: string,
  nextToken?: string | undefined,
): Promise<iApiResponse<RelationshipByFollowingUserIdQueryCustom>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      RelationshipByFollowingUserIdQueryCustom,
      RelationshipByFollowingUserIdQueryVariables
    >(customQueries.getWhoPeopleUserFollowsAreFollowing, {
      followingUserId,
      nextToken,
    });
    if (!data?.relationshipByFollowingUserId) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting who people user follows are following', err);
  }
};

// Gets random users, then who THEY are following
export const getWhoRandomUsersAreFollowing = async (
  nextToken?: string | undefined,
): Promise<iApiResponse<ListUsersQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<ListUsersQuery, ListUsersQueryVariables>(
      customQueries.getWhoRandomUsersAreFollowing,
      { nextToken },
    );
    if (!data?.listUsers) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting who random users are following', err);
  }
};

/**
 * COUNT queries (uses OpenSearch so we COULD replace if expensiv)
 */

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

/**
 * RELATIONSHIPS WITH EXTRA INFO
 */

// TODO: can optimize. See query for details (is fine for now but should be optimized for scaling)
export const getFriendsPredictingEvent = async (
  followingUserId: string,
  eventId: string,
): Promise<iApiResponse<RelationshipByFollowingUserIdQueryCustom>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      RelationshipByFollowingUserIdQueryCustom,
      RelationshipByFollowingUserIdQueryVariables & { eventId: string }
    >(customQueries.getFriendsPredictingEventQuery, {
      followingUserId,
      eventId,
    });
    if (!data?.relationshipByFollowingUserId) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting friends predicting event', err);
  }
};

// returns user with the recent predictions of those they follow
export const getRecentFollowingPredictions = async (
  followingUserId: string,
): Promise<iApiResponse<RelationshipByFollowingUserIdQueryCustom>> => {
  // get the date 30 days ago, so we don't return predictions that are too old
  const date = new Date();
  date.setDate(date.getDate() - 30); // 30 days ago
  const dateString = date.toISOString();

  try {
    const { data, errors } = await GraphqlAPI<
      RelationshipByFollowingUserIdQueryCustom,
      RelationshipByFollowingUserIdQueryVariables & {
        followingUserId: string;
        greaterThanDate: string;
      }
    >(customQueries.getRecentFollowingPredictions, {
      followingUserId,
      greaterThanDate: dateString,
    });
    if (!data?.relationshipByFollowingUserId) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user recent following predictions', err);
  }
};

/**
 * USED FOR SCRIPTS
 */

// Used for delete duplicate script
export const listEveryRelationship = async (): Promise<
  iApiResponse<ListRelationshipsQuery>
> => {
  try {
    const { data, errors } = await GraphqlAPI<
      ListRelationshipsQuery,
      ListRelationshipsQueryVariables
    >(customQueries.listEveryRelationship);
    if (!data?.listRelationships) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting relationship', err);
  }
};
