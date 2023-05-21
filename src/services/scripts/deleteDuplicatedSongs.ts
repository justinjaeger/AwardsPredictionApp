import ApiServices from '../graphql';
import alertHelper from './alertHelper';

const getUniqueSong = (movieId: string, title?: string | undefined): string => {
  return movieId + title;
};

const deleteDuplicatedSongs = async () => {
  try {
    // Get all contenders
    const allContenders: {
      id: string;
      movieId: string;
      songId: string | null;
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
        songId: c!.songId || null,
      }));
      allContenders.push(...formattedList);
      nextToken = contenderData?.listContenders?.nextToken;
    }
    console.log('allContenders', allContenders.length);

    // Get all songs
    const songRes = await ApiServices.listEverySong();
    const allSongs = songRes?.data?.listSongs?.items || [];
    console.log('allSongs', allSongs.length);

    // movies grouped by tmdbId
    const groupedSongs = (allSongs || []).reduce(
      (
        acc: {
          [key: string]: string[];
        },
        song,
      ) => {
        if (!song) return acc;
        // NOTE: When I reform the tables, id is movieId+categoryId+personId, and personId and songId, and those last 2 can just be null
        const key = getUniqueSong(song.movieId, song.title || undefined);
        if (!acc[key]) {
          acc[key] = [song.id];
        } else {
          acc[key].push(song.id);
        }
        return acc;
      },
      {},
    );

    const groupsOfDuplicateSongIds = Object.values(groupedSongs).filter(
      (ids) => ids.length > 1,
    );
    console.log('groupsOfDuplicateSongIds', groupsOfDuplicateSongIds.length);

    const songBatches = groupsOfDuplicateSongIds.map((ids) => ({
      toKeepId: ids[0],
      toDeleteIds: ids.slice(1),
    }));

    const oneSongBatch = [songBatches[0]];
    console.log('songBatches', oneSongBatch);

    // used to filter for contenders that include a movie id
    const getContendersBySongId = (sId: string) =>
      allContenders.filter((c) => c.songId === sId);

    alertHelper(
      `About to update songs + contenders from ${songBatches.length} songs`,
      async () => {
        for (const batch of songBatches) {
          // CHANGE BACK TO movieBatches WHEN READY

          const { toKeepId, toDeleteIds } = batch;
          console.log('toKeepId', toKeepId);
          console.log('toDeleteIds', toDeleteIds);

          for (const idToDelete of toDeleteIds) {
            console.log('idToDelete:', idToDelete);
            const contendersThatUseSong = getContendersBySongId(idToDelete);
            console.log('contendersThatUseSong', contendersThatUseSong.length);
            // go through each contender that uses movie and replace it with the "keeper"
            for (const contender of contendersThatUseSong) {
              const { id: contenderId } = contender;
              console.log(
                'updating this contender:',
                contenderId,
                'with this song:',
                toKeepId,
              );
              // THIS IS GOING TO SWITCH THE CONTENDER MOVIE FROM ONE TO ANOTHER (the keeper)
              const res1 = await ApiServices.updateContenderSong(contenderId, toKeepId);
              if (res1.status === 'error') throw new Error('updateContenderSong');
            }

            // VERY IMPORTANT: Deleting the movie comes LAST

            // Delete the movie
            console.log('deleting this song:', idToDelete);
            const res3 = await ApiServices.deleteSongById(idToDelete);
            if (res3.status === 'error') throw new Error('deleteSongById');
          }
        }
        console.log('done!');
      },
    );
  } catch (err) {
    console.error(JSON.stringify(err));
  }
};

export default deleteDuplicatedSongs;
