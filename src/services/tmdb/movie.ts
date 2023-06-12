import { TMDB_API_KEY } from '../../config';
import axios from 'axios';
import { handleError, iApiResponse } from '../utils';
import { iTmdbMovieCreditsResponse, iTmdbMovieResponse, iTmdbResponse } from './types';
import { TMDB_URL } from '.';
import TmdbCache from '../cache/tmdb';
import { iCachedTmdbMovie } from '../cache/types';
import { ALL_CATEGORIES } from '../../constants/categories';
import { CategoryName } from '../../API';

const getCachedMovieData = (
  result: iTmdbResponse<iTmdbMovieResponse>,
  creditsResult: iTmdbResponse<iTmdbMovieCreditsResponse>,
) => {
  const year = result.data.release_date
    ? parseInt(result.data.release_date?.slice(0, 4), 10)
    : null;

  const productionCompanies = result.data.production_companies.map((pc) => pc.name);

  const directors = creditsResult.data.crew
    .filter((c) => c.job.toLowerCase() === 'director')
    .map((crew) => crew.name);
  const screenplay = creditsResult.data.crew
    .filter(
      (c) => c.job.toLowerCase() === 'screenplay' || c.job.toLowerCase() === 'writer',
    )
    .map((crew) => crew.name);
  const cinematographer = creditsResult.data.crew
    .filter((c) => c.job.toLowerCase() === 'director of photography')
    .map((crew) => crew.name);
  const productionDesign = creditsResult.data.crew
    .filter(
      (c) =>
        c.job.toLowerCase() === 'production design' ||
        c.job.toLowerCase() === 'set decoration',
    )
    .map((crew) => crew.name);
  const editing = creditsResult.data.crew
    .filter((c) => c.job.toLowerCase() === 'editor')
    .map((crew) => crew.name);
  const costume = creditsResult.data.crew
    .filter((c) => c.job.toLowerCase() === 'costume designer')
    .map((crew) => crew.name);
  const score = creditsResult.data.crew
    .filter((c) => c.job.toLowerCase() === 'original music composer')
    .map((crew) => crew.name);
  const vfx = creditsResult.data.crew
    .filter((c) => c.job.toLowerCase() === 'visual effects supervisor')
    .map((crew) => crew.name);
  const cast = creditsResult.data.cast
    ?.map((c) => c.name)
    .filter((c, i) => i < 10) // display 10 cast members max
    .join(', ');

  const data: iCachedTmdbMovie = {
    title: result.data.title,
    plot: result.data.overview,
    imdbId: result.data.imdb_id,
    year,
    productionCompanies,
    productionCountries: result.data.production_countries.map((pc) => pc.name),
    backdropPath: result.data.backdrop_path,
    posterPath: result.data.poster_path,
    cast,
    categoryInfo: {
      ...ALL_CATEGORIES,
      [CategoryName.DIRECTOR]: directors,
      [CategoryName.SCREENPLAY]: screenplay, // fill in same as others
      [CategoryName.ORIGINAL_SCREENPLAY]: screenplay, // fill in same as others
      [CategoryName.ADAPTED_SCREENPLAY]: screenplay, // fill in same as others
      [CategoryName.CINEMATOGRAPHY]: cinematographer, // fill in same as others
      [CategoryName.PRODUCTION_DESIGN]: productionDesign,
      [CategoryName.COSTUMES]: costume,
      [CategoryName.SCORE]: score,
      [CategoryName.EDITING]: editing,
      [CategoryName.VISUAL_EFFECTS]: vfx,
    },
  };
  return data;
};

type iTmdbMoviesStorage = { [tmdbId: number]: iCachedTmdbMovie };

// Note: Not used
export const getTmdbMovies = async (
  tmdbIds: number[],
): Promise<iApiResponse<iTmdbMoviesStorage>> => {
  try {
    if (tmdbIds.length === 0) return { status: 'success' };
    // get all from cache, (undefined if not set)
    const cacheResponse = await TmdbCache.getMany<iCachedTmdbMovie>(tmdbIds);
    if (!cacheResponse) return { status: 'error' };

    // sort what's in cache and what's not
    const cacheData: iTmdbMoviesStorage = {};
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

    // compile requests for tmdb (note: can't do them concurrencly or TMDB will get upset)
    const results: iTmdbResponse<iTmdbMovieResponse>[] = [];
    const creditsResults: iTmdbResponse<iTmdbMovieCreditsResponse>[] = [];
    for (const tmdbId of tmdbIdsNotInCache) {
      const url = `${TMDB_URL}/person/${tmdbId}?api_key=${TMDB_API_KEY}`;
      const res = (await axios(url)) as iTmdbResponse<iTmdbMovieResponse>;
      results.push(res);
      const creditsUrl = `${TMDB_URL}/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}`;
      const creditsRes = (await axios(
        creditsUrl,
      )) as iTmdbResponse<iTmdbMovieCreditsResponse>;
      creditsResults.push(creditsRes);
    }

    // format results so we can set it in cache
    const newData: iTmdbMoviesStorage = {};
    const newDataForCache: { tmdbId: number; value: iCachedTmdbMovie }[] = [];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result?.status === 'error') {
        throw new Error(result?.message);
      }
      const creditsResult = creditsResults[i];
      if (creditsResult?.status === 'error') {
        throw new Error(creditsResult?.message);
      }
      const data = getCachedMovieData(result, creditsResult);
      newData[result.data.id] = data;
      newDataForCache.push({
        tmdbId: result.data.id,
        value: data,
      });
    }

    // bulk set items in cache (but don't await)
    TmdbCache.setMany<iCachedTmdbMovie>(newDataForCache);

    // merge new data with cache data
    const mergedData = { ...cacheData, ...newData };
    return { status: 'success', data: mergedData };
  } catch (err) {
    return handleError('error in getTmdbMovies', err, true);
  }
};

export const getTmdbMovie = async (
  tmdbId: number,
): Promise<iApiResponse<iCachedTmdbMovie>> => {
  try {
    // attempt to get from cache first
    const cacheResponse = await TmdbCache.get<iCachedTmdbMovie>(tmdbId);
    if (cacheResponse) {
      return { status: 'success', data: cacheResponse };
    }

    // else, fetch from tmdb
    const url = `${TMDB_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}`;
    const result = (await axios(url)) as iTmdbResponse<iTmdbMovieResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }

    const creditsUrl = `${TMDB_URL}/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}`;
    const creditsResult = (await axios(
      creditsUrl,
    )) as iTmdbResponse<iTmdbMovieCreditsResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }

    const data = getCachedMovieData(result, creditsResult);

    // before returning, set in cache
    TmdbCache.set(tmdbId, data);

    return {
      status: 'success',
      data,
    };
  } catch (err) {
    return handleError('error in getTmdbMovie', err);
  }
};
