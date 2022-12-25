import {
  ListContendersQuery,
  ListContendersQueryVariables,
  CreateContenderMutation,
  CreateContenderMutationVariables,
  ModelContenderFilterInput,
  CreateContenderInput,
  GetContenderQuery,
  GetContenderQueryVariables,
  ContenderVisibility,
  UpdateContenderMutation,
  UpdateContenderMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';
import ApiServices from '.';

type iContenderParams = {
  eventId: string;
  categoryId: string;
  movieId: string;
  personId?: string;
  songId?: string;
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
    >(customQueries.listContenders, {
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

// Every "create contender" function should call this
const createContender = async (
  params: iContenderParams,
): Promise<iApiResponse<CreateContenderMutation>> => {
  const { eventId, categoryId, movieId, personId, songId } = params;
  // Create input according to params passed
  const input: CreateContenderInput = {
    categoryContendersId: categoryId,
    contenderMovieId: movieId,
    eventContendersId: eventId,
    visibility: ContenderVisibility.VISIBLE,
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

const createUniqueContender = async (
  params: iContenderParams,
): Promise<iApiResponse<any>> => {
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
  return { status: 'success' };
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
    return createUniqueContender(contenderParams);
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
    return createUniqueContender(contenderParams);
  } catch (err) {
    return handleError('error getting or creating acting contender', err);
  }
};

export const createSongContender = async (params: {
  eventId: string;
  categoryId: string;
  movieTmdbId: number;
  title: string;
  artist: string;
}): Promise<iApiResponse<any>> => {
  const { eventId, categoryId, movieTmdbId, title, artist } = params;
  const { data: movieResponse } = await ApiServices.getOrCreateMovie(movieTmdbId);
  const movieId = movieResponse?.getMovie?.id;
  if (!movieId) {
    return { status: 'error' };
  }
  const { data: personResponse } = await ApiServices.getOrCreateSong({
    title,
    artist,
    movieId,
  });
  const songId = personResponse?.getSong?.id;
  if (!songId) {
    return { status: 'error' };
  }
  try {
    const contenderParams = {
      eventId,
      categoryId,
      movieId,
      songId,
    };
    return createUniqueContender(contenderParams);
  } catch (err) {
    return handleError('error getting or creating acting contender', err);
  }
};

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

export const getContenderById = async (
  contenderId: string,
): Promise<iApiResponse<GetContenderQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      GetContenderQuery,
      GetContenderQueryVariables
    >(queries.getContender, {
      id: contenderId,
    });
    if (!data?.getContender) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting contender by id', err);
  }
};

export const updateContenderVisibilty = async (
  contenderId: string,
  contenderMovieId: string,
  visibility: ContenderVisibility,
): Promise<iApiResponse<UpdateContenderMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UpdateContenderMutation,
      UpdateContenderMutationVariables
    >(mutations.updateContender, {
      input: { id: contenderId, contenderMovieId, visibility },
    });
    if (!data?.updateContender) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updating contender hidden', err);
  }
};
