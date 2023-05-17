import {
  ListMoviesQuery,
  CreateMovieMutation,
  UpdateMovieMutation,
  UpdateMovieMutationVariables,
  CreateMovieMutationVariables,
  ListMoviesQueryVariables,
  DeleteMovieMutation,
  DeleteMovieMutationVariables,
  MovieByTmdbIdQuery,
  MovieByTmdbIdQueryVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as customMutations from '../../graphqlCustom/mutations';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

const getMoviesByTmdb = async (
  tmdbId: number,
): Promise<iApiResponse<MovieByTmdbIdQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      MovieByTmdbIdQuery,
      MovieByTmdbIdQueryVariables
    >(customQueries.movieByTmdbId, { tmdbId });
    if (!data?.movieByTmdbId) {
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
    >(customMutations.createMovie, { input: { tmdbId } });
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
 * once gotten or created, return just the movie id
 */
export const getOrCreateMovie = async (tmdbId: number): Promise<iApiResponse<string>> => {
  try {
    // get movies with tmdbId
    const { data: maybeMovies } = await getMoviesByTmdb(tmdbId);
    if (!maybeMovies?.movieByTmdbId) {
      return { status: 'error' };
    }
    let movieId = maybeMovies.movieByTmdbId.items[0]?.id || undefined;
    // if no movie exists with tmdbId, create one
    if (!movieId) {
      const { data: newMovie } = await createMovie(tmdbId);
      const mId = newMovie?.createMovie?.id;
      if (!mId) {
        return { status: 'error' };
      }
      movieId = mId;
    }
    return { status: 'success', data: movieId };
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

// For duplicate script and manage studios thing
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
