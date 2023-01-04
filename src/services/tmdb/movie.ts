import { TMDB_API_KEY } from '../../config';
import axios from 'axios';
import { handleError, iApiResponse } from '../utils';
import { iTmdbMovieCreditsResponse, iTmdbMovieResponse, iTmdbResponse } from './types';
import { TMDB_URL } from '.';
import TmdbMovieCache from '../cache/tmdbMovie';
import { iCachedTmdbMovie } from '../cache/types';
import { ALL_CATEGORIES } from '../../constants/categories';
import { CategoryName } from '../../API';

export const getTmdbMovie = async (
  tmdbId: number,
): Promise<iApiResponse<iCachedTmdbMovie>> => {
  try {
    // attempt to get from cache first
    const cacheResponse = await TmdbMovieCache.get(tmdbId);
    if (cacheResponse) {
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

    const productionCompanies = result.data.production_companies.map((pc) => pc.name);

    const creditsUrl = `${TMDB_URL}/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}`;
    const creditsResult = (await axios(
      creditsUrl,
    )) as iTmdbResponse<iTmdbMovieCreditsResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }
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

    // before returning, set in cache
    await TmdbMovieCache.set(tmdbId, data);

    return {
      status: 'success',
      data,
    };
  } catch (err) {
    return handleError('error in getTmdbMovie', err);
  }
};
