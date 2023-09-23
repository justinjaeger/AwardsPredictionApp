/* eslint-disable camelcase */
import axios from 'axios';
import { handleError, iApiResponse } from '../utils';
import {
  iTmdbResponse,
  iTmdbSearchMovieIdResponse,
  iTmdbSearchMoviesResponse,
  iTmdbSearchPeopleResponse,
} from './types';
import { TMDB_URL } from '.';

export type iSearchData = {
  tmdbId: number;
  title: string;
  image: string | null;
  description?: string;
}[];

const TMDB_API_KEY = 'hi'; // TODO: all tmdb requests will be made on backend

export const searchMovies = async (
  searchText: string,
  minReleaseYear: number,
): Promise<iApiResponse<iSearchData>> => {
  const url = `${TMDB_URL}/search/movie?query=${searchText.toLowerCase()}&api_key=${TMDB_API_KEY}`;
  try {
    const result = (await axios(url)) as iTmdbResponse<iTmdbSearchMoviesResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }
    result.data.results.splice(20); // shorten
    const filteredData = result.data.results
      .filter((movie) => {
        const releaseYear = movie.release_date
          ? parseInt(movie.release_date.slice(0, 4), 10)
          : undefined;
        if (!releaseYear) {
          // always show movies without release date
          return true;
        } else {
          return releaseYear >= minReleaseYear - 1;
        }
      })
      .sort((m1, m2) => {
        if (m1.popularity > m2.popularity) {
          return -1;
        } else {
          return 1;
        }
      });
    return {
      status: 'success',
      data: filteredData.map((d) => ({
        title: `${d.title} (${d.release_date.slice(0, 4)})`,
        description: d.overview,
        tmdbId: d.id,
        image: d.poster_path,
      })),
    };
  } catch (err) {
    return handleError('error in searchMovies', err);
  }
};

export const searchMovieById = async (
  searchText: string,
): Promise<iApiResponse<iSearchData>> => {
  const url = `${TMDB_URL}/movie/${searchText}?api_key=${TMDB_API_KEY}`;
  try {
    const result = (await axios(url)) as iTmdbResponse<iTmdbSearchMovieIdResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }
    const data = result.data;
    return {
      status: 'success',
      // eslint-disable-next-line sonarjs/no-identical-functions
      data: [
        {
          title: `${data.title} (${data.release_date.slice(0, 4)})`,
          description: data.overview,
          tmdbId: data.id,
          image: data.poster_path,
        },
      ],
    };
  } catch (err) {
    return handleError('error in searchMovies', err);
  }
};

export const searchPeople = async (
  searchText: string,
): Promise<iApiResponse<iSearchData>> => {
  const url = `${TMDB_URL}/search/person?query=${searchText.toLowerCase()}&api_key=${TMDB_API_KEY}`;
  try {
    const result = (await axios(url)) as iTmdbResponse<iTmdbSearchPeopleResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }
    result.data.results.splice(6); // shorten
    const sortedPeople = result.data.results.sort((p1, p2) => {
      if (p1.popularity > p2.popularity) {
        return -1;
      } else {
        return 1;
      }
    });
    return {
      status: 'success',
      data: sortedPeople.map((p) => ({
        title: p.name,
        tmdbId: p.id,
        image: p.profile_path,
      })),
    };
  } catch (err) {
    return handleError('error in searchPeople', err);
  }
};
