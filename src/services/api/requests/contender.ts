import { CategoryName, Contender, WithId } from '../../../models';
import api from '../api';

/**
 * Creates movie/person/song if not exists, then creates contender
 */
export type iCreateContenderPayload = {
  eventId: string;
  eventYear: number;
  movieTmdbId: number;
  categoryName: CategoryName;
  personTmdbId?: number;
  songTitle?: string;
  songArtist?: string;
};
export const getOrCreateContender = async (payload: iCreateContenderPayload) => {
  return await api.post<WithId<Contender> | null, iCreateContenderPayload>(
    'contenders',
    payload,
  );
};
