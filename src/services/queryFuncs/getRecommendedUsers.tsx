import { UserRole } from '../../API';
import { iUser } from '../../types';
import ApiServices from '../graphql';

type iPaginatedUserResult = Promise<{ users: iUser[]; nextToken: string | undefined }>;

const TEST_USER_EMAILS = [
  'ronjaeger@icloud.com',
  'test@test.com',
  'fjw8rchrbb@privaterelay.appleid.com',
];

const NUM_USERS_TO_FETCH = 15;

// filter out duplicates (users could be following the same person)
// filter out ourselves from the potential user list (we could potentially get recommended to ourselves)
const getUniqueUsersWhoAreNotUs = (users: iUser[], authUserId: string | undefined) =>
  users.filter((user, index, self) => {
    const isDuplicate = index === self.findIndex((u) => u.id === user.id);
    const isNotUs = user.id !== authUserId;
    // ...AND get users who actually have a username
    const userHasNameOrUsername = user.username || user.name;
    // ...AND not test user accounts (prod only)
    const isNotTestUser = !TEST_USER_EMAILS.includes(user?.email);
    return isDuplicate && isNotUs && userHasNameOrUsername && isNotTestUser;
  });

// It fetches recommended users by getting either your friends' or random users' followers and suggesting those
const getRecommendedUsers = async (
  authUserId?: string | undefined,
  nextToken?: string | undefined,
): iPaginatedUserResult => {
  let finalUsers: iUser[] = [];
  const localNextToken: string | undefined = nextToken;
  let returnedZeroUsers = false;

  let alreadyFollowedUserIds: string[] = [];
  if (authUserId) {
    // we want alreadyFollowedUserIds so we don't recommend people the user is already following later
    const { data } = await ApiServices.getWhoUserIsFollowing(authUserId);
    alreadyFollowedUserIds =
      data?.relationshipByFollowingUserId?.items?.reduce((acc: string[], item) => {
        if (item?.id) {
          acc.push(item.id);
        }
        return acc;
      }, []) || [];
  }

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
        const relationships = item?.followedUser?.following?.items || [];
        // IDENTICAL TO OTHER STATEMENT!! (if below must change, so should other)
        for (const r of relationships) {
          const recommendedUser = r?.followedUser;
          if (!recommendedUser) {
            return acc;
          }
          const authUserIsFollowing = alreadyFollowedUserIds.includes(recommendedUser.id);
          // if authUser is NOT already following them, add them to the list
          if (!authUserIsFollowing) {
            // some of these values we don't care about or use so they can be default
            acc.push({
              id: recommendedUser.id,
              email: recommendedUser.email,
              role: UserRole.USER,
              username: recommendedUser.username || undefined,
              name: recommendedUser.name || undefined,
              image: recommendedUser.image || undefined,
              bio: recommendedUser.bio || undefined,
              authUserIsFollowing,
            });
          }
        }
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
        const relationships = item?.following?.items || [];
        // IDENTICAL TO OTHER STATEMENT!! (if below must change, so should other)
        for (const r of relationships) {
          const recommendedUser = r?.followedUser;
          if (!recommendedUser) {
            return acc;
          }
          const authUserIsFollowing = alreadyFollowedUserIds.includes(recommendedUser.id);
          // if authUser is NOT already following them, add them to the list
          if (!authUserIsFollowing) {
            // some of these values we don't care about or use so they can be default
            acc.push({
              id: recommendedUser.id,
              email: recommendedUser.email,
              role: UserRole.USER,
              username: recommendedUser.username || undefined,
              name: recommendedUser.name || undefined,
              image: recommendedUser.image || undefined,
              bio: recommendedUser.bio || undefined,
              authUserIsFollowing,
            });
          }
        }
        return acc;
      }, []);
    }

    const uniqueUsersWhoArentUs = getUniqueUsersWhoAreNotUs(
      [...users, ...finalUsers],
      authUserId,
    );
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
      const formattedUsers: iUser[] = (data?.listUsers?.items || []).reduce(
        (acc: iUser[], u) => {
          if (u) {
            const authUserIsFollowing = alreadyFollowedUserIds.includes(u.id);
            acc.push({
              id: u.id,
              email: u.email,
              role: UserRole.USER,
              username: u.username || undefined,
              name: u.name || undefined,
              image: u.image || undefined,
              bio: u.bio || undefined,
              authUserIsFollowing,
            });
          }
          return acc;
        },
        [],
      );
      const usersWeDoNotFollow = formattedUsers.filter(
        (user) => user.authUserIsFollowing === false,
      );
      const uniqueUsersWhoArentUs = getUniqueUsersWhoAreNotUs(
        [...usersWeDoNotFollow, ...finalUsers],
        authUserId,
      );

      finalUsers = uniqueUsersWhoArentUs;
    }
  }

  return { users: finalUsers, nextToken: localNextToken };
};

export default getRecommendedUsers;
