import { TMDB_API_KEY } from '../../config';
import axios from 'axios';
import { handleError, iApiResponse } from '../utils';
import { iTmdbPersonMovieCredits, iTmdbPersonResponse, iTmdbResponse } from './types';
import { TMDB_URL } from '.';
import TmdbPersonCache from '../cache/tmdbPerson';
import { iCachedTmdbPerson } from '../cache/types';
import { iSearchData } from './search';

export const getTmdbPerson = async (
  tmdbId: number,
): Promise<iApiResponse<iCachedTmdbPerson>> => {
  try {
    // attempt to get from cache first
    const cacheResponse = await TmdbPersonCache.get(tmdbId);
    if (cacheResponse) {
      console.log('serving movie from cache');
      return { status: 'success', data: cacheResponse };
    }

    // else, fetch from tmdb
    const url = `${TMDB_URL}/person/${tmdbId}?api_key=${TMDB_API_KEY}`;
    console.error('urllllll', url);
    const result = (await axios(url)) as iTmdbResponse<iTmdbPersonResponse>;
    // console.error('result', result);
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }

    const data: iCachedTmdbPerson = {
      name: result.data.name,
      gender: result.data.gender,
      profilePath: result.data.profile_path,
      imdbId: result.data.imdb_id,
      biography: result.data.biography,
    };

    // before returning, set in cache
    await TmdbPersonCache.set(tmdbId, data);

    return {
      status: 'success',
      data,
    };
  } catch (err: any) {
    return handleError('error searching tmdb', err);
  }
};

export const getTmdbPersonMovieCredits = async (
  tmdbId: number,
  minReleaseYear: number,
): Promise<iApiResponse<iSearchData>> => {
  try {
    const url = `${TMDB_URL}/person/${tmdbId}/movie_credits?api_key=${TMDB_API_KEY}`;
    const result = (await axios(url)) as iTmdbResponse<iTmdbPersonMovieCredits>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }

    const data = result.data.cast
      .filter((c) => {
        const releaseYear = c.release_date
          ? parseInt(c.release_date.slice(0, 4), 10)
          : undefined;
        console.error('releaseYear', releaseYear);
        if (releaseYear) {
          return releaseYear >= minReleaseYear;
        } else {
          return 0;
        }
      })
      .map((c) => ({
        title: c.title,
        description: c.character,
        image: c.poster_path,
        tmdbId: c.id,
      }));
    // do only most recent data

    return {
      status: 'success',
      data,
    };
  } catch (err: any) {
    return handleError('error searching tmdb', err);
  }
};
