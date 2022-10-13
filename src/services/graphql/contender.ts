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
