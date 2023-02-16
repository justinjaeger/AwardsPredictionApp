import { UserRole } from '../../API';
import { iUser } from '../../types';
import ApiServices from '../graphql';

type iPaginatedUserResult = Promise<{ users: iUser[]; nextToken: string | undefined }>;

const NUM_USERS_TO_FETCH = 15;

// TODO: We don't actually know if this works, need to test with many more users, all of whom are following people
// It fetches recommended users by getting either your friends' or random users' followers and suggesting those
const getRecommendedUsers = async (
  authUserId?: string | undefined,
  nextToken?: string | undefined,
): iPaginatedUserResult => {
  const finalUsers: iUser[] = [];
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
            email: '',
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
    finalUsers.push(...users);
    return users.length;
  };

  // request until we accumulate enough recommendations, OR until a request returns ZERO users (maybe we don't have many friends)
  while (returnedZeroUsers === false && finalUsers.length < NUM_USERS_TO_FETCH) {
    const returnCount = await fetchPage();
    if (returnCount === 0) {
      returnedZeroUsers = true;
    }
  }

  // if we returned zero users, it means we couldn't find enough recommendations from friends. So, try to get random recommendations
  if (returnedZeroUsers && authUserId) {
    await fetchPage(true);
  }

  return { users: finalUsers, nextToken: localNextToken };
};

export default getRecommendedUsers;
