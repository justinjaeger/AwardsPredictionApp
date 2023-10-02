import { CategoryName, Contender, WithId } from '../../../types/api';
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
  songArtist?: string;
};
export const createContender = async (payload: iCreateContenderPayload) => {
  return await api.post<WithId<Contender> | null, iCreateContenderPayload>(
    'contenders',
    payload,
  );
};
