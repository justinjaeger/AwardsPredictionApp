import { UserRole } from '../../API';
import { iUser } from '../../types';
import ApiServices from '../graphql';

type iPaginatedUserResult = Promise<{ users: iUser[]; nextToken: string }>;

export const getPaginatedFollowers = async (
  userId: string,
  authUserId: string | undefined,
  nextToken?: string,
): iPaginatedUserResult => {
  const Request = authUserId
    ? ApiServices.getPaginatedFollowersSignedIn(userId, authUserId, nextToken)
    : ApiServices.getPaginatedFollowersSignedOut(userId, nextToken);
  const res = await Request;
  const items = res.data?.searchRelationships?.items || [];
  const users: iUser[] = items.map((item) => {
    const u = item?.followingUser;
    // some of these values we don't care about or use so they can be default
    return {
      id: u?.id || '',
      email: '',
      role: UserRole.USER,
      username: u?.username || undefined,
      name: u?.name || undefined,
      image: u?.image || undefined,
      bio: u?.bio || undefined,
      authUserIsFollowing: (u?.followers?.items || []).length > 0,
      isFollowingAuthUser: (u?.followers?.items || []).length > 0,
    };
  });

  return { users, nextToken: '' };
};

export const getPaginatedFollowing = async (
  userId: string,
  authUserId: string | undefined,
  nextToken?: string,
): iPaginatedUserResult => {
  const Request = authUserId
    ? ApiServices.getPaginatedFollowingSignedIn(userId, authUserId, nextToken)
    : ApiServices.getPaginatedFollowingSignedOut(userId, nextToken);
  const res = await Request;
  const items = res.data?.searchRelationships?.items || [];
  const nextPaginateToken = res.data?.searchRelationships?.nextToken; // send this in subsequent request to get the next page of results
  const users: iUser[] = items.map((item) => {
    const u = item?.followedUser;
    // some of these values we don't care about or use so they can be default
    return {
      id: u?.id || '',
      email: '',
      role: UserRole.USER,
      username: u?.username || undefined,
      name: u?.name || undefined,
      image: u?.image || undefined,
      bio: u?.bio || undefined,
      authUserIsFollowing: (u?.followers?.items || []).length > 0,
      isFollowingAuthUser: (u?.followers?.items || []).length > 0,
    };
  });

  return { users, nextToken: nextPaginateToken || '' };
};
