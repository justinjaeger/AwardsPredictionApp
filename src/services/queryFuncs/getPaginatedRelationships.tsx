import { UserRole } from '../../API';
import { iUser } from '../../types';
import ApiServices from '../graphql';

export const getPaginatedFollowers = async (
  userId: string,
  nextToken?: string,
): Promise<{ followers: iUser[]; nextToken: string }> => {
  const res = await ApiServices.getPaginatedFollowers(userId, nextToken);
  const items = res.data?.searchRelationships?.items || [];
  const followers: iUser[] = items.map((item) => {
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
    };
  });

  return { followers, nextToken: '' };
};

export const getPaginatedFollowing = async (
  userId: string,
  nextToken?: string,
): Promise<{ followers: iUser[]; nextToken: string }> => {
  const res = await ApiServices.getPaginatedFollowing(userId, nextToken);
  const items = res.data?.searchRelationships?.items || [];
  const nextPaginateToken = res.data?.searchRelationships?.nextToken; // send this in subsequent request to get the next page of results
  const followers: iUser[] = items.map((item) => {
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
    };
  });

  return { followers, nextToken: nextPaginateToken || '' };
};
