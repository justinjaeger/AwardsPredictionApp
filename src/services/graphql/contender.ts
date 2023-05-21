import {
  ListContendersQuery,
  ListContendersQueryVariables,
  CreateContenderMutation,
  CreateContenderMutationVariables,
  CreateContenderInput,
  GetContenderQuery,
  GetContenderQueryVariables,
  ContenderVisibility,
  UpdateContenderMutation,
  UpdateContenderMutationVariables,
  ContenderAccolade,
  PredictionType,
  DeleteContenderMutation,
  DeleteContenderMutationVariables,
  GetUniqueMovieContenderQueryVariables,
  GetUniqueMovieContenderQuery,
  ModelContenderFilterInput,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as customMutations from '../../graphqlCustom/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';
import ApiServices from '.';
import { iPrediction } from '../../types';

/**
 * LEAVING OFF HERE:
 * - already did user.ts and relationship.ts
 * - need to do contender.ts
 * - I'm gonna commit everything though to not lose it
 * - but to see diff just run
 * git reset --soft HEAD~1
 *
 * TODO: Must backfill the sort key field for getUniqueContender & getUniqueSongContender
 */

type iContenderParams = {
  eventId: string;
  categoryId: string;
  movieId: string;
  personId?: string;
  songId?: string;
};

// if movie category, returns a single contender
// if song category, may return several contenders
// if person category, may return several contenders
const getUniqueContenders = async (
  params: iContenderParams,
): Promise<iApiResponse<GetUniqueMovieContenderQuery>> => {
  const { categoryId, movieId, personId, songId } = params;
  try {
    let filter: ModelContenderFilterInput | null = null;
    if (songId) {
      filter = { songId: { eq: songId } };
    }
    if (personId) {
      filter = { personId: { eq: personId } };
    }
    const { data, errors } = await GraphqlAPI<
      GetUniqueMovieContenderQuery,
      GetUniqueMovieContenderQueryVariables
    >(customQueries.getUniqueMovieContender, {
      categoryId,
      movieId: { eq: movieId },
      filter,
    });
    if (!data?.getUniqueMovieContender) {
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
    categoryId,
    movieId,
    eventId,
    visibility: ContenderVisibility.VISIBLE,
  };
  if (personId) {
    input.personId = personId;
  }
  if (songId) {
    input.songId = songId;
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

// We want to return iPrediction here so that the user's predictions can update immediately
// TODO: use index, getContenderByCategoryIdAndMovieIdAndPersonIdAndSongId (getUniqueContender)
const createUniqueContender = async (
  params: iContenderParams,
): Promise<iApiResponse<iPrediction>> => {
  // get contenders with unique-defining params
  const { data: maybeContenders } = await getUniqueContenders(params);
  if (!maybeContenders?.getUniqueMovieContender) {
    return { status: 'error' };
  }
  let contender = maybeContenders.getUniqueMovieContender.items[0];
  // if no contender exists, create one
  if (!contender) {
    const { data: newMovie } = await createContender(params);
    const con = newMovie?.createContender;
    if (!con) {
      return { status: 'error' };
    }
    contender = con;
  }
  // format "data" in response to match iPrediction
  return {
    status: 'success',
    data: {
      ranking: 0, // just filler, might be a problem idk
      accolade: contender.accolade || undefined,
      visibility: contender.visibility || ContenderVisibility.VISIBLE,
      predictionType: PredictionType.NOMINATION, // they only add predictions for nominations
      contenderId: contender.id,
      contenderMovie: contender.movie,
      contenderPerson: contender.person
        ? {
            id: contender.person.id,
            tmdbId: contender.person.tmdbId,
          }
        : undefined,
      contenderSong: contender.song
        ? {
            id: contender.song.id,
            title: contender.song.title,
            artist: contender.song.artist,
          }
        : undefined,
    },
  };
};

export const createFilmContender = async (params: {
  eventId: string;
  categoryId: string;
  movieTmdbId: number;
}): Promise<iApiResponse<iPrediction>> => {
  const { eventId, categoryId, movieTmdbId } = params;
  try {
    const { data: movieId } = await ApiServices.getOrCreateMovie(movieTmdbId);
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
}): Promise<iApiResponse<iPrediction>> => {
  const { eventId, categoryId, movieTmdbId, personTmdbId } = params;
  try {
    const { data: movieId } = await ApiServices.getOrCreateMovie(movieTmdbId);
    if (!movieId) {
      return { status: 'error' };
    }
    const { data: personId } = await ApiServices.getOrCreatePerson(personTmdbId);
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
}): Promise<iApiResponse<iPrediction>> => {
  const { eventId, categoryId, movieTmdbId, title, artist } = params;
  const { data: movieId } = await ApiServices.getOrCreateMovie(movieTmdbId);
  if (!movieId) {
    return { status: 'error' };
  }
  const { data: songId } = await ApiServices.getOrCreateSong({
    title,
    artist,
    movieId,
  });
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
  movieId: string,
  visibility: ContenderVisibility,
): Promise<iApiResponse<UpdateContenderMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UpdateContenderMutation,
      UpdateContenderMutationVariables
    >(mutations.updateContender, {
      input: { id: contenderId, movieId, visibility },
    });
    if (!data?.updateContender) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updateContenderVisibilty', err);
  }
};

export const updateContenderAccolade = async (
  contenderId: string,
  accolade: ContenderAccolade | null,
): Promise<iApiResponse<UpdateContenderMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UpdateContenderMutation,
      UpdateContenderMutationVariables
    >(mutations.updateContender, {
      input: { id: contenderId, accolade },
    });
    if (!data?.updateContender) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updateContenderAccolade', err);
  }
};

