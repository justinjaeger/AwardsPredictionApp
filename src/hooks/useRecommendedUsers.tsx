import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, WithId } from '../types/api';
import MongoApi from '../services/api/requests';
import useQueryGetFollowingUsers from './queries/useQueryGetFollowingUsers';

const MIN_NUM_OF_FOLLOWINGS_BEFORE_CUSTOM_SUGGESTIONS = 5;

// pagenatedly fetch recommended users that user isn't currently following
const useRecommendedUsers = () => {
  const { userId: authUserId } = useAuth();
  // TODO: Would prefer this at top level because it might not have everything fetched yet
  const { data: allFollowingUsers } = useQueryGetFollowingUsers();
  const authFollowingUserIds = allFollowingUsers?.map((u) => u._id) ?? [];

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [users, setUsers] = useState<WithId<User>[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchPage = async () => {
    const getMostFollowingPaginated = async (additionalPagesToAdd: number) => {
      // NOTE: I hope this isn't stale
      const { data } = await MongoApi.listMostFollowedPaginated(
        pageNumber + additionalPagesToAdd,
      );
      return data ?? [];
    };

    setIsFetching(true);
    let suggestedUsers: WithId<User>[] = [];
    if (authUserId) {
      // if user is signed in, get who they are following
      // THEN get who THOSE users are following
      const { data } = await MongoApi.listFollowingPaginated({
        userId: authUserId,
        pageNumber,
      });
      const whoAuthUserIsFollowing = data ?? [];
      // if user doesn't follow many people, keep suggesting the most followed
      if (
        whoAuthUserIsFollowing.length < MIN_NUM_OF_FOLLOWINGS_BEFORE_CUSTOM_SUGGESTIONS
      ) {
        // also, fetch a deeper page the more users they follow
        suggestedUsers = await getMostFollowingPaginated(whoAuthUserIsFollowing.length);
      } else {
        // now get who these users are following
        const whoTheseUsersFollowRequests = whoAuthUserIsFollowing.map((user) =>
          MongoApi.listFollowingPaginated({
            userId: user._id,
            pageNumber,
          }),
        );
        const res = await Promise.all(whoTheseUsersFollowRequests);
        const whoTheseUsersFollow = res.flatMap((r) => r.data ?? []);
        suggestedUsers = whoTheseUsersFollow;
      }
    } else {
      suggestedUsers = await getMostFollowingPaginated(0);
    }

    // filter out users who we are already following
    suggestedUsers = suggestedUsers.filter(
      (user) => !authFollowingUserIds.includes(user._id),
    );
    // filter out duplicates (users could be following the same person)
    suggestedUsers = suggestedUsers.filter(
      (user, index, self) => index === self.findIndex((u) => u._id === user._id),
    );
    // filter out ourselves from the potential user list (we could potentially get recommended to ourselves)
    suggestedUsers = suggestedUsers.filter((user) => user._id !== authUserId);
    // ...AND get users who actually have a username
    suggestedUsers = suggestedUsers.filter((user) => user.username || user.name);

    setPageNumber((prev) => prev + 1);
    setIsFetching(false);

    setUsers((prev) => [...prev, ...suggestedUsers]);
  };

  useEffect(() => {
    fetchPage();
  }, [authUserId]);

  // export fetchPage to allow user to fetch next page
  return { users, isFetching, fetchMoreResults: fetchPage };
};

export default useRecommendedUsers;
