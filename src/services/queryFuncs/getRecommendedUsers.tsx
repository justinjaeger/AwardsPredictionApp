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

// TODO: We don't actually know if this works, need to test with many more users, all of whom are following people
// It fetches recommended users by getting either your friends' or random users' followers and suggesting those
const getRecommendedUsers = async (
  authUserId?: string | undefined,
  nextToken?: string | undefined,
): iPaginatedUserResult => {
  let finalUsers: iUser[] = [];
  let localNextToken: string | undefined = nextToken;
  let returnedZeroUsers = false;

  const fetchPage = async (fetchRandom = false) => {
    // handle case for signed in and signed out
    const Request = authUserId
      ? fetchRandom
        ? ApiServices.getRecommendedFollowersFromRandom(authUserId, localNextToken)
        : ApiServices.getRecommendedFollowersFromFriends(authUserId, localNextToken)
      : ApiServices.getRecommendedFollowersFromRandomSignedOut(localNextToken);

    const { data } = await Request;
    const followedUsers = data?.searchRelationships?.items || [];
    localNextToken = data?.searchRelationships?.nextToken || undefined; // send this in subsequent request to get the next page of results

    const users: iUser[] = followedUsers.reduce((acc: iUser[], item) => {
      const recommendedUsers = item?.followedUser?.following?.items || [];
      for (const u of recommendedUsers) {
        const recommendedUser = u?.followedUser;
        const authUserIsFollowing = (recommendedUser?.followers?.items || []).length > 0; // might just be a ts error
        // if authUser is NOT already following them, add them to the list
        if (!authUserIsFollowing) {
          // some of these values we don't care about or use so they can be default
          acc.push({
            id: recommendedUser?.id || '',
            email: recommendedUser?.email || '',
            role: UserRole.USER,
            username: recommendedUser?.username || undefined,
            name: recommendedUser?.name || undefined,
            image: recommendedUser?.image || undefined,
            bio: recommendedUser?.bio || undefined,
            authUserIsFollowing,
          });
        }
      }
      return acc;
    }, []);

    const uniqueUsersWhoArentUs = getUniqueUsersWhoAreNotUs(
      [...users, ...finalUsers],
      authUserId,
    );
    finalUsers = uniqueUsersWhoArentUs;
    return users.length; // return THIS because it actually only matters what the last request returned for the while loop to continue, not what the total is
  };

  // request until we accumulate enough recommendations, OR until a request returns ZERO users (maybe we don't have many friends)
  while (returnedZeroUsers === false && finalUsers.length < NUM_USERS_TO_FETCH) {
    const returnCount = await fetchPage();
    if (returnCount === 0) {
      returnedZeroUsers = true;
    }
  }

  // if we returned zero users, it means we couldn't find enough recommendations from friends. So, try to get random recommendations
  if (returnedZeroUsers) {
    await fetchPage(true); // fetches random users, but still returns who a user is following instead of the user
    if (finalUsers.length < NUM_USERS_TO_FETCH) {
      // if STILL less, just get random users. Other requests try to get users who others follow, who are already popular. This is just purely random
      const Request = authUserId
        ? ApiServices.getUsersNotFollowing(authUserId)
        : ApiServices.getAllUsers();
      const { data } = await Request;
      const formattedUsers: iUser[] = (data?.listUsers?.items || []).map((u) => ({
        id: u?.id || '',
        email: u?.email || '',
        role: UserRole.USER,
        username: u?.username || undefined,
        name: u?.name || undefined,
        image: u?.image || undefined,
        bio: u?.bio || undefined,
        authUserIsFollowing: (u?.followers?.items || []).length > 0, // might just be a ts error
      }));
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
