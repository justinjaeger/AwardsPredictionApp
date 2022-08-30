import { TMDB_API_KEY } from '../../config';
import axios from 'axios';
import { handleError, iApiResponse } from '../utils';
import { iTmdbMovieCreditsResponse, iTmdbMovieResponse, iTmdbResponse } from './types';
import { TMDB_URL } from '.';
import TmdbMovieCache from '../cache/tmdbMovie';
import { iCachedTmdbCredits, iCachedTmdbMovie } from '../cache/types';
import TmdbCreditsCache from '../cache/tmdbCredits';

export const getTmdbMovie = async (
  tmdbId: string,
): Promise<iApiResponse<iCachedTmdbMovie>> => {
  try {
    // attempt to get from cache first
    const cacheResponse = await TmdbMovieCache.get(tmdbId);
    if (cacheResponse) {
      console.log('serving movie from cache');
      return { status: 'success', data: cacheResponse };
    }

    // else, fetch from tmdb
    const url = `${TMDB_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}`;
    const result = (await axios(url)) as iTmdbResponse<iTmdbMovieResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }
    const year = result.data.release_date
      ? parseInt(result.data.release_date?.slice(0, 4), 10)
      : null;

    const data: iCachedTmdbMovie = {
      title: result.data.title,
      plot: result.data.overview,
      imdbId: result.data.imdb_id,
      year,
      productionCompanies: result.data.production_companies.map((pc) => pc.name),
      productionCountries: result.data.production_countries.map((pc) => pc.name),
      backdropPath: result.data.backdrop_path,
      posterPath: result.data.poster_path,
    };

    // before returning, set in cache
    await TmdbMovieCache.set(tmdbId, data);

    return {
      status: 'success',
      data,
    };
  } catch (err: any) {
    return handleError('error searching tmdb', err);
  }
};

export const getTmdbMovieCredits = async (
  tmdbId: string,
): Promise<iApiResponse<iCachedTmdbCredits>> => {
  const url = `${TMDB_URL}/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}`;
  try {
    // attempt to get from cache first
    const cacheResponse = await TmdbCreditsCache.get(tmdbId);
    if (cacheResponse) {
      console.log('serving credits from cache');
      return { status: 'success', data: cacheResponse };
    }
    // else fetch from tmdb
    const result = (await axios(url)) as iTmdbResponse<iTmdbMovieCreditsResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }
    const directors = result.data.crew.filter((c) => c.job.toLowerCase() === 'director');

    const data = {
      directors,
      cast: result.data.cast,
    };

    // before returning, set in cache
    await TmdbCreditsCache.set(tmdbId, data);

    return {
      status: 'success',
      data,
    };
  } catch (err: any) {
    return handleError('error searching tmdb', err);
  }
};
