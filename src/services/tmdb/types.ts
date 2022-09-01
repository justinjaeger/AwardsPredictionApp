/* eslint-disable camelcase */
export interface iTmdbResponse<T> {
  status: string | number;
  message?: string;
  data: T;
}

export type iTmdbMovieFromSearch = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: 1.4;
  poster_path: string; // .jpg
  release_date: string; // '2014-09-04'
  title: string;
  video: boolean;
  vote_average: number; // 6.9
  vote_count: number;
};

export type iTmdbSearchResponse = {
  page: number;
  results: iTmdbMovieFromSearch[];
  total_pages: number;
  total_results: number;
};

type iTmdbMovieStatus =
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled';

export type iTmdbMovieResponse = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | any; // null or object
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string;
  original_language: string; // like 'en'
  original_title: string;
  overview: string; // plot description
  popularity: number;
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
  status: iTmdbMovieStatus;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type iTmdbCrew = {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};

export type iTmdbCast = {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type iTmdbMovieCreditsResponse = {
  id: number;
  cast: iTmdbCast[];
  crew: iTmdbCrew[];
};
