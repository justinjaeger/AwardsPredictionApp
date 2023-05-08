import { UserRole } from '../../API';
import { iUser } from '../../types';
import ApiServices from '../graphql';

type iPaginatedUserResult = Promise<{ users: iUser[]; nextToken: string | undefined }>;

export const getPaginatedFollowers = async (
  userId: string,
  authUserId: string | undefined,
  nextToken?: string,
): iPaginatedUserResult => {
  let items = [];
  let nextPaginateToken; // send this in subsequent request to get the next page of results
  if (authUserId) {
    const res = await ApiServices.getPaginatedFollowersSignedIn(
      userId,
      authUserId,
      nextToken,
    );
    items = res.data?.relationshipByFollowedUserId?.items || [];
    nextPaginateToken = res.data?.relationshipByFollowedUserId?.nextToken;
  } else {
    const res = await ApiServices.getPaginatedFollowersSignedOut(userId, nextToken);
    items = res.data?.relationshipByFollowedUserId?.items || [];
    nextPaginateToken = res.data?.relationshipByFollowedUserId?.nextToken;
  }
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
      // @ts-ignore
      authUserIsFollowing: (u?.followers?.items || []).length > 0,
      // @ts-ignore
      isFollowingAuthUser: (u?.following?.items || []).length > 0,
    };
  });

  return { users, nextToken: nextPaginateToken || undefined };
};

export const getPaginatedFollowing = async (
  userId: string,
  authUserId: string | undefined,
  nextToken?: string,
): iPaginatedUserResult => {
  let items = [];
  let nextPaginateToken; // send this in subsequent request to get the next page of results
  if (authUserId) {
    const res = await ApiServices.getPaginatedFollowingSignedIn(
      userId,
      authUserId,
      nextToken,
    );
    items = res.data?.relationshipByFollowingUserId?.items || [];
    nextPaginateToken = res.data?.relationshipByFollowingUserId?.nextToken;
  } else {
    const res = await ApiServices.getPaginatedFollowingSignedOut(userId, nextToken);
    items = res.data?.relationshipByFollowingUserId?.items || [];
    nextPaginateToken = res.data?.relationshipByFollowingUserId?.nextToken;
  }
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
      // @ts-ignore
      authUserIsFollowing: (u?.followers?.items || []).length > 0,
      // @ts-ignore
      isFollowingAuthUser: (u?.followers?.items || []).length > 0,
    };
  });

  return { users, nextToken: nextPaginateToken || undefined };
};
