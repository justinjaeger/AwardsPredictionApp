import ApiServices from '../graphql';
import alertHelper from './alertHelper';

const deleteDuplicatedMovies = async () => {
  try {
    // Get contenders and songs

    // Get all contenders
    const allContenders: {
      id: string;
      movieId: string;
    }[] = [];
    let nextToken;
    while (nextToken !== null) {
      console.log('fetching contenders', allContenders.length);
      const { data: contenderData } = await ApiServices.listEveryContenderPaginated(
        nextToken,
      );
      const list = contenderData?.listContenders?.items || [];
      const formattedList = list.map((c) => ({
        id: c!.id,
        movieId: c!.movieId,
      }));
      allContenders.push(...formattedList);
      nextToken = contenderData?.listContenders?.nextToken;
    }
    console.log('allContenders', allContenders.length);

    // Get all songs
    const songRes = await ApiServices.listEverySong();
    const allSongs = songRes?.data?.listSongs?.items || [];
    console.log('allSongs', allSongs.length);

    // Get all movies
    const { data } = await ApiServices.getAllMovies();
    const movies = data?.listMovies?.items || [];
    console.log('allMovies', movies.length);

    // used to filter for contenders that include a movie id
    const getContendersByMovieId = (mId: string) =>
      allContenders.filter((c) => c.movieId === mId);

    // used to filter for contenders that include a movie id
    const getSongsByMovieId = (mId: string) =>
      allSongs.filter((s) => s && s.movieId === mId);

    // movies grouped by tmdbId
    const groupedMovies = (movies || []).reduce(
      (
        acc: {
          [key: string]: string[];
        },
        movie,
      ) => {
        if (!movie) return acc;
        const key = movie.tmdbId;
        if (!acc[key]) {
          acc[key] = [movie.id];
        } else {
          acc[key].push(movie.id);
        }
        return acc;
      },
      {},
    );

    const groupsOfDuplicateMovieIds = Object.values(groupedMovies).filter(
      (ids) => ids.length > 1,
    );
    console.log('groupsOfDuplicateMovieIds', groupsOfDuplicateMovieIds.length);

    const movieBatches = groupsOfDuplicateMovieIds.map((ids) => ({
      toKeepId: ids[0],
      toDeleteIds: ids.slice(1),
    }));

    // const oneMovieBatch = [movieBatches[0]];
    // console.log('oneMovieBatch', oneMovieBatch);

    alertHelper(
      `About to update songs, contenders, and delete movies from ${movieBatches.length} movies`,
      async () => {
        for (const batch of movieBatches) {
          // CHANGE BACK TO movieBatches WHEN READY

          const { toKeepId, toDeleteIds } = batch;
          console.log('toKeepId', toKeepId);
          console.log('toDeleteIds', toDeleteIds);

          for (const idToDelete of toDeleteIds) {
            console.log('idToDelete:', idToDelete);
            const contendersThatUseMovie = getContendersByMovieId(idToDelete);
            console.log('contendersThatUseMovie', contendersThatUseMovie.length);
            // go through each contender that uses movie and replace it with the "keeper"
            for (const contender of contendersThatUseMovie) {
              const { id: contenderId } = contender;
              console.log(
                'updating this contender:',
                contenderId,
                'with this movie:',
                toKeepId,
              );
              // THIS IS GOING TO SWITCH THE CONTENDER MOVIE FROM ONE TO ANOTHER (the keeper)
              const res1 = await ApiServices.updateContenderMovie(contenderId, toKeepId);
              if (res1.status === 'error') throw new Error('updateContenderMovie');
            }

            const songsThatUseMovie = getSongsByMovieId(idToDelete);
            console.log('songsThatUseMovie', songsThatUseMovie.length);
            // go through each song that uses the movie and replace it with the "keeper"
            for (const song of songsThatUseMovie) {
              const songId = song?.id;
              if (songId) {
                // THIS IS GOING TO SWITCH THE SONG MOVIE FROM ONE TO ANOTHER (the keeper)
                console.log('updating this song:', songId, 'with this movie:', toKeepId);
                const res2 = await ApiServices.updateSongMovie(songId, toKeepId);
                if (res2.status === 'error') throw new Error('updateSongMovie');
              }
            }

            // VERY IMPORTANT: Deleting the movie comes LAST

            // Delete the movie
            console.log('deleting this movie:', idToDelete);
            const res3 = await ApiServices.deleteMovieById(idToDelete);
            if (res3.status === 'error') throw new Error('deleteMovieById');
          }
        }
      },
    );
    // for (const batch of oneMovieBatch) {
    //   // CHANGE BACK TO movieBatches WHEN READY
    //   const { toKeepId, toDeleteIds } = batch;
    //   console.log('toKeepId', toKeepId);
    //   console.log('toDeleteIds', toDeleteIds);

    //   const oneId = [toDeleteIds[0]];
    //   console.log('oneId', oneId);
    //   for (const idToDelete of oneId) {
    //     console.log('idToDelete', idToDelete);
    //     // CHANGE BACK TO toDeleteIds WHEN READY
    //     const contendersThatUseMovie = getContendersByMovieId(idToDelete);
    //     console.log('contendersThatUseMovie', contendersThatUseMovie.length);
    //     // go through each contender that uses movie and replace it with the "keeper"
    //     for (const contender of contendersThatUseMovie) {
    //           const { id: contenderId } = contender;
    //           // THIS IS GOING TO SWITCH THE CONTENDER MOVIE FROM ONE TO ANOTHER (the keeper)
    //           await ApiServices.updateContenderMovie(contenderId, toKeepId);
    //         }

    //     const songsThatUseMovie = getSongsByMovieId(idToDelete);
    //     console.log('songsThatUseMovie', songsThatUseMovie.length);
    //     // go through each song that uses the movie and replace it with the "keeper"
    //     await alert(
    //       `Update Movies on ${contendersThatUseMovie.length} contenders?`,
    //       async () => {
    //         for (const song of songsThatUseMovie) {
    //           const songId = song?.id;
    //           if (songId) {
    //             // THIS IS GOING TO SWITCH THE SONG MOVIE FROM ONE TO ANOTHER (the keeper)
    //             await ApiServices.updateSongMovie(songId, toKeepId);
    //           }
    //         }
    //         console.log('done!');
    //       },
    //     );

    //     // Delete the movie
    //     await alert('Delete movie?', async () => {
    //       await ApiServices.deleteMovieById(idToDelete);
    //     });
    //   }
    // }
    console.log('done!');
  } catch (err) {
    console.error(JSON.stringify(err));
  }
};

export default deleteDuplicatedMovies;
