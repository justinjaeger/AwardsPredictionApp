import {
  ListContendersQuery,
  ListContendersQueryVariables,
  CreateContenderMutation,
  CreateContenderMutationVariables,
  GetContenderQuery,
  GetContenderQueryVariables,
  ModelContenderFilterInput,
  CreateContenderInput,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';
import { getEventById } from './event';
import { getPredictionsByContender } from './prediction';
import ApiServices from '.';
import { iNumberPredicting } from '../../store/types';

type iContenderParams = {
  eventId: string;
  categoryId: string;
  movieId: string;
  personId?: string;
  songId?: string;
};

export const createFilmContender = async (params: {
  eventId: string;
  categoryId: string;
  movieTmdbId: number;
}): Promise<iApiResponse<any>> => {
  const { eventId, categoryId, movieTmdbId } = params;
  try {
    const { data: movieResponse } = await ApiServices.getOrCreateMovie(movieTmdbId);
    const movieId = movieResponse?.getMovie?.id;
    if (!movieId) {
      return { status: 'error' };
    }
    const contenderParams = {
      eventId,
      categoryId,
      movieId,
    };
    // get contenders with unique-defining params
    const { data: maybeContenders } = await getUniqueContenders(contenderParams);
    if (!maybeContenders?.listContenders) {
      return { status: 'error' };
    }
    let contenderId = maybeContenders.listContenders.items[0]?.id || undefined;
    // if no contender exists, create one
    if (!contenderId) {
      const { data: newMovie } = await createContender(contenderParams);
      const cId = newMovie?.createContender?.id;
      if (!cId) {
        return { status: 'error' };
      }
      contenderId = cId;
    }
    return { status: 'success' };
  } catch (err) {
    return handleError('error getting or creating contender', err);
  }
};

export const createActingContender = async (params: {
  eventId: string;
  categoryId: string;
  movieTmdbId: number;
  personTmdbId: number;
}): Promise<iApiResponse<any>> => {
  const { eventId, categoryId, movieTmdbId, personTmdbId } = params;
  try {
    const { data: movieResponse } = await ApiServices.getOrCreateMovie(movieTmdbId);
    const movieId = movieResponse?.getMovie?.id;
    if (!movieId) {
      return { status: 'error' };
    }
    const { data: personResponse } = await ApiServices.getOrCreatePerson(personTmdbId);
    const personId = personResponse?.getPerson?.id;
    if (!personId) {
      return { status: 'error' };
    }
    const contenderParams = {
      eventId,
      categoryId,
      movieId,
      personId,
    };
    // get contenders with unique-defining params
    const { data: maybeContenders } = await getUniqueContenders(contenderParams);
    if (!maybeContenders?.listContenders) {
      return { status: 'error' };
    }
    let contenderId = maybeContenders.listContenders.items[0]?.id || undefined;
    // if no contender exists, create one
    if (!contenderId) {
      const { data: newMovie } = await createContender(contenderParams);
      const cId = newMovie?.createContender?.id;
      if (!cId) {
        return { status: 'error' };
      }
      contenderId = cId;
    }
    return { status: 'success' };
  } catch (err) {
    return handleError('error getting or creating acting contender', err);
  }
};

export const getContenderById = async (
  id: string,
): Promise<iApiResponse<GetContenderQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      GetContenderQuery,
      GetContenderQueryVariables
    >(queries.getContender, { id });
    if (!data?.getContender) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting contender by id', err);
  }
};

// should return a SINGLE contender
const getUniqueContenders = async (
  params: iContenderParams,
): Promise<iApiResponse<ListContendersQuery>> => {
  const { categoryId, movieId, personId, songId } = params;
  // Create filter based on params passed
  const filter: ModelContenderFilterInput = {
    categoryContendersId: { eq: categoryId },
    contenderMovieId: { eq: movieId },
  };
  if (personId) {
    filter.contenderPersonId = { eq: personId };
  }
  if (songId) {
    filter.contenderSongId = { eq: songId };
  }
  // perform the query
  try {
    const { data, errors } = await GraphqlAPI<
      ListContendersQuery,
      ListContendersQueryVariables
    >(queries.listContenders, {
      filter,
    });
    if (!data?.listContenders) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting unique contenders', err);
  }
};

