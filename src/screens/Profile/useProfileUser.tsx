import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MongoApi from '../../services/api/requests';
import useQueryGetUser from '../../hooks/queries/useQueryGetUser';

/**
 * We fetch the Auth user differently than a non-auth user
 * This is because query keys can't expire their data because Profile component is re-used
 * Must refresh component whenever a new user profile is loaded
 */
const useProfileUser = (userId: string | undefined) => {
  const { userId: authUserId } = useAuth();

  const [isLoadingSomething, setIsLoading] = useState<boolean>(false);
  const [authUserIsFollowing, setAuthUserIsFollowing] = useState<boolean>(false);
  const [isFollowingAuthUser, setIsFollowingAuthUser] = useState<boolean>(false);

  // fetch auth-user data
  const {
    data: authUser,
    isLoading: isLoadingAuthUser,
    refetch: refetchAuthUserProfile,
  } = useQueryGetUser(authUserId);

  // fetch non-auth-user data
  const { data: profileUser, isLoading: isLoadingProfileUser } = useQueryGetUser(userId);

  // refetch auth user profile when a new user is logged in (else it's stale)
  useEffect(() => {
    refetchAuthUserProfile();
  }, [authUserId]);

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
      MongoApi.getRelationship(authUserId, userId).then(({ data: relationship }) => {
        const authUserIsFollowing = !!relationship;
        setAuthUserIsFollowing(authUserIsFollowing);
      });
    }
  }, [authUserId, userId]);

  const isLoading = isLoadingSomething || isLoadingAuthUser || isLoadingProfileUser;
  const isDeviceProfile = !!profileUser && !!userId && profileUser?._id === authUserId;
  const user = isDeviceProfile ? authUser : profileUser;

  return {
    isLoading,
    setIsLoading,
    user,
    authUser,
    authUserIsFollowing,
    isFollowingAuthUser,
  };
};

export default useProfileUser;
