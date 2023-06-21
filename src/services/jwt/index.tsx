import { handleError, iApiResponse } from '../utils';
import jwt from 'jsonwebtoken';
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
    const newToken = jwt.sign({ data: payload }, JWT_SECRET, {
      expiresIn: '30m',
    });
    return { status: 'success', data: newToken };
  } catch (err) {
    return handleError('Error creating JWT', err);
  }
};

const createRefreshToken = async (
  payload: iJwtPayload,
): Promise<iApiResponse<string>> => {
  try {
    const newToken = jwt.sign({ data: { ...payload, isRefreshToken: true } }, JWT_SECRET);
    return { status: 'success', data: newToken };
  } catch (err) {
    return handleError('Error creating JWT', err);
  }
};

const decode = async (token: string): Promise<iApiResponse<iJwtPayload | undefined>> => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as iJwtPayload | undefined;
    return { status: 'success', data: payload };
  } catch (err: any) {
    return handleError('Error creating JWT', err);
  }
};

// Returns a non-expired ACCESS token, or nothing if fails
const verifyOrRefresh = async (
  accessToken: string,
  refreshToken: string,
): Promise<iApiResponse<string | undefined>> => {
  try {
    jwt.verify(accessToken, JWT_SECRET);
    return { status: 'success', data: accessToken };
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
      // create/return new access token
      // Important: notice we don't pass the entire payload. That's because the refresh token has a special isRefreshToken property on the payload
      const { data: newAccessToken } = await createAccessToken({
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      });
      return { status: 'success', data: newAccessToken };
    }
    return handleError('Error verifying or refreshing jwt', err);
  }
};

const JwtService = {
  createAccessToken,
  createRefreshToken,
  decode,
  verifyOrRefresh,
};

export default JwtService;
