import {
  ListMoviesQuery,
  GetMovieQuery,
  CreateMovieMutation,
  UpdateMovieMutation,
  UpdateMovieMutationVariables,
  GetMovieQueryVariables,
  CreateMovieMutationVariables,
  ListMoviesQueryVariables,
  DeleteMovieMutation,
  DeleteMovieMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as customMutations from '../../graphqlCustom/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

export const getMovie = async (id: string): Promise<iApiResponse<GetMovieQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<GetMovieQuery, GetMovieQueryVariables>(
      queries.getMovie,
      { id },
    );
    if (!data?.getMovie) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting movie by id', err);
  }
};

export const getAllMovies = async (): Promise<iApiResponse<ListMoviesQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<ListMoviesQuery, ListMoviesQueryVariables>(
      customQueries.listMovies,
    );
    if (!data?.listMovies) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting all movies', err);
  }
};

/**
 * enforce tmdb being unique
 */
export const getMoviesByTmdb = async (
  tmdbId: number,
): Promise<iApiResponse<ListMoviesQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<ListMoviesQuery, ListMoviesQueryVariables>(
      customQueries.listMovies,
      { filter: { tmdbId: { eq: tmdbId } } },
    );
    if (!data?.listMovies) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting movie by tmdb', err);
  }
};

export const createMovie = async (
  tmdbId: number,
): Promise<iApiResponse<CreateMovieMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      CreateMovieMutation,
      CreateMovieMutationVariables
    >(mutations.createMovie, { input: { tmdbId } });
    if (!data?.createMovie) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating movie', err);
  }
};

/**
 * enforce tmdb being unique
 * check to see if movie is already stored (identified by tmdbId)
 */
export const getOrCreateMovie = async (
  tmdbId: number,
): Promise<iApiResponse<GetMovieQuery>> => {
  try {
    // get movies with tmdbId
    const { data: maybeMovies } = await getMoviesByTmdb(tmdbId);
    if (!maybeMovies?.listMovies) {
      return { status: 'error' };
    }
    let movieId = maybeMovies.listMovies.items[0]?.id || undefined;
    // if no movie exists with tmdbId, create one
    if (!movieId) {
      const { data: newMovie } = await createMovie(tmdbId);
      const mId = newMovie?.createMovie?.id;
      if (!mId) {
        return { status: 'error' };
      }
      movieId = mId;
    }
    // finally, with existing or created movieId, get the movie
    const { data } = await getMovie(movieId);
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting or creating movie', err);
  }
};

export const updateStudio = async (
  id: string,
  studio: string,
): Promise<iApiResponse<UpdateMovieMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UpdateMovieMutation,
      UpdateMovieMutationVariables
    >(mutations.updateMovie, { input: { id, studio } });
    if (!data?.updateMovie) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error updating studio', err);
  }
};

export const deleteMovieById = async (
  id: string,
): Promise<iApiResponse<DeleteMovieMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      DeleteMovieMutation,
      DeleteMovieMutationVariables
    >(customMutations.deleteMovie, { input: { id } });
    if (!data?.deleteMovie) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting movie by id', err);
  }
};
