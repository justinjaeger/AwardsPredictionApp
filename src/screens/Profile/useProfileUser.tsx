import { useEffect, useState } from 'react';
import { useAuth } from '../../context/UserContext';
import useQueryGetUser from '../../hooks/queries/getUser';
import useQueryGetRelationshipCount from '../../hooks/queries/useQueryGetRelationshipCount';
import getRelationshipCount from '../../services/queryFuncs/getRelationshipCount';
import getUserEvents from '../../services/queryFuncs/getUserEvents';
import getUserProfile from '../../services/queryFuncs/getUserProfile';
import { iUser } from '../../types';

const useProfileUser = (userId: string | undefined) => {
  const { userId: authUserId } = useAuth();

  const [isLoadingProfileUser, setIsLoading] = useState<boolean>(true);
  const [profileUser, setUser] = useState<iUser | undefined>(undefined);
  const [followingCount, setFollowingCount] = useState<number | undefined>(undefined);
  const [followerCount, setFollowerCount] = useState<number | undefined>(undefined);
  const [userEventIds, setUserEventIds] = useState<string[]>([]);

  // This query ONLY RETURNS basic profile info about user
  // The ONLY PURPOSE is so we can use the expiring query keys and update username/bio/image in real time
  // See the "if" statement before the bottom "return"
  // The more detailed/nested query is handled by getUserProfile in the useEffect, so that data isn't refetched when queryKey expires e.g. profile pic changes
  const { data: authUser, isLoading: isLoadingAuthUser } = useQueryGetUser(authUserId);
  // get relationship count for auth user because these values also need to update with useQuery keys
  const { data: authRelationshipCountData } = useQueryGetRelationshipCount(authUserId);

  const isLoading = isLoadingAuthUser || isLoadingProfileUser;

  const isDeviceProfile = profileUser && userId && profileUser?.id === authUserId;

  // we have to do this and NOT useQuery because it's re-used across many profile that might be in the stack
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    // get user profile info
    getUserProfile(userId, authUserId)
      .then((res) => setUser(res))
      .finally(() => setIsLoading(false));
    // get follower / following count
    getRelationshipCount(userId).then(({ followingCount, followerCount }) => {
      setFollowingCount(followingCount);
      setFollowerCount(followerCount);
    });
    // get events user has predicted
    getUserEvents(userId).then((eventIds) => setUserEventIds(eventIds));
  }, [userId]);

  const user = profileUser;
  // Should use the authUser's data from useQuery hook because this info can change and it will never be stale
  if (user && isDeviceProfile) {
    user.username = authUser?.username;
    user.bio = authUser?.bio;
    user.image = authUser?.image;
    user.name = authUser?.name;
  }

  const _followingCount = isDeviceProfile
    ? authRelationshipCountData?.followingCount || 0
    : followingCount || 0;
  const _followerCount = isDeviceProfile
    ? authRelationshipCountData?.followerCount || 0
    : followerCount || 0;

  return {
    isLoading,
    setIsLoading,
    user,
    followingCount: _followingCount,
    followerCount: _followerCount,
    userEventIds,
    authUser,
  };
};

export default useProfileUser;
