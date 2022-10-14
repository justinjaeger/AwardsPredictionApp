import { CategoryName } from '../../API';

export type iCategoryDetails = { [key in CategoryName]: string[] | undefined };

export type iCachedTmdbMovie = {
  title: string;
  plot: string;
  imdbId: string;
  year: number | null;
  productionCompanies: string[];
  productionCountries: string[];
  backdropPath: string | null;
  posterPath: string | null;
  cast: string;
  categoryInfo: iCategoryDetails;
};

export type iCachedTmdbPerson = {
  name: string;
  gender: number;
  profilePath: string | null;
  imdbId: string;
  biography: string;
};