const createContender = async (
  params: iContenderParams,
): Promise<iApiResponse<CreateContenderMutation>> => {
  const { eventId, categoryId, movieId, personId, songId } = params;
  // Create input according to params passed
  const input: CreateContenderInput = {
    categoryContendersId: categoryId,
    contenderMovieId: movieId,
    eventContendersId: eventId,
  };
  if (personId) {
    input.contenderPersonId = personId;
  }
  if (songId) {
    input.contenderSongId = songId;
  }
  // perform mutation
  try {
    const { data, errors } = await GraphqlAPI<
      CreateContenderMutation,
      CreateContenderMutationVariables
    >(mutations.createContender, {
      input,
    });
    if (!data?.createContender) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating contender', err);
  }
};

const getOrCreateContender = async (
  params: iContenderParams,
): Promise<iApiResponse<GetContenderQuery>> => {
  try {
    // get contenders with unique-defining params
    const { data: maybeContenders } = await getUniqueContenders(params);
    if (!maybeContenders?.listContenders) {
      return { status: 'error' };
    }
    let contenderId = maybeContenders.listContenders.items[0]?.id || undefined;
    // if no contender exists, create one
    if (!contenderId) {
      const { data: newMovie } = await createContender(params);
      const cId = newMovie?.createContender?.id;
      if (!cId) {
        return { status: 'error' };
      }
      contenderId = cId;
    }
    // finally, with existing or created movieId, get the movie
    const { data } = await getContenderById(contenderId);
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting or creating contender', err);
  }
};

// This is all to enforce uniqueness. Not how above functions are NOT exported
export const getOrCreateFilmContender = async (params: {
  eventId: string;
  categoryId: string;
  movieId: string;
}) => getOrCreateContender(params);

export const getOrCreatePerformance = async (params: {
  eventId: string;
  categoryId: string;
  movieId: string;
  personId: string;
}) => getOrCreateContender(params);

export const getOrCreateSongContender = async (params: {
  eventId: string;
  categoryId: string;
  movieId: string;
  songId: string;
}) => getOrCreateContender(params);

export const getContendersByEvent = async (
  eventId: string,
): Promise<iApiResponse<ListContendersQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      ListContendersQuery,
      ListContendersQueryVariables
    >(customQueries.listContenders, {
      filter: {
        eventContendersId: { eq: eventId },
      },
    });
    if (!data?.listContenders) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting contenders by event', err);
  }
};

export const getContendersByCategory = async (
  categoryId: string,
): Promise<iApiResponse<ListContendersQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      ListContendersQuery,
      ListContendersQueryVariables
    >(queries.listContenders, {
      filter: {
        categoryContendersId: { eq: categoryId },
      },
    });
    if (!data?.listContenders) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting contenders by category', err);
  }
};

export const getNumberPredicting = async (
  contenderId: string,
): Promise<iApiResponse<iNumberPredicting>> => {
  // Get all predictions where contenderId = contenderId
  // This works because the predictions table is now just the MOST RECENT PREDICTIONS
  try {
    const { data: contender } = await getContenderById(contenderId);
    const c = contender?.getContender;
    if (!c) {
      return { status: 'error' };
    }
    const category = c.category;

    // this is weird
    const eventId = category?.event?.id || category.eventCategoriesId;
    if (!eventId) {
      throw new Error('No event id in createOrUpdatePredictions');
    }
    const { data: event } = await getEventById(eventId);
    const e = event?.getEvent;
    if (!e) {
      return { status: 'error' };
    }

    const { data: predictions } = await getPredictionsByContender(contenderId);
    if (!predictions?.listPredictions) {
      return { status: 'error' };
    }

    const result: iNumberPredicting = {};
    predictions?.listPredictions.items.forEach((cp) => {
      const someUsersRanking = cp?.ranking || 0;
      if (!result[someUsersRanking]) {
        result[someUsersRanking] = 0;
      }
      result[someUsersRanking] += 1;
    });

    return { status: 'success', data: result };
  } catch (err) {
    return handleError('error getting num predicting', err);
  }
};
