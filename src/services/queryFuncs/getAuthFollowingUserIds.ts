import ApiServices from '../graphql';

const getAuthFollowingUserIds = async (authUserId: string | undefined) => {
  let authFollowingUserIds: string[] = [];
  if (authUserId) {
    const { data } = await ApiServices.getWhoUserIsFollowing(authUserId);
    const followedUsers = (data?.relationshipByFollowingUserId?.items || []).map(
      (r) => r?.followedUser,
    );
    authFollowingUserIds = followedUsers.map((u) => u?.id || '');
  }
  return authFollowingUserIds;
};

export default getAuthFollowingUserIds;
