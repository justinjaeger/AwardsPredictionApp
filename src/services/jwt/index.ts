import { handleError, iApiResponse } from '../utils';
import { UserRole } from '../../API';
import ApiServices from '../graphql';
import CryptoService from '../crypto';

/**
 * FOR ACCESS TOKENS:
 */

export type iJwtPayload = {
  userId: string;
  email: string;
  role: UserRole;
  isRefreshToken?: boolean;
};

export type iVerificationPayload = {
  email: string;
};

const ACCESS_TOKEN_EXP_IN_MINUTES = 30;
const VERIFICATION_TOKEN_EXP_IN_MINUTES = 10;

const createAccessToken = (payload: iJwtPayload): string => {
  const exp = new Date().getTime() + 1000 * 60 * ACCESS_TOKEN_EXP_IN_MINUTES;
  return CryptoService.encode(payload, exp);
};

const createRefreshToken = (payload: iJwtPayload): string => {
  return CryptoService.encode({ ...payload, isRefreshToken: true });
};

const decode = <T>(token: string) => {
  return CryptoService.decode<T>(token);
};

// On success: returns a non-expired ACCESS token and payload
// On fail: return undefined
const verifyOrRefresh = async (
  accessToken: string,
  refreshToken: string,
): Promise<
  iApiResponse<{ verifiedAccessToken: string | undefined; payload: iJwtPayload }>
> => {
  try {
    const decoded = decode<iJwtPayload>(accessToken);
    if (decoded) {
      return {
        status: 'success',
        data: {
          verifiedAccessToken: accessToken,
          payload: decoded,
        },
      };
    }
    // if not decoded, assume it's expired
    console.error('token expired; attempting to refresh');
    const { data } = await ApiServices.getToken(refreshToken);
    const dbRefreshToken = data?.tokenByToken?.items?.[0]?.token;
    if (!dbRefreshToken) {
      return handleError('Error getting refresh token after token expired');
    }
    // decode refresh token to get the payload
    const decodedRefresh = decode<iJwtPayload>(dbRefreshToken);
    if (!decodedRefresh) {
      return handleError('Error decoding dbRefreshToken');
    }
    // create a new access token (note we're removing the "isRefreshToken" property to do so)
    const accessTokenPayload = {
      userId: decodedRefresh.userId,
      email: decodedRefresh.email,
      role: decodedRefresh.role,
    };
    // create/return new access token
    const verifiedAccessToken = createAccessToken(accessTokenPayload);
    return {
      status: 'success',
      data: { verifiedAccessToken, payload: accessTokenPayload },
    };
  } catch (err) {
    return { status: 'error' };
  }
};

/**
 * FOR CODES:
 */

// creates a jwt with user's email in the payload
const createVerificationCode = (email: string): string => {
  const exp = new Date().getTime() + 1000 * 60 * VERIFICATION_TOKEN_EXP_IN_MINUTES;
  return CryptoService.encode<iVerificationPayload>({ email }, exp);
};

// must be valid jwt (and not expired) & jwt must have email matching the email param
const verifyCode = (token: string, email: string): string | undefined => {
  const payload = decode<iVerificationPayload>(token);
  const payloadEmail = payload?.email;
  if (!payloadEmail || payloadEmail !== email) {
    return undefined;
  } else {
    return payloadEmail;
  }
};

const JwtService = {
  createAccessToken,
  createRefreshToken,
  verifyOrRefresh,
  createVerificationCode,
  verifyCode,
};

export default JwtService;
