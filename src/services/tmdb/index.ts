import * as TmdbSearch from './search';
import * as TmdbMovie from './movie';
import * as TmdbPerson from './person';

export const TMDB_URL = 'https://api.themoviedb.org/3';

const TmdbServices = {
  ...TmdbSearch,
  ...TmdbMovie,
  ...TmdbPerson,
};

export default TmdbServices;
