import { useEffect, useState } from 'react';
import { useAuth } from '../../context/UserContext';
import useQueryGetUserProfile from '../../hooks/queries/useQueryGetUserProfile';
import { User, WithId } from '../../types/api';
import MongoApi from '../../services/api/requests';
import { useAsyncStorePrefetch } from '../../context/AsyncStorePrefetch';

/**
 * We fetch the Auth user differently than a non-auth user
 * This is because query keys can't expire their data because Profile component is re-used
 * Must refresh component whenever a new user profile is loaded
 */
const useProfileUser = (userId: string | undefined) => {
  const { userId: authUserId } = useAuth();
  const { storeTmdbDataFromRecentPredictions } = useAsyncStorePrefetch();

  const [isLoadingProfileUser, setIsLoading] = useState<boolean>(true);
  const [profileUser, setProfileUser] = useState<WithId<User> | undefined>(undefined);
  const [authUserIsFollowing, setAuthUserIsFollowing] = useState<boolean>(false);
  const [isFollowingAuthUser, setIsFollowingAuthUser] = useState<boolean>(false);

  // fetch auth-user data
  const {
    data: authUser,
    isLoading: isLoadingAuthUser,
    refetch: refetchAuthUserProfile,
  } = useQueryGetUserProfile(authUserId);

  // refetch auth user profile when a new user is logged in (else it's stale)
  useEffect(() => {
    refetchAuthUserProfile();
  }, [authUserId]);

  // fetch non-auth-user data
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    MongoApi.getUser({ userId })
      .then(({ data: user }) => {
        setProfileUser(user);
        // store tmdb data from recent predictions
        const predictionSets = user?.recentPredictionSets;
        storeTmdbDataFromRecentPredictions(predictionSets || []);
      })
      .finally(() => setIsLoading(false));
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

  const isLoading = isLoadingAuthUser || isLoadingProfileUser;
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
