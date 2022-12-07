import { iUser } from '../../types';
import ApiServices from '../graphql';

const getUser = async (id: string | undefined): Promise<iUser | undefined> => {
  if (id === undefined) return undefined;
  const { data } = await ApiServices.getUser(id);
  const user = data?.getUser;
  if (!user) return undefined;
  // format events data
  return {
    id: user.id,
    email: user.email,
    username: user.username || undefined,
    name: user.name || undefined,
    bio: user.bio || undefined,
    image: user.image || undefined,
    role: user.role,
  };
};

export default getUser;
