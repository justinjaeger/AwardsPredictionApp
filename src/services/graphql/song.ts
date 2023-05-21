import {
  GetSongQuery,
  GetSongQueryVariables,
  CreateSongMutation,
  CreateSongMutationVariables,
  ListSongsQueryVariables,
  ListSongsQuery,
  UpdateSongMutation,
  UpdateSongMutationVariables,
  SongByMovieIdAndTitleQueryVariables,
  SongByMovieIdAndTitleQuery,
  DeleteSongMutation,
  DeleteSongMutationVariables,
} from '../../API';
import * as customMutations from '../../graphqlCustom/mutations';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

type iSongParams = {
  title: string;
  artist: string;
  movieId: string;
};

export const getSongById = async (id: string): Promise<iApiResponse<GetSongQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<GetSongQuery, GetSongQueryVariables>(
      customQueries.getSong,
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

// enforce songs being unique
export const getUniqueSongs = async (
  params: iSongParams,
): Promise<iApiResponse<SongByMovieIdAndTitleQuery>> => {
  const { title, movieId } = params;
  try {
    const { data, errors } = await GraphqlAPI<
      SongByMovieIdAndTitleQuery,
      SongByMovieIdAndTitleQueryVariables
    >(customQueries.songByMovieIdAndTitle, {
      movieId,
      title: { eq: title },
    });
    if (!data?.songByMovieIdAndTitle) {
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
    >(customMutations.createSong, { input: { title, artist, movieId } });
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
): Promise<iApiResponse<string>> => {
  try {
    // get songs with tmdbId + title
    const { data: maybeSongs } = await getUniqueSongs(params);
    if (!maybeSongs?.songByMovieIdAndTitle) {
      return { status: 'error' };
    }
    let songId = maybeSongs.songByMovieIdAndTitle.items[0]?.id || undefined;
    // if no movie exists with tmdbId, create one
    if (!songId) {
      const { data: newSong } = await createSong(params);
      const sId = newSong?.createSong?.id;
      if (!sId) {
        return { status: 'error' };
      }
      songId = sId;
    }
    return { status: 'success', data: songId };
  } catch (err) {
    return handleError('error getting or creating song', err);
  }
};

/**
 * FOR SCRIPTS ONLY
 */

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

export const deleteSongById = async (
  id: string,
): Promise<iApiResponse<DeleteSongMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      DeleteSongMutation,
      DeleteSongMutationVariables
    >(customMutations.deleteSong, { input: { id } });
    if (!data?.deleteSong) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting movie by id', err);
  }
};
