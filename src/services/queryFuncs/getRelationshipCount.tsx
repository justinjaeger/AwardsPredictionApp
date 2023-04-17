import ApiServices from '../graphql';

const getRelationshipCount = async (
  userId: string | undefined,
): Promise<{ followerCount: number; followingCount: number }> => {
  if (userId === undefined) return { followerCount: 0, followingCount: 0 };

  const followerResult = await ApiServices.getFollowerCount(userId);
  const followingResult = await ApiServices.getFollowingCount(userId);

  const followerCount = followerResult.data?.searchRelationships?.total || 0;
  const followingCount = followingResult.data?.searchRelationships?.total || 0;

  return { followerCount, followingCount };
};

export default getRelationshipCount;
