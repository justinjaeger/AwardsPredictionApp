/* eslint-disable camelcase */
import { TMDB_API_KEY } from '../../config';
import axios from 'axios';
import { handleError, iApiResponse } from '../utils';
import { iTmdbResponse } from './types';
import { TMDB_URL } from '.';

type iTmdbSearchResponse = {
  page: number;
  results: any[];
  total_results: number;
  total_pages: number;
};

export type iSearchMoviesData = {
  title: string;
  plot: string;
  tmdbId: string;
}[];

export const searchMovies = async (
  searchText: string,
  minReleaseYear: number,
): Promise<iApiResponse<iSearchMoviesData>> => {
  const url = `${TMDB_URL}/search/movie?query=${searchText.toLowerCase()}&api_key=${TMDB_API_KEY}`;
  try {
    const result = (await axios(url)) as iTmdbResponse<iTmdbSearchResponse>;
    if (result?.status === 'error') {
      throw new Error(result?.message);
    }
    const filteredData = result.data.results
      .filter((movie) => {
        const releaseYear = movie.release_date
          ? parseInt(movie.release_date.slice(0, 4), 10)
          : undefined;
        if (releaseYear) {
          return releaseYear >= minReleaseYear;
        } else return 0;
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
        plot: d.overview,
        tmdbId: d.id,
      })),
    };
  } catch (err: any) {
    return handleError('error searching tmdb', err);
  }
};
