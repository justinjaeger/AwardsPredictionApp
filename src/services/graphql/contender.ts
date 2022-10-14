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
import { GraphqlAPI, handleError, iApiResponse } from '../utils';
import { getEvent } from './event';
import { getCategorySlots } from '../../constants/categories';
import { getPredictionsByContender } from './prediction';

type iContenderParams = {
  categoryId: string;
  movieId: string;
  personId?: string;
  songId?: string;
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
    return handleError('error getting movie by id', err);
  }
};

// should return a SINGLE contender
const getUniqueContenders = async (
  params: iContenderParams,
): Promise<iApiResponse<ListContendersQuery>> => {
  const { categoryId, movieId, personId, songId } = params;
  // Create filter based on params passed
  const filter: ModelContenderFilterInput = {
    categoryId: { eq: categoryId },
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
    return handleError('error getting movie by id', err);
  }
};

const createContender = async (
  params: iContenderParams,
): Promise<iApiResponse<CreateContenderMutation>> => {
  const { categoryId, movieId, personId, songId } = params;
  // Create input according to params passed
  const input: CreateContenderInput = {
    categoryId,
    contenderMovieId: movieId,
    numberOfUsersPredictingNom: 0,
    numberOfUsersPredictingUnranked: 0,
    numberOfUsersPredictingWin: 0,
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
    return handleError('error creating movie', err);
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
  categoryId: string;
  movieId: string;
}) => getOrCreateContender(params);

export const getOrCreatePerformance = async (params: {
  categoryId: string;
  movieId: string;
  personId: string;
}) => getOrCreateContender(params);

export const getOrCreateSongContender = async (params: {
  categoryId: string;
  movieId: string;
  songId: string;
}) => getOrCreateContender(params);

export const getContendersByCategory = async (
  categoryId: string,
): Promise<iApiResponse<ListContendersQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      ListContendersQuery,
      ListContendersQueryVariables
    >(queries.listContenders, {
      filter: {
        categoryId: { eq: categoryId },
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

export type iNumberPredicting = {
  predictingWin: number;
  predictingNom: number;
  predictingUnranked: number;
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

    // this is weird and broken and it's because of datastore
    const eventId = category?.event?.id || category.eventCategoriesId;
    if (!eventId) {
      throw new Error('No event id in createOrUpdatePredictions');
    }
    const { data: event } = await getEvent(eventId);
    const e = event?.getEvent;
    if (!e) {
      return { status: 'error' };
    }

    const slots = getCategorySlots(e.year, e.awardsBody, category.name);

    const { data: predictions } = await getPredictionsByContender(contenderId);
    if (!predictions?.listPredictions) {
      return { status: 'error' };
    }

    const result = predictions?.listPredictions.items.reduce(
      (acc: iNumberPredicting, p) => {
        if (!p) return acc;
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
