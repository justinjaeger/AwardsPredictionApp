import Serializers from '../../serializers';
import { iUser } from '../../types';
import ApiServices from '../graphql';

type iPaginatedUserResult = Promise<{ users: iUser[]; nextToken: string | undefined }>;

type iPaginatedRelationshipsParams = {
  userId: string;
  authFollowingUserIds: string[];
  limit: number;
  nextToken?: string;
};

export const getPaginatedFollowers = async ({
  userId,
  authFollowingUserIds,
  limit,
  nextToken,
}: iPaginatedRelationshipsParams): iPaginatedUserResult => {
  const res = await ApiServices.getWhoUserIsFollowedBy(userId, {
    limit,
    nextToken,
  });
  const nextPaginateToken = res.data?.relationshipByFollowedUserId?.nextToken;
  const followingUsers = (res.data?.relationshipByFollowedUserId?.items || []).map(
    (item) => item?.followingUser,
  );

  const users = Serializers.getUsersWithIsFollowing(followingUsers, authFollowingUserIds);

  return { users, nextToken: nextPaginateToken || undefined };
};

export const getPaginatedFollowing = async ({
  userId,
  authFollowingUserIds,
  limit,
  nextToken,
}: iPaginatedRelationshipsParams): iPaginatedUserResult => {
  const res = await ApiServices.getWhoUserIsFollowing(userId, {
    limit,
    nextToken,
  });
  const nextPaginateToken = res.data?.relationshipByFollowingUserId?.nextToken;
  const followedUsers = (res.data?.relationshipByFollowingUserId?.items || []).map(
    (item) => item?.followedUser,
  );

  const users = Serializers.getUsersWithIsFollowing(followedUsers, authFollowingUserIds);

  return { users, nextToken: nextPaginateToken || undefined };
};
