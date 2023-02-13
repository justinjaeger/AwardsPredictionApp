import ApiServices from '../graphql';

const getNumberRelationships = async (userId: string) => {
  const requests = [];

  requests.push(await ApiServices.getFollowerCount(userId));
  requests.push(await ApiServices.getFollowingCount(userId));

  const result = await Promise.all(requests);
  const followerCount = result[0].data?.searchRelationships?.total || 0;
  const followingCount = result[1].data?.searchRelationships?.total || 0;

  return { followerCount, followingCount };
};

export default getNumberRelationships;
