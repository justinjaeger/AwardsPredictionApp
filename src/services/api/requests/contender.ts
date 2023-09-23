import { CategoryName } from '../../../types/api';
import api from '../api';

/**
 * Creates movie/person/song if not exists, then creates contender
 */
type iCreateContenderPayload = {
  eventId: string;
  movieTmdbId: number;
  categoryName: CategoryName;
  personTmdbId?: number;
  songTitle?: string;
};
export const createContender = async (payload: iCreateContenderPayload) => {
  return await api.post<string, iCreateContenderPayload>('contenders', payload);
};
