import { handleError, iApiResponse } from '../utils';
import { DataStore } from 'aws-amplify';
import { Movie, Song } from '../../models';
import { getSongKey, compareSongKeys } from '../../util/songKeys';

/**
 * enforce tmdb being unique
 * check to see if person is already stored (identified by tmdbId)
 */
export const getOrCreateSong = async (
  title: string,
  artist: string,
  movie: Movie,
): Promise<iApiResponse<Song>> => {
  try {
    const key = getSongKey(title, movie.tmdbId);
    // get songs associated with movie. Compare keys to see if song already exists
    const maybeSongs = (
      await DataStore.query(Song, (s) => {
        return s.songMovieId('eq', movie.id);
      })
    ).filter((s) => {
      const k = getSongKey(s.title, s.movie.tmdbId);
      return compareSongKeys(key, k); // returns t/f
    });
    let song = maybeSongs.length > 0 ? maybeSongs[0] : undefined;
    if (!song) {
      song = await DataStore.save(
        new Song({ movie, title, artist, songMovieId: movie.id }),
      );
    }
    return { status: 'success', data: song };
  } catch (err) {
    return handleError('error fetching person by tmdbId', err);
  }
};
