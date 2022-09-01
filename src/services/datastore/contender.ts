import { handleError, iApiResponse } from '../utils';
import { DataStore } from 'aws-amplify';
import { Category, Contender, ContenderType, Movie, Person } from '../../models';

/**
 * return existing or new contender based on uniqueness of category+movie
 * only works with ContenderType.DEFAULT
 */
export const getOrCreateContender = async (
  category: Category,
  movie: Movie,
): Promise<iApiResponse<Contender>> => {
  try {
    const maybeContenders = (
      await DataStore.query(Contender, (c) => c.contenderMovieId('eq', movie.id))
    ).filter(
      (c) => c.category?.id === category.id && c.contenderType === ContenderType.DEFAULT,
    );
    let contender = maybeContenders.length > 0 ? maybeContenders[0] : undefined;
    if (!contender) {
      contender = await DataStore.save(
        new Contender({
          category,
          movie,
          contenderMovieId: movie.id,
          contenderType: ContenderType.DEFAULT,
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
 * only works with ContenderType.PERFORMANCE
 */
export const getOrCreatePerformance = async (
  category: Category,
  movie: Movie,
  person: Person,
): Promise<iApiResponse<Contender>> => {
  try {
    const maybePerformances = (
      await DataStore.query(Contender, (c) => c.contenderMovieId('eq', movie.id))
    ).filter(
      (c) => c.person && c.person.id === person.id && c.category?.id === category.id,
    );
    let performance = maybePerformances.length > 0 ? maybePerformances[0] : undefined;
    if (!performance) {
      performance = await DataStore.save(
        new Contender({
          category,
          movie,
          person,
          contenderMovieId: movie.id,
          contenderType: ContenderType.PERFORMANCE,
        }),
      );
    }
    return { status: 'success', data: performance };
  } catch (err) {
    return handleError(undefined, err);
  }
};

/**
 * returns contender if contender exists
 */
export const peekContender = async (
  category: Category,
  movie: Movie,
): Promise<iApiResponse<Contender>> => {
  try {
    const maybeContenders = (
      await DataStore.query(Contender, (c) => c.contenderMovieId('eq', movie.id))
    ).filter(
      (c) => c.category?.id === category.id && c.contenderType === ContenderType.DEFAULT,
    );
    const contender = maybeContenders.length > 0 ? maybeContenders[0] : undefined;
    return { status: 'success', data: contender };
  } catch (err) {
    return handleError(undefined, err);
  }
};
