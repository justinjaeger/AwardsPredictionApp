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

export type iTmdbShowFromSearch = {
  poster_path: string | null;
  popularity: 1.4;
  id: number;
  overview: string;
  backdrop_path: string | null;
  vote_average: number; // 6.9
  media_type: string;
  first_air_date: string;
  origin_country: string[];
  vote_count: number;
  name: string;
  original_name: string;
};

export type iTmdbSearchMoviesResponse = {
  page: number;
  results: iTmdbMovieFromSearch[];
  total_pages: number;
  total_results: number;
};

export type iTmdbPersonFromSearch = {
  profile_path: string | null;
  adult: boolean;
  id: number;
  known_for: iTmdbMovieFromSearch | iTmdbShowFromSearch; // either a movie (iTmdbMovieFromSearch) or tv show object
  name: string;
  popularity: number;
};

export type iTmdbSearchPeopleResponse = {
  page: number;
  results: iTmdbPersonFromSearch[];
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

export type iTmdbPersonResponse = {
  birthday: string | null;
  known_for_department: string;
  deathday: null | string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: null | string;
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

export type iTmdbPersonMovieCredits = {
  id: number;
  cast: {
    character: string;
    credit_id: string;
    release_date: string;
    vote_count: number;
    video: boolean;
    adult: boolean;
    vote_average: number;
    title: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: SVGAnimatedNumberList;
    id: number;
    backdrop_path: string | null;
    overview: string;
    poster_path: string | null;
  }[];
  crew: {
    id: number;
    department: string;
    original_language: string;
    original_title: string;
    job: string;
    overview: string;
    vote_count: number;
    video: boolean;
    poster_path: string | null;
    backdrop_path: string | null;
    title: string;
    popularity: number;
    genre_ids: number[];
    vote_average: number;
    release_date: string;
    credit_id: string;
  }[];
};
