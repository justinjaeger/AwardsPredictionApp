import { iTmdbCast, iTmdbCrew } from '../tmdb/types';

export type iCachedTmdbMovie = {
  title: string;
  plot: string;
  imdbId: string;
  year: number | null;
  productionCompanies: string[];
  productionCountries: string[];
  backdropPath: string | null;
  posterPath: string | null;
};

export type iCachedTmdbCredits = {
  directors: iTmdbCrew[];
  cast: iTmdbCast[];
};

export type iCachedTmdbPerson = {
  name: string;
  gender: number;
  profilePath: string | null;
  imdbId: string;
  biography: string;
};
