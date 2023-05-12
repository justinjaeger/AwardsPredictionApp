import Serializers from '../../serializers';
import { iUser } from '../../types';
import ApiServices from '../graphql';
import getAuthFollowingUserIds from './getAuthFollowingUserIds';

type iPaginatedUserResult = Promise<{ users: iUser[]; nextToken: string | undefined }>;

export const getPaginatedFollowers = async (
  userId: string,
  authUserId: string | undefined,
  nextToken?: string,
): iPaginatedUserResult => {
  // To get authUserIsFollowing, get who WE follow, then check if the user is in that list
  const authFollowingUserIds = await getAuthFollowingUserIds(authUserId);

  const res = await ApiServices.getWhoUserIsFollowedBy(userId, { nextToken });
  const nextPaginateToken = res.data?.relationshipByFollowedUserId?.nextToken;
  const followingUsers = (res.data?.relationshipByFollowedUserId?.items || []).map(
    (item) => item?.followingUser,
  );

  const users = Serializers.getUsersWithIsFollowing(followingUsers, authFollowingUserIds);

  return { users, nextToken: nextPaginateToken || undefined };
};

export const getPaginatedFollowing = async (
  userId: string,
  authUserId: string | undefined,
  nextToken?: string,
): iPaginatedUserResult => {
  // To get authUserIsFollowing, get who WE follow, then check if the user is in that list
  const authFollowingUserIds = await getAuthFollowingUserIds(authUserId);

  const res = await ApiServices.getWhoUserIsFollowing(userId, { nextToken });
  const nextPaginateToken = res.data?.relationshipByFollowingUserId?.nextToken;
  const followedUsers = (res.data?.relationshipByFollowingUserId?.items || []).map(
    (item) => item?.followedUser,
  );

  const users = Serializers.getUsersWithIsFollowing(followedUsers, authFollowingUserIds);

  return { users, nextToken: nextPaginateToken || undefined };
};