/**
 * FOR DUPLICATE SCRIPT
 */

export const listEveryContender = async (): Promise<
  iApiResponse<ListContendersQuery>
> => {
  try {
    const { data, errors } = await GraphqlAPI<
      ListContendersQuery,
      ListContendersQueryVariables
    >(customQueries.listEveryContender);
    if (!data?.listContenders) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting contenders by event', err);
  }
};

export const updateContenderMovie = async (
  contenderId: string,
  movieId: string,
): Promise<iApiResponse<UpdateContenderMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UpdateContenderMutation,
      UpdateContenderMutationVariables
    >(customMutations.updateContender, {
      input: { id: contenderId, movieId },
    });
    if (!data?.updateContender) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updateContenderMovie', err);
  }
};

export const updateContenderPerson = async (
  contenderId: string,
  personId: string,
): Promise<iApiResponse<UpdateContenderMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UpdateContenderMutation,
      UpdateContenderMutationVariables
    >(customMutations.updateContender, {
      input: { id: contenderId, personId },
    });
    if (!data?.updateContender) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updateContenderMovie', err);
  }
};

export const updateContenderSong = async (
  contenderId: string,
  songId: string,
): Promise<iApiResponse<UpdateContenderMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UpdateContenderMutation,
      UpdateContenderMutationVariables
    >(customMutations.updateContender, {
      input: { id: contenderId, songId },
    });
    if (!data?.updateContender) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updateContenderMovie', err);
  }
};

export const deleteContenderById = async (
  id: string,
): Promise<iApiResponse<DeleteContenderMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      DeleteContenderMutation,
      DeleteContenderMutationVariables
    >(customMutations.deleteContender, { input: { id } });
    if (!data?.deleteContender) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting movie by id', err);
  }
};

const PAGINATED_LIMIT = 500;
export const listEveryContenderPaginated = async (
  nextToken?: string | null,
): Promise<iApiResponse<ListContendersQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      ListContendersQuery,
      ListContendersQueryVariables
    >(customQueries.listEveryContenderPaginated, { nextToken, limit: PAGINATED_LIMIT });
    if (!data?.listContenders) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting contenders by event', err);
  }
};
