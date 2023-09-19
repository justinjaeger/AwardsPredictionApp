import axios from 'axios';
import { handleError, iApiResponse } from '../utils';
import { iTmdbPersonMovieCredits, iTmdbPersonResponse, iTmdbResponse } from './types';
import { TMDB_URL } from '.';
import TmdbCache from '../cache/tmdb';
import { iCachedTmdbPerson } from '../cache/types';
import { iSearchData } from './search';

type iTmdbPeopleStorage = { [tmdbId: number]: iCachedTmdbPerson };

const TMDB_API_KEY = 'hi'; // TODO: all tmdb requests will be made on backend

// Note: Not used
export const getTmdbPeople = async (
  tmdbIds: number[],
): Promise<iApiResponse<iTmdbPeopleStorage>> => {
  try {
    if (tmdbIds.length === 0) return { status: 'success' };
    // get all from cache, (undefined if not set)
    const cacheResponse = await TmdbCache.getMany<iCachedTmdbPerson>(tmdbIds);
    if (!cacheResponse) return { status: 'error' };

    // sort what's in cache and what's not
    const cacheData: iTmdbPeopleStorage = {};
    const tmdbIdsNotInCache: number[] = [];
    for (let i = 0; i < tmdbIds.length; i++) {
      const tmdbId = tmdbIds[i];
      const cacheRes = cacheResponse[i];
      if (cacheRes === undefined) {
        tmdbIdsNotInCache.push(tmdbId);
      } else {
        cacheData[tmdbId] = cacheRes;
      }
    }

    // compile requests for tmdb
    const results: iTmdbResponse<iTmdbPersonResponse>[] = [];
    for (const tmdbId of tmdbIdsNotInCache) {
      const url = `${TMDB_URL}/person/${tmdbId}?api_key=${TMDB_API_KEY}`;
      const res = (await axios(url)) as iTmdbResponse<iTmdbPersonResponse>;
      results.push(res);
    }

    // format results so we can set it in cache
    const newData: iTmdbPeopleStorage = {};
    const newDataForCache: { tmdbId: number; value: iCachedTmdbPerson }[] = [];
    results.forEach((result) => {
      if (result?.status === 'error') {
        throw new Error(result?.message);
      }
      const value = {
        name: result.data.name,
        gender: result.data.gender,
        profilePath: result.data.profile_path,
        imdbId: result.data.imdb_id,
        biography: result.data.biography,
      };
      newData[result.data.id] = value;
      newDataForCache.push({
        tmdbId: result.data.id,
        value,
      });
    });

    // bulk set items in cache (but don't await)
    TmdbCache.setMany<iCachedTmdbPerson>(newDataForCache);

    // merge new data with cache data
    const mergedData = { ...cacheData, ...newData };
    return { status: 'success', data: mergedData };
  } catch (err) {
    return handleError('error in getTmdbPeople', err, true);
  }
};

export const getTmdbPerson = async (
  tmdbId: number,
): Promise<iApiResponse<iCachedTmdbPerson>> => {
  try {
    // attempt to get from cache first
    const cacheResponse = await TmdbCache.get<iCachedTmdbPerson>(tmdbId);
    if (cacheResponse) {
      return { status: 'success', data: cacheResponse };
    }

    // else, fetch from tmdb
    const url = `${TMDB_URL}/person/${tmdbId}?api_key=${TMDB_API_KEY}`;
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
    TmdbCache.set(tmdbId, data);

    return {
      status: 'success',
      data,
    };
  } catch (err) {
    return handleError('error in getTmdbPerson', err);
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
        if (releaseYear) {
          return releaseYear >= minReleaseYear;
        } else {
          return true;
        }
      })
      .map((c) => ({
        title: c.title,
        description: c.character,
        image: c.poster_path,
        tmdbId: c.id,
      }));
    return {
      status: 'success',
      data,
    };
  } catch (err) {
    return handleError('error in getTmdbPersonMovieCredits', err);
  }
};
