import { User, WithId } from '../../types/api';
import api from './api';

const test = async () => {
  return await api.get<{ data: string }>('/');
};

const getUser = async ({
  userId,
  email,
  oauthId,
  excludeNestedFields,
}: {
  userId?: string;
  email?: string;
  oauthId?: string;
  excludeNestedFields?: boolean;
}) => {
  return await api.get<WithId<User>>(`users/${userId}`);
};

const ApiService = {
  test,
  getUser,
};

export default ApiService;
