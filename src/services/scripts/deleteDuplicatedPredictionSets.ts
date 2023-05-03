import ApiServices from '../graphql';
import alertHelper from './alertHelper';

type iPredictionSet = {
  id: string;
  userId: string;
  categoryId: string;
  createdAt: string;
};

const getUniquePredictionSetId = (userId: string, categoryId: string): string => {
  return userId + categoryId;
};

// delete predictionSets by whichever is NOT most recent
// Then delete their associated "predictions"
// TODO: Delete all history predictions
const deleteDuplicatedPredictionSets = async () => {
  try {
    // Get all personal predictions
    const predictions: {
      id: string;
      predictionSetId: string;
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
        predictionSetId: p!.predictionSetId,
      }));
      predictions.push(...formattedList);
      pNextToken = predictionData?.listPredictions?.nextToken;
    }
    console.log('predictions', predictions.length);

    // Get all prediction sets
    const predictionSets: iPredictionSet[] = [];
    let psNextToken;
    while (psNextToken !== null) {
      console.log('fetching prediction sets', predictionSets.length);
      const { data: psData } = await ApiServices.listEveryPersonalPredictionSet(
        psNextToken,
      );
      const list = psData?.listPredictionSets?.items || [];
      const formattedList = list.map((ps) => ({
        id: ps!.id,
        userId: ps!.userId,
        categoryId: ps!.categoryId,
        createdAt: ps!.createdAt,
      }));
      predictionSets.push(...formattedList);
      psNextToken = psData?.listPredictionSets?.nextToken;
    }
    console.log('predictionSets', predictionSets.length);

    // [predictionSetsThatShouldBeTheSame]: duplicatedPredictionSets[]
    const groupedPredictionSets = (predictionSets || []).reduce(
      (
        acc: {
          [key: string]: iPredictionSet[];
        },
        ps,
      ) => {
        if (!ps) return acc;
        // NOTE: When I reform the tables, id is movieId+categoryId+personId, and personId and songId, and those last 2 can just be null
        const key = getUniquePredictionSetId(ps.categoryId, ps.userId);
        if (!acc[key]) {
          acc[key] = [ps];
        } else {
          acc[key].push(ps);
        }
        return acc;
      },
      {},
    );

    const groupsOfDuplicates = Object.values(groupedPredictionSets).filter(
      (items) => items.length > 1,
    );
    console.log('groupsOfDuplicates', groupsOfDuplicates.length);

    // assign toKeepId to the contender we're keeping (most recent); the rest we can delete
    const psBatches = groupsOfDuplicates.map((sets) => {
      // sort sets from most recent date to least recent
      const sortedSets = sets.sort((a, b) => {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);
        return bDate.getTime() - aDate.getTime();
      });
      console.log('sortedSets', sortedSets);
      const ids = sortedSets.map((s) => s.id);

      return { toKeepId: ids[0], toDeleteIds: ids.slice(1) };
    });

    const getPredictionsByPredictionSetId = (psId: string) => {
      return predictions.filter((p) => p && p.predictionSetId === psId);
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
      `About to delete prediction sets, and their predictions from ${psBatches.length} ps batches`,
      async () => {
        for (const batch of psBatches) {
          const { toKeepId, toDeleteIds } = batch;
          console.log('toKeepId', toKeepId);
          console.log('toDeleteIds', toDeleteIds);

          for (const idToDelete of toDeleteIds) {
            console.log('idToDelete:', idToDelete);
            const predictionsThatUsePs = getPredictionsByPredictionSetId(idToDelete);
            console.log('predictionsThatUsePs', predictionsThatUsePs.length);
            // go through each contender that uses movie and replace it with the "keeper"
            for (const prediction of predictionsThatUsePs) {
              const { id: predictionId } = prediction;
              console.log('deleting this prediction:', predictionId);
              // THIS IS GOING TO DELETE PREDICTION
              const res1 = await ApiServices.deletePersonalPrediction(predictionId);
              if (res1.status === 'error') throw new Error('updateContenderMovie');
            }

            // DELETE THE PREDICTION SET
            console.log('deleting this prediction set:', idToDelete);
            const res3 = await ApiServices.deletePersonalPredictionSet(idToDelete);
            if (res3.status === 'error') throw new Error('deletePersonalPredictionSet');
          }
        }
        console.log('done!');
      },
    );
  } catch (err) {
    console.log(JSON.stringify(err));
  }
};

export default deleteDuplicatedPredictionSets;
