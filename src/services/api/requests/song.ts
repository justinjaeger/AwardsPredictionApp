import { Song } from '../../../types/api';
import api from '../api';

// Gets song data
export const getSongs = async (songIds: string[]) => {
  return await api.post<Record<string, Song>, string[]>('songs', songIds);
};
