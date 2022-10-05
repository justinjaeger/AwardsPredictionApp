import { handleError, iApiResponse } from '../utils';
import { DataStore } from 'aws-amplify';
import {
  Category,
  Contender,
  CategoryType,
  Movie,
  Event,
  Person,
  Song,
  Prediction,
} from '../../models';
import { getCategorySlots } from '../../constants/categories';

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
 * returns performance if exists
 */
export const getSongContender = async (
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
    const s = maybeSongs.length > 0 ? maybeSongs[0] : undefined;
    return { status: 'success', data: s };
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
          numberOfUsersPredictingWin: 0,
          numberOfUsersPredictingNom: 0,
          numberOfUsersPredictingUnranked: 0,
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
          contenderPersonId: person.id,
          numberOfUsersPredictingWin: 0,
          numberOfUsersPredictingNom: 0,
          numberOfUsersPredictingUnranked: 0,
        }),
      );
    }
    return { status: 'success', data: performance };
  } catch (err) {
    return handleError(undefined, err);
  }
};

/**
 * returns existing or new performance based on uniqueness of category+movie+person
 * only works with CategoryType.PERFORMANCE
 */
export const getOrCreateSongContender = async (
  category: Category,
  movie: Movie,
  song: Song,
): Promise<iApiResponse<Contender>> => {
  try {
    let _song = (await getSongContender(category, movie, song)).data;
    if (!_song) {
      _song = await DataStore.save(
        new Contender({
          category,
          movie,
          song,
          contenderMovieId: movie.id,
          contenderSongId: song.id,
          numberOfUsersPredictingWin: 0,
          numberOfUsersPredictingNom: 0,
          numberOfUsersPredictingUnranked: 0,
        }),
      );
    }
    return { status: 'success', data: _song };
  } catch (err) {
    return handleError(undefined, err);
  }
};

export type iNumberPredicting = {
  predictingWin: number;
  predictingNom: number;
  predictingUnranked: number;
};

export const getNumberPredicting = async (
  contender: Contender,
): Promise<iApiResponse<iNumberPredicting>> => {
  // Get all predictions where contenderId = contenderId
  // This works because the predictions table is now just the MOST RECENT PREDICTIONS
  try {
    const category = contender.category;

    // this is weird and broken and it's because of datastore
    const eventId = category?.event?.id || category.eventCategoriesId;
    if (!eventId) {
      throw new Error('No event id in createOrUpdatePredictions');
    }
    const event = await DataStore.query(Event, category.event.id);
    if (!event) {
      throw new Error('No event in createOrUpdatePredictions');
    }

    const slots = getCategorySlots(event, category);

    const predictions = await DataStore.query(Prediction, (p) =>
      p.contenderPredictionsId('eq', contender.id),
    );

    const result = predictions.reduce(
      (acc: iNumberPredicting, p) => {
        if (p.ranking === 1) {
          acc.predictingWin += 1;
        } else if (p.ranking <= slots) {
          acc.predictingNom += 1;
        } else {
          acc.predictingUnranked += 1;
        }
        return acc;
      },
      { predictingWin: 0, predictingNom: 0, predictingUnranked: 0 },
    );

    return { status: 'success', data: result };
  } catch (err) {
    return handleError('error getting num predicting', err);
  }
};
