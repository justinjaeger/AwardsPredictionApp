import Serializers from '../../serializers';
import { iUser } from '../../types';
import ApiServices from '../graphql';
import getAuthFollowingUserIds from './getAuthFollowingUserIds';

type iPaginatedUserResult = Promise<{ users: iUser[]; nextToken: string | undefined }>;

const TEST_USER_EMAILS = [
  'ronjaeger@icloud.com',
  'test@test.com',
  'fjw8rchrbb@privaterelay.appleid.com',
];

const NUM_USERS_TO_FETCH = 15;

const filterUsers = (users: iUser[], authUserId: string | undefined) =>
  users.filter((user, index, self) => {
    // filter out users who we are already following
    const authUserIsNotFollowing = user.authUserIsFollowing === false;
    // filter out duplicates (users could be following the same person)
    const isDuplicate = index === self.findIndex((u) => u.id === user.id);
    // filter out ourselves from the potential user list (we could potentially get recommended to ourselves)
    const isNotUs = user.id !== authUserId;
    // ...AND get users who actually have a username
    const userHasNameOrUsername = user.username || user.name;
    // ...AND not test user accounts (prod only)
    const isNotTestUser = !TEST_USER_EMAILS.includes(user?.email);
    return (
      authUserIsNotFollowing &&
      isDuplicate &&
      isNotUs &&
      userHasNameOrUsername &&
      isNotTestUser
    );
  });

// It fetches recommended users by getting either your friends' or random users' followers and suggesting those
const getRecommendedUsers = async (
  authUserId?: string | undefined,
  nextToken?: string | undefined,
): iPaginatedUserResult => {
  let finalUsers: iUser[] = [];
  const localNextToken: string | undefined = nextToken;
  let returnedZeroUsers = false;

  const authFollowingUserIds = await getAuthFollowingUserIds(authUserId);

  const fetchPage = async ({
    nextToken,
    fetchRandom,
  }: {
    nextToken?: string;
    fetchRandom?: boolean;
  }): Promise<{ nextToken: string | undefined; returnCount: number }> => {
    let users: iUser[] = []; // a user which has a property "following" which is a list of users they follow
    let localNextToken = nextToken;
    if (authUserId && !fetchRandom) {
      // base recommendations off who your friends follow
      const { data: data1 } = await ApiServices.getWhoPeopleUserFollowsAreFollowing(
        authUserId,
        localNextToken,
      );
      localNextToken = data1?.relationshipByFollowingUserId?.nextToken || undefined;
      const peopelWhoUserFollows = data1?.relationshipByFollowingUserId?.items || [];
      users = peopelWhoUserFollows.reduce((acc: iUser[], item) => {
        const followedUsers = (item?.followedUser?.following?.items || []).map(
          (r) => r?.followedUser,
        );
        const us = Serializers.getUsersWithIsFollowing(
          followedUsers,
          authFollowingUserIds,
        );
        acc.push(...us);
        return acc;
      }, []);
    } else {
      // base recommendations off who random users follow
      const { data: data2 } = await ApiServices.getWhoRandomUsersAreFollowing(
        localNextToken,
      );
      localNextToken = data2?.listUsers?.nextToken || undefined;
      const items2 = data2?.listUsers?.items || [];
      users = items2.reduce((acc: iUser[], item) => {
        const followedUsers = (item?.following?.items || []).map((r) => r?.followedUser);
        const us = Serializers.getUsersWithIsFollowing(
          followedUsers,
          authFollowingUserIds,
        );
        acc.push(...us);
        return acc;
      }, []);
    }

    const uniqueUsersWhoArentUs = filterUsers([...users, ...finalUsers], authUserId);
    finalUsers = uniqueUsersWhoArentUs;
    return { nextToken: localNextToken, returnCount: users.length }; // return THIS because it actually only matters what the last request returned for the while loop to continue, not what the total is
  };

  // request until we accumulate enough recommendations, OR until a request returns ZERO users (maybe we don't have many friends)
  let nt;
  while (returnedZeroUsers === false && finalUsers.length < NUM_USERS_TO_FETCH) {
    const { nextToken } = await fetchPage({ nextToken: nt });
    if (!nextToken) {
      returnedZeroUsers = true;
    }
    nt = nextToken;
  }

  // if we returned zero users, it means we couldn't find enough recommendations from friends. So, try to get random recommendations
  if (returnedZeroUsers) {
    await fetchPage({ fetchRandom: true }); // fetches random users, but still returns who a user is following instead of the user
    if (finalUsers.length < NUM_USERS_TO_FETCH) {
      // if STILL less, just get random users. Other requests try to get users who others follow, who are already popular. This is just purely random
      const { data } = await ApiServices.getUsersPaginated();
      const formattedUsers = Serializers.getUsersWithIsFollowing(
        data?.listUsers?.items || [],
        authFollowingUserIds,
      );
      const uniqueUsersWhoArentUs = filterUsers(
        [...formattedUsers, ...finalUsers],
        authUserId,
      );
      finalUsers = uniqueUsersWhoArentUs;
    }
  }

  return { users: finalUsers, nextToken: localNextToken };
};

export default getRecommendedUsers;
