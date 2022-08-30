import { TMDB_API_KEY } from '../../config';
import axios from 'axios';
import { handleError, iApiResponse } from '../utils';
import {
  iTmdbCast,
  iTmdbCrew,
  iTmdbMovieCreditsResponse,
  iTmdbMovieResponse,
  iTmdbResponse,
} from './types';
import { TMDB_URL } from '.';
import { iTmdbCacheItem } from '../cache/tmdb';

export const getTmdbMovie = async (
  movieId: string,
): Promise<iApiResponse<iTmdbCacheItem>> => {
  const url = `${TMDB_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`;
  try {
    const result = (await axios(url)) as iTmdbResponse<iTmdbMovieResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }
    const year = result.data.release_date
      ? parseInt(result.data.release_date?.slice(0, 4), 10)
      : null;

    return {
      status: 'success',
      data: {
        title: result.data.title,
        plot: result.data.overview,
        imdbId: result.data.imdb_id,
        year,
        productionCompanies: result.data.production_companies.map((pc) => pc.name),
        productionCountries: result.data.production_countries.map((pc) => pc.name),
        backdropPath: result.data.backdrop_path,
        posterPath: result.data.poster_path,
      },
    };
  } catch (err: any) {
    return handleError('error searching tmdb', err);
  }
};

export type iGetTmdbMovieCreditsData = {
  directors: iTmdbCrew[];
  cast: iTmdbCast[];
};

export const getTmdbMovieCredits = async (
  movieId: string,
): Promise<iApiResponse<iGetTmdbMovieCreditsData>> => {
  const url = `${TMDB_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`;
  try {
    const result = (await axios(url)) as iTmdbResponse<iTmdbMovieCreditsResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }
    const directors = result.data.crew.filter((c) => c.job.toLowerCase() === 'director');

    return {
      status: 'success',
      data: {
        directors,
        cast: result.data.cast,
      },
    };
  } catch (err: any) {
    return handleError('error searching tmdb', err);
  }
};
