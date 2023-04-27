import ApiServices from '../graphql';
import alertHelper from './alertHelper';

const getUniqueContenderId = (
  categoryId: string,
  movieId: string,
  personId?: string | undefined,
  songId?: string | undefined,
): string => {
  return categoryId + movieId + (personId || '') + (songId || '');
};

// NOT COMPLETE!
const deleteDuplicatedContenders = async () => {
  try {
    // Get all personal predictions
    const predictions: {
      id: string;
      contenderId: string;
    }[] = [];
    let pNextToken;
    while (pNextToken !== null) {
      console.log('fetching predictions', predictions.length);
      const { data: predictionData } = await ApiServices.listEveryPersonalPrediction(
        pNextToken,
      );
      const list = predictionData?.listPredictions?.items || [];
      const formattedList = list.map((p) => ({
        id: p!.id,
        contenderId: p!.contenderId,
      }));
      predictions.push(...formattedList);
      pNextToken = predictionData?.listPredictions?.nextToken;
    }
    console.log('predictions', predictions.length);

    // Get all contenders
    const contenders: {
      id: string;
      movieId: string;
      categoryId: string;
      personId?: string | null;
      songId?: string | null;
    }[] = [];
    let cNextToken;
    while (cNextToken !== null) {
      console.log('fetching contenders', contenders.length);
      const { data: contenderData } = await ApiServices.listEveryContenderPaginated(
        cNextToken,
      );
      const list = contenderData?.listContenders?.items || [];
      const formattedList = list.map((c) => ({
        id: c!.id,
        movieId: c!.movieId,
        categoryId: c!.categoryId,
        personId: c?.personId,
        songId: c?.songId,
      }));
      contenders.push(...formattedList);
      cNextToken = contenderData?.listContenders?.nextToken;
    }
    console.log('contenders', contenders.length);

    // [contendersThatShouldBeTheSame]: duplicatedContenderIds[]
    const groupedContenders = (contenders || []).reduce(
      (
        acc: {
          [key: string]: string[];
        },
        contender,
      ) => {
        if (!contender) return acc;
        // NOTE: When I reform the tables, id is movieId+categoryId+personId, and personId and songId, and those last 2 can just be null
        const key = getUniqueContenderId(
          contender.categoryId,
          contender.movieId,
          contender.personId || undefined,
          contender.songId || undefined,
        );
        if (!acc[key]) {
          acc[key] = [contender.id];
        } else {
          acc[key].push(contender.id);
        }
        return acc;
      },
      {},
    );

    const groupsOfDuplicateContenderIds = Object.values(groupedContenders).filter(
      (ids) => ids.length > 1,
    );
    console.log('groupsOfDuplicateContenderIds', groupsOfDuplicateContenderIds.length);

    // assign toKeepId to the contender we're keeping (first in list); the rest we can "delete" and replace with "toKeepId" in all used instances
    const contenderBatches = groupsOfDuplicateContenderIds.map((ids) => ({
      toKeepId: ids[0],
      toDeleteIds: ids.slice(1),
    }));

    const getPredictionsByContenderId = (contenderId: string) => {
      return predictions.filter((p) => p && p.contenderId === contenderId);
    };

    /**
     * What uses contenderId:
     * - Prediction
     * - HistoryPrediction
     * - CommunityPrediction
     * - CommunityHistoryPrediction
     * - We COULD just delete all historyPrediction and communityHistoryPrediction
     * - CommunityPrediction gets overwritten every hour anyway so don't need to do anything there
     * - *** Really only need to do something for Prediction
     * - But, I think I'll just overwrite History stuff if it's not a fuck ton. Though I know it will be a fuckton.
     * - If I don't, I'll have to write a "delete all" script
     */
    alertHelper(
      `About to update predictions, and delete contenders from ${contenderBatches.length} contender batches`,
      async () => {
        for (const batch of contenderBatches) {
          const { toKeepId, toDeleteIds } = batch;
          console.log('toKeepId', toKeepId);
          console.log('toDeleteIds', toDeleteIds);

          for (const idToDelete of toDeleteIds) {
            console.log('idToDelete:', idToDelete);
            const predictionsThatUseContender = getPredictionsByContenderId(idToDelete);
            console.log(
              'predictionsThatUseContender',
              predictionsThatUseContender.length,
            );
            // go through each contender that uses movie and replace it with the "keeper"
            for (const prediction of predictionsThatUseContender) {
              const { id: predictionId } = prediction;
              console.log(
                'updating this prediction:',
                predictionId,
                'with this contender:',
                toKeepId,
              );
              // THIS IS GOING TO SWITCH THE CONTENDER MOVIE FROM ONE TO ANOTHER (the keeper)
              const res1 = await ApiServices.updatePredictionContender(
                predictionId,
                toKeepId,
              );
              if (res1.status === 'error') throw new Error('updateContenderMovie');
            }

            // VERY IMPORTANT: Deleting the movie comes LAST

            // Delete the movie
            console.log('deleting this contender:', idToDelete);
            const res3 = await ApiServices.deleteContenderById(idToDelete);
            if (res3.status === 'error') throw new Error('deleteContenderById');
          }
        }
      },
    );
  } catch (err) {
    console.error(JSON.stringify(err));
  }
};

export default deleteDuplicatedContenders;
