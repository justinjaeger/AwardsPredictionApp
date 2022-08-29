/* eslint-disable camelcase */
import { TMDB_API_KEY } from '../../config';
import axios from 'axios';
import { handleError, iApiResponse } from '../utils';
import { iTmdbResponse } from './types';
import { TMDB_URL } from '.';

type iTmdbgetTmdbMovieResponse = {
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  imdb_id: string;
  original_language: string; // like 'en'
  overview: string; // plot description
  poster_path: string | null;
  production_companies: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string; // 'US'
    name: string; // 'United States of America';
  }[];
  release_date: string; // '1999-10-12';
  revenue: number; // 100853753;
  runtime: number; // 139;
  spoken_languages: {
    iso_3166_1: string; // 'US'
    name: string; // 'United States of America';
  }[];
  title: string; // 'Fight Club';};
};

export type iGetTmdbMovieData = {
  title: string;
  plot: string;
  imdbId: string;
  year: number | null;
  productionCompanies: string[];
  productionCountries: string[];
  backdropPath: string | null;
  posterPath: string | null;
};

export const getTmdbMovie = async (
  movieId: string,
): Promise<iApiResponse<iGetTmdbMovieData>> => {
  const url = `${TMDB_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`;
  try {
    const result = (await axios(url)) as iTmdbResponse<iTmdbgetTmdbMovieResponse>;
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

type iCrew = {
  id: number;
  name: string;
  popularity: string;
  department: string;
  job: string;
};

type iCast = {
  name: string;
  popularity: number;
  cast_id: number;
  character: string;
  credit_id: string;
};

type iTmdbGetTmdbMovieCreditsResponse = {
  id: number;
  cast: iCast[];
  crew: iCrew[];
};

export type iGetTmdbMovieCreditsData = {
  directors: iCrew[];
  cast: iCast[];
};

export const getTmdbMovieCredits = async (
  movieId: string,
): Promise<iApiResponse<iGetTmdbMovieCreditsData>> => {
  const url = `${TMDB_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`;
  try {
    const result = (await axios(url)) as iTmdbResponse<iTmdbGetTmdbMovieCreditsResponse>;
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
