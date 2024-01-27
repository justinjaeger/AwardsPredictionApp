import { iUserInfo } from '../navigation/types';
import { User, WithId } from '../models';

export const getUserInfo = (
  user: WithId<User> | null | undefined,
): iUserInfo | undefined => {
  return user?._id
    ? {
        userId: user?._id,
        userName: user.name ?? user.username ?? '',
        userImage: user?.image,
      }
    : undefined;
};
