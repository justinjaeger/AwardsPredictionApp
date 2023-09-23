import api from '../api';

export const sendEmail = async ({ email }: { email: string }) => {
  return await api.get<undefined>(`email/send/?email=${email}`);
};

export const verifyEmail = async ({ link }: { link: string }) => {
  return await api.get<undefined>(`email/verify/?link=${link}`);
};
