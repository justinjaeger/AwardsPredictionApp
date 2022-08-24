import * as TmdbSearch from './search';
import * as TmdbMovie from './movie';

export const TMDB_URL = 'https://api.themoviedb.org/3';

const TmdbServices = {
  ...TmdbSearch,
  ...TmdbMovie,
};

export default TmdbServices;
