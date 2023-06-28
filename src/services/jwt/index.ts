import { handleError, iApiResponse } from '../utils';
import { sign as jwtSign, decode as jwtDecode } from 'react-native-pure-jwt';
import { JWT_SECRET } from '../../config';
import { UserRole } from '../../API';
import ApiServices from '../graphql';

/**
 * FOR ACCESS TOKENS:
 */

export type iJwtPayload = {
  userId: string;
  email: string;
  role: UserRole;
  isRefreshToken?: boolean;
};

const createAccessToken = async (payload: iJwtPayload): Promise<iApiResponse<string>> => {
  try {
    const newToken = await jwtSign(
      {
        ...payload,
        exp: new Date().getTime() + 1000 * 60 * 30, // in ms, so 30 minutes
        // exp: new Date().getTime() + 10000, // 10 seconds for testing only
      },
      JWT_SECRET,
      {
        alg: 'HS256',
      },
    );
    return { status: 'success', data: newToken };
  } catch (err) {
    return handleError('Error creating access token', err);
  }
};

const createRefreshToken = async (
  payload: iJwtPayload,
): Promise<iApiResponse<string>> => {
  try {
    const newToken = await jwtSign(
      {
        ...payload,
        isRefreshToken: true, // important to distinguish between access and refresh tokens in lambda
        exp: new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 100, // in ms, 100 years
      },
      JWT_SECRET,
      {
        alg: 'HS256',
      },
    );
    return { status: 'success', data: newToken };
  } catch (err) {
    return handleError('Error creating jwt refresh token', err);
  }
};

const decode = async (token: string): Promise<iApiResponse<iJwtPayload | undefined>> => {
  try {
    const response = await jwtDecode(token, JWT_SECRET);
    const payload = response?.payload as iJwtPayload | undefined;
    return { status: 'success', data: payload };
  } catch (err: any) {
    return handleError('Error decoding jwt', err, true); // hide bc it's not necessarily an error if jwt is expired
  }
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
    const { data: payload } = await decode(accessToken);
    if (!payload) {
      return handleError('Error verifying or refreshing jwt, no payload');
    }
    return { status: 'success', data: { verifiedAccessToken: accessToken, payload } };
  } catch (err: any) {
    /**
     * Because the Token table is PRIVATE, even for read operations, we need the refresh token to read itself from the database
     * If it reads itself, it's safe to replenish the access token
     */
    // if (err.name === 'TokenExpiredError') {
    // Since the error handling sucks with this library, we'll just assume it's a TokenExpiredError
    console.error('TokenExpiredError'); // TODO: remove
    const { data } = await ApiServices.getToken(refreshToken);
    const dbRefreshToken = data?.tokenByToken?.items?.[0]?.token;
    if (!dbRefreshToken) {
      return handleError('Error getting refresh token after token expired', err);
    }
    // decode refresh token to get the payload
    const { data: payload } = await decode(dbRefreshToken);
    if (!payload) {
      return handleError('Error decoding dbRefreshToken', err);
    }
    // create a new access token
    const accessTokenPayload = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
    // create/return new access token
    // Important: notice we don't pass the entire payload. That's because the refresh token has a special isRefreshToken property that we don't want to pass
    const { data: verifiedAccessToken } = await createAccessToken(accessTokenPayload);
    return {
      status: 'success',
      data: { verifiedAccessToken, payload: accessTokenPayload },
    };
    // }
    // return handleError('Error verifying or refreshing jwt', err);
  }
};

/**
 * FOR CODES:
 */

// creates a jwt with user's email in the payload
const createVerificationCode = async (email: string): Promise<iApiResponse<string>> => {
  try {
    const newToken = await jwtSign(
      {
        email, // payload
        exp: new Date().getTime() + 1000 * 60 * 10, // in ms, so 10 minutes
      },
      JWT_SECRET,
      {
        alg: 'HS256',
      },
    );
    return { status: 'success', data: newToken };
  } catch (err) {
    return handleError('Error creating access token', err);
  }
};

// must be valid jwt (and not expired) & jwt must have email matching the email param
const verifyCode = async (
  token: string,
  email: string,
): Promise<iApiResponse<string | undefined>> => {
  try {
    const response = await jwtDecode(token, JWT_SECRET);
    const payload = response?.payload as any;
    const payloadEmail = payload?.email as string | undefined;
    if (!payloadEmail || payloadEmail !== email) {
      return handleError('Invalid payload');
    }
    return { status: 'success', data: email };
  } catch (err: any) {
    console.error('err', err); // it just says "Error: Decoding failed" - which sucks because it doesn't tell us why
    return handleError('Link has expired', err);
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
