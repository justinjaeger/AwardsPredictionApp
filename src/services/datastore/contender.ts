import { handleError, iApiResponse } from '../utils';
import { DataStore } from 'aws-amplify';
import { Category, Contender, CategoryType, Movie, Person, Song } from '../../models';

/**
 * returns film contender if exists
 */
export const getContender = async (
  category: Category,
  movie: Movie,
): Promise<iApiResponse<Contender>> => {
  try {
    const maybeContenders = (
      await DataStore.query(Contender, (c) => c.contenderMovieId('eq', movie.id))
    ).filter((c) => c.category?.id === category.id && c.category?.type === category.type);
    const contender = maybeContenders.length > 0 ? maybeContenders[0] : undefined;
    return { status: 'success', data: contender };
  } catch (err) {
    return handleError(undefined, err);
  }
};

/**
 * returns performance if exists
 */
export const getPerformance = async (
  category: Category,
  movie: Movie,
  person: Person,
): Promise<iApiResponse<Contender>> => {
  try {
    const maybePerformances = (
      await DataStore.query(Contender, (c) => c.contenderMovieId('eq', movie.id))
    ).filter(
      (c) =>
        c.person &&
        c.person.id === person.id &&
        c.category?.id === category.id &&
        c.category?.type === CategoryType.PERFORMANCE,
    );
    const performance = maybePerformances.length > 0 ? maybePerformances[0] : undefined;
    return { status: 'success', data: performance };
  } catch (err) {
    return handleError(undefined, err);
  }
};

/**
 * returns song if exists
 */
export const getSong = async (
  category: Category,
  movie: Movie,
  song: Song,
): Promise<iApiResponse<Contender>> => {
  try {
    const maybeSongs = (
      await DataStore.query(Contender, (c) => c.contenderMovieId('eq', movie.id))
    ).filter(
      (c) =>
        c.song &&
        c.song.id === song.id &&
        c.category?.id === category.id &&
        c.category?.type === CategoryType.SONG,
    );
    const songContender = maybeSongs.length > 0 ? maybeSongs[0] : undefined;
    return { status: 'success', data: songContender };
  } catch (err) {
    return handleError(undefined, err);
  }
};

/**
 * return existing or new contender based on uniqueness of category+movie
 * only works with CategoryType.FILM
 */
export const getOrCreateContender = async (
  category: Category,
  movie: Movie,
): Promise<iApiResponse<Contender>> => {
  try {
    let contender = (await getContender(category, movie)).data;
    if (!contender) {
      contender = await DataStore.save(
        new Contender({
          category,
          movie,
          contenderMovieId: movie.id,
        }),
      );
    }
    return { status: 'success', data: contender };
  } catch (err) {
    return handleError(undefined, err);
  }
};

/**
 * returns existing or new performance based on uniqueness of category+movie+person
 * only works with CategoryType.PERFORMANCE
 */
export const getOrCreatePerformance = async (
  category: Category,
  movie: Movie,
  person: Person,
): Promise<iApiResponse<Contender>> => {
  try {
    let performance = (await getPerformance(category, movie, person)).data;
    if (!performance) {
      performance = await DataStore.save(
        new Contender({
          category,
          movie,
          person,
          contenderMovieId: movie.id,
        }),
      );
    }
    return { status: 'success', data: performance };
  } catch (err) {
    return handleError(undefined, err);
  }
};

/**
 * returns existing or new performance based on uniqueness of category+movie+song
 * only works with CategoryType.SONG
 */
export const getOrCreateSong = async (
  category: Category,
  movie: Movie,
  song: Song,
): Promise<iApiResponse<Contender>> => {
  try {
    let songContender = (await getSong(category, movie, song)).data;
    if (!songContender) {
      songContender = await DataStore.save(
        new Contender({
          category,
          movie,
          song,
          contenderMovieId: movie.id,
        }),
      );
    }
    return { status: 'success', data: songContender };
  } catch (err) {
    return handleError(undefined, err);
  }
};
