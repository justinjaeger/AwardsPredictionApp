/* eslint-disable camelcase */
import { TMDB_API_KEY } from '../../config';
import axios from 'axios';
import { handleError, iApiResponse } from '../utils';
import { iTmdbResponse } from './types';
import { TMDB_URL } from '.';

type iTmdbGetMovieResponse = {
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

export type iGetMovieData = {
  title: string;
  backdropPath: string;
  posterPath: string | null;
};

export const getMovie = async (movieId: string): Promise<iApiResponse<iGetMovieData>> => {
  const url = `${TMDB_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`;
  try {
    const result = (await axios(url)) as iTmdbResponse<iTmdbGetMovieResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }
    return {
      status: 'success',
      data: {
        title: result.data.title,
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

type iTmdbGetMovieCreditsResponse = {
  id: number;
  cast: iCast[];
  crew: iCrew[];
};

export type iGetMovieCreditsData = {
  director: iCrew | undefined;
  cast: { name: string }[];
  crew: iCrew[];
};

export const getMovieCredits = async (
  movieId: string,
): Promise<iApiResponse<iGetMovieCreditsData>> => {
  const url = `${TMDB_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`;
  try {
    const result = (await axios(url)) as iTmdbResponse<iTmdbGetMovieCreditsResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }
    const director = result.data.crew.find((c) => c.job.toLowerCase() === 'director');
    return {
      status: 'success',
      data: {
        director,
        cast: result.data.cast,
        crew: result.data.crew,
      },
    };
  } catch (err: any) {
    return handleError('error searching tmdb', err);
  }
};
