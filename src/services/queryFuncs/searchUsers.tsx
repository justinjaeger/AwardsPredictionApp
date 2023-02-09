/* eslint-disable sonarjs/prefer-immediate-return */
import { UserRole } from '../../API';
import { iUser } from '../../types';
import ApiServices from '../graphql';

const searchUsers = async (
  search: string,
  authUserId: string | undefined,
): Promise<iUser[]> => {
  const res = authUserId
    ? await ApiServices.searchUsersSignedIn(search, authUserId)
    : await ApiServices.searchUsersSignedOut(search);
  const result: iUser[] = (res.data?.searchUsers?.items || []).map((item) => ({
    id: item?.id || '',
    email: item?.email || '',
    role: item?.role || UserRole.USER,
    username: item?.username || undefined,
    name: item?.name || undefined,
    image: item?.image || undefined,
    bio: item?.bio || undefined,
    authUserIsFollowing: (item?.followers?.items || []).length > 0,
    isFollowingAuthUser: (item?.followers?.items || []).length > 0,
  }));
  return result;
};

export default searchUsers;
