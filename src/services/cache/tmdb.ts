import _ from 'lodash';
import AsyncStorageCache from '.';
import MongoApi from '../api/requests';
import { Movie, Person, Song } from '../../types/api';

type iGetManyResult<T> = Record<string, T>;

/**
 * Caches movie, person, and song data stored in Mongo
 * Pass an array of ids
 * Get back an object where the ids are keyed and point to tmdb data
 */

const getOrSetMovies = async (movieIds: string[]): Promise<iGetManyResult<Movie>> => {
  const result: iGetManyResult<Movie> = {};

  const cacheResult = await AsyncStorageCache.getItems<Movie>(movieIds);
  // add all values that were found in cache
  cacheResult.forEach((movie, i) => {
    const movieId = movieIds[i];
    if (!movie) return;
    result[movieId] = movie;
  });

  // for all values that were NOT found, batch request them from db
  const notFoundMovieIds = movieIds.filter((movieId, i) => !cacheResult[i] === undefined);
  const { data } = await MongoApi.getMovies(notFoundMovieIds);
  // set values in cache
  const toBeCachedItems = _.entries(data)?.map(([movieId, data]) => ({
    key: movieId,
    value: data,
  }));
  AsyncStorageCache.setItems(toBeCachedItems);
  // set all new values in result
  toBeCachedItems.forEach(({ key, value }) => {
    result[key] = value;
  });
  return result;
};

const getOrSetPersons = async (personIds: string[]): Promise<iGetManyResult<Person>> => {
  const result: iGetManyResult<Person> = {};

  const cacheResult = await AsyncStorageCache.getItems<Person>(personIds);
  // add all values that were found in cache
  cacheResult.forEach((person, i) => {
    const personId = personIds[i];
    if (!person) return;
    result[personId] = person;
  });

  // for all values that were NOT found, batch request them from db
  const notFoundPersonIds = personIds.filter(
    (personId, i) => !cacheResult[i] === undefined,
  );
  const { data } = await MongoApi.getPersons(notFoundPersonIds);
  // set values in cache
  const toBeCachedItems = _.entries(data)?.map(([personId, data]) => ({
    key: personId,
    value: data,
  }));
  AsyncStorageCache.setItems(toBeCachedItems);
  // set all new values in result
  toBeCachedItems.forEach(({ key, value }) => {
    result[key] = value;
  });
  return result;
};

const getOrSetSongs = async (songIds: string[]): Promise<iGetManyResult<Song>> => {
  const result: iGetManyResult<Song> = {};

  const cacheResult = await AsyncStorageCache.getItems<Song>(songIds);
  // add all values that were found in cache
  cacheResult.forEach((song, i) => {
    const songId = songIds[i];
    if (!song) return;
    result[songId] = song;
  });

  // for all values that were NOT found, batch request them from db
  const notFoundSongIds = songIds.filter((songId, i) => !cacheResult[i] === undefined);
  const { data } = await MongoApi.getSongs(notFoundSongIds);
  // set values in cache
  const toBeCachedItems = _.entries(data)?.map(([songId, data]) => ({
    key: songId,
    value: data,
  }));
  AsyncStorageCache.setItems(toBeCachedItems);
  // set all new values in result
  toBeCachedItems.forEach(({ key, value }) => {
    result[key] = value;
  });
  return result;
};

const TmdbCache = {
  getOrSetMovies,
  getOrSetPersons,
  getOrSetSongs,
};

export default TmdbCache;
