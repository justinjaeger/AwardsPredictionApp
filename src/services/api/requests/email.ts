import api from '../api';

export const sendVerificationEmail = async (email: string) => {
  return await api.get<void>(`email/send?email=${email}`);
};

// returns the email parsed from the link
// What if we pass the token as a token instead of in params?
export const verifyEmailMagicLink = async (link: string) => {
  return await api.get<string>(`email/verify?link=${link}`);
};
