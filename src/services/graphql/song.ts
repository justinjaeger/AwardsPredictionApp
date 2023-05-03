import {
  GetSongQuery,
  GetSongQueryVariables,
  CreateSongMutation,
  CreateSongMutationVariables,
  ListSongsQueryVariables,
  ListSongsQuery,
  UpdateSongMutation,
  UpdateSongMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as customMutations from '../../graphqlCustom/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

type iSongParams = {
  title: string;
  artist: string;
  movieId: string;
};

export const getSong = async (id: string): Promise<iApiResponse<GetSongQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<GetSongQuery, GetSongQueryVariables>(
      queries.getSong,
      { id },
    );
    if (!data?.getSong) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting Song by id', err);
  }
};

/**
 * enforce songs being unique
 */
export const getUniqueSongs = async (
  params: iSongParams,
): Promise<iApiResponse<ListSongsQuery>> => {
  const { title, movieId } = params;
  try {
    const { data, errors } = await GraphqlAPI<ListSongsQuery, ListSongsQueryVariables>(
      customQueries.listSongs,
      {
        filter: {
          title: { eq: title },
          movieId: { eq: movieId },
        },
      },
    );
    if (!data?.listSongs) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting people by tmdb', err);
  }
};

export const createSong = async (
  params: iSongParams,
): Promise<iApiResponse<CreateSongMutation>> => {
  const { title, artist, movieId } = params;
  try {
    const { data, errors } = await GraphqlAPI<
      CreateSongMutation,
      CreateSongMutationVariables
    >(mutations.createSong, { input: { title, artist, movieId } });
    if (!data?.createSong) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating Song', err);
  }
};

/**
 * enforce tmdb being unique
 * check to see if movie is already stored (identified by tmdbId)
 */
export const getOrCreateSong = async (
  params: iSongParams,
): Promise<iApiResponse<GetSongQuery>> => {
  try {
    // get songs with tmdbId
    const { data: maybeSongs } = await getUniqueSongs(params);
    if (!maybeSongs?.listSongs) {
      return { status: 'error' };
    }
    let songId = maybeSongs.listSongs.items[0]?.id || undefined;
    // if no movie exists with tmdbId, create one
    if (!songId) {
      const { data: newSong } = await createSong(params);
      const sId = newSong?.createSong?.id;
      if (!sId) {
        return { status: 'error' };
      }
      songId = sId;
    }
    // finally, with existing or created movieId, get the movie
    const { data } = await getSong(songId);
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting or creating song', err);
  }
};

export const listEverySong = async (): Promise<iApiResponse<ListSongsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<ListSongsQuery, ListSongsQueryVariables>(
      customQueries.listEverySong,
    );
    if (!data?.listSongs) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting people by tmdb', err);
  }
};

export const updateSongMovie = async (
  songId: string,
  movieId: string,
): Promise<iApiResponse<UpdateSongMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UpdateSongMutation,
      UpdateSongMutationVariables
    >(customMutations.updateSong, {
      input: {
        id: songId,
        movieId,
      },
    });
    if (!data?.updateSong) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting people by tmdb', err);
  }
};
