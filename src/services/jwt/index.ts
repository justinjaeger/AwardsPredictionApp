import { handleError, iApiResponse } from '../utils';
import { sign as jwtSign, decode as jwtDecode } from 'react-native-pure-jwt';
import { JWT_SECRET } from '../../config';
import { UserRole } from '../../API';
import ApiServices from '../graphql';

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
        isRefreshToken: true,
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
    return handleError('Error decoding jwt', err);
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
      return handleError('Error decoding jwt, no payload');
    }
    return { status: 'success', data: { verifiedAccessToken: accessToken, payload } };
  } catch (err: any) {
    /**
     * Because the Token table is PRIVATE, even for read operations, we need the refresh token to read itself from the database
     * If it reads itself, it's safe to replenish the access token
     */
    if (err.name === 'TokenExpiredError') {
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
      // Important: notice we don't pass the entire payload. That's because the refresh token has a special isRefreshToken property on the payload
      const { data: verifiedAccessToken } = await createAccessToken(accessTokenPayload);
      return {
        status: 'success',
        data: { verifiedAccessToken, payload: accessTokenPayload },
      };
    }
    return handleError('Error verifying or refreshing jwt', err);
  }
};

const JwtService = {
  createAccessToken,
  createRefreshToken,
  verifyOrRefresh,
};

export default JwtService;
