import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MongoApi from '../../services/api/requests';
import useQueryGetUser from '../../hooks/queries/useQueryGetUser';
import useQueryGetFollowingUsers from '../../hooks/queries/useQueryGetFollowingUsers';

const useProfileUser = (userId: string | undefined) => {
  const { userId: authUserId } = useAuth();

  const [isLoadingSomething, setIsLoading] = useState<boolean>(false);
  const [authUserIsFollowing, setAuthUserIsFollowing] = useState<boolean>(false);
  const [isFollowingAuthUser, setIsFollowingAuthUser] = useState<boolean>(false);

  const { data: user, isLoading: isLoadingProfileUser } = useQueryGetUser(userId);
  const { usersIdsAuthUserIsFollowing } = useQueryGetFollowingUsers();

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    if (authUserId) {
      MongoApi.getRelationship(userId, authUserId).then(({ data: relationship }) => {
        const userIsFollowingAuthUser = !!relationship;
        setIsFollowingAuthUser(userIsFollowingAuthUser);
      });
      setAuthUserIsFollowing(usersIdsAuthUserIsFollowing.includes(userId));
    }
  }, [authUserId, userId]);

  const isLoading = isLoadingSomething || isLoadingProfileUser;

  return {
    isLoading,
    setIsLoading,
    user,
    authUserIsFollowing,
    isFollowingAuthUser,
  };
};

export default useProfileUser;
