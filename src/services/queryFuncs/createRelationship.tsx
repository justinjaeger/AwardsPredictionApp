import ApiServices from '../graphql';

const createRelationship = async (
  followedUserId: string,
  followingUserId: string,
): Promise<'success' | 'error'> => {
  const { data } = await ApiServices.followUser(followedUserId, followingUserId);
  const relationship = data?.createRelationship;
  return relationship ? 'success' : 'error';
};

export default createRelationship;
