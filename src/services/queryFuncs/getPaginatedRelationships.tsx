import Serializers from '../../serializers';
import { iUser } from '../../types';
import ApiServices from '../graphql';

type iPaginatedUserResult = Promise<{ users: iUser[]; nextToken: string | undefined }>;

const getauthFollowingUserIds = async (authUserId: string | undefined) => {
  let authFollowingUserIds: string[] = [];
  if (authUserId) {
    const { data } = await ApiServices.getWhoUserIsFollowing(authUserId);
    const followedUsers = (data?.relationshipByFollowingUserId?.items || []).map(
      (r) => r?.followedUser,
    );
    authFollowingUserIds = followedUsers.map((u) => u?.id || '');
  }
  return authFollowingUserIds;
};

export const getPaginatedFollowers = async (
  userId: string,
  authUserId: string | undefined,
  nextToken?: string,
): iPaginatedUserResult => {
  // To get authUserIsFollowing, get who WE follow, then check if the user is in that list
  const authFollowingUserIds = await getauthFollowingUserIds(authUserId);

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
  const authFollowingUserIds = await getauthFollowingUserIds(authUserId);

  const res = await ApiServices.getWhoUserIsFollowing(userId, { nextToken });
  const nextPaginateToken = res.data?.relationshipByFollowingUserId?.nextToken;
  const followedUsers = (res.data?.relationshipByFollowingUserId?.items || []).map(
    (item) => item?.followedUser,
  );

  const users = Serializers.getUsersWithIsFollowing(followedUsers, authFollowingUserIds);

  return { users, nextToken: nextPaginateToken || undefined };
};
