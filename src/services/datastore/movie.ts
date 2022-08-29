import { handleError, iApiResponse } from '../utils';
import { DataStore } from 'aws-amplify';
import { Movie } from '../../models';

/**
 * enforce tmdb being unique
 * check to see if movie is already stored (identified by tmdbId)
 */
export const getOrCreateMovie = async (tmdbId: string): Promise<iApiResponse<Movie>> => {
  try {
    const maybeMovies = await DataStore.query(Movie, (m) => m.tmdbId('eq', tmdbId));
    let movie = maybeMovies.length > 0 ? maybeMovies[0] : undefined;
    if (!movie) {
      movie = await DataStore.save(new Movie({ tmdbId }));
    }
    return { status: 'success', data: movie };
  } catch (err) {
    return handleError('error fetching movie by tmdbId', err);
  }
};
