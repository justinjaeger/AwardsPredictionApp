import { Movie } from '../../../types/api';
import api from '../api';

// Gets movie data (info updated on timer from TMDb)
export const getMovies = async (movieIds: string[]) => {
  return await api.post<Record<string, Movie>, string[]>('movies', movieIds);
};
