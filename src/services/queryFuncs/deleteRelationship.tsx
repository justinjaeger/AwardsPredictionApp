import ApiServices from '../graphql';

const deleteRelationship = async (
  followedUserId: string,
  followingUserId: string,
): Promise<'success' | 'error'> => {
  const { data } = await ApiServices.unFollowUser(followedUserId, followingUserId);
  const relationship = data?.deleteRelationship;
  return relationship ? 'success' : 'error';
};

export default deleteRelationship;
