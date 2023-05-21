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

// TODO: Delete all history predictions after running this
const deleteDuplicatedContenders = async () => {
  try {
    // Get all CONTEDERS
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
      const {
        data: contenderData,
        status,
      } = await ApiServices.listEveryContenderPaginated(cNextToken);
      if (status === 'error') throw new Error('listEveryContenderPaginated');
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

    // Get all PERSONAL PREDICTIONS
    const predictions: {
      id: string;
      contenderId: string;
    }[] = [];
    let pNextToken;
    while (pNextToken !== null) {
      console.log('fetching predictions', predictions.length);
      const {
        data: predictionData,
        status,
      } = await ApiServices.listEveryPersonalPrediction(pNextToken);
      if (status === 'error') throw new Error('listEveryPersonalPrediction');
      const list = predictionData?.listPredictions?.items || [];
      const formattedList = list.map((p) => ({
        id: p!.id,
        contenderId: p!.contenderId,
      }));
      predictions.push(...formattedList);
      pNextToken = predictionData?.listPredictions?.nextToken;
    }
    console.log('predictions', predictions.length);

    // PERSONAL - get all instances where personal predictions are referring to a contender that doesn't exist
    const invalidPredictions = predictions.filter(
      (p) => !contenders.find((c) => c.id === p.contenderId),
    );
    console.log('invalidPredictions', invalidPredictions.length);
    // offer to delete them
    if (invalidPredictions.length > 0) {
      alertHelper(
        `Found ${invalidPredictions.length} predictions that point to now-deleted contenders. Delete?`,
        async () => {
          await Promise.all(
            invalidPredictions.map((p) => ApiServices.deletePersonalPrediction(p.id)),
          ).catch(() => {
            throw new Error('deletePersonalPrediction');
          });
        },
      );
      return; // let it be the only thing that happens
    }

    // Get all PERSONAL HISTORY PREDICTIONS
    const historyPredictions: {
      id: string;
      contenderId: string;
    }[] = [];
    let hpNextToken;
    while (hpNextToken !== null) {
      console.log('fetching history predictions', historyPredictions.length);
      const {
        data: predictionData,
        status,
      } = await ApiServices.listEveryPersonalHistoryPrediction(hpNextToken);
      if (status === 'error') throw new Error('listEveryPersonalHistoryPrediction');
      const list = predictionData?.listHistoryPredictions?.items || [];
      const formattedList = list.map((p) => ({
        id: p!.id,
        contenderId: p!.contenderId,
      }));
      historyPredictions.push(...formattedList);
      hpNextToken = predictionData?.listHistoryPredictions?.nextToken;
    }
    console.log('historyPredictions', historyPredictions.length);

    // PERSONAL HISTORY - get all instances where personal history predictions are referring to a contender that doesn't exist
    const invalidPersonalHistoryPredictions = historyPredictions.filter(
      (p) => !contenders.find((c) => c.id === p.contenderId),
    );
    console.log(
      'invalidPersonalHistoryPredictions',
      invalidPersonalHistoryPredictions.length,
    );
    // offer to delete them
    if (invalidPersonalHistoryPredictions.length > 0) {
      alertHelper(
        `Found ${invalidPersonalHistoryPredictions.length} personal history predictions that point to now-deleted contenders. Delete?`,
        async () => {
          await Promise.all(
            invalidPersonalHistoryPredictions.map((p) =>
              ApiServices.deletePersonalHistoryPrediction(p.id),
            ),
          ).catch(() => {
            throw new Error('deletePersonalHistoryPrediction');
          });
        },
      );
      return; // let it be the only thing that happens
    }

    // Get all COMMUNITY PREDICTIONS
    const communityPredictions: {
      id: string;
      contenderId: string;
    }[] = [];
    let cpNextToken;
    while (cpNextToken !== null) {
      console.log('fetching communityPredictions', communityPredictions.length);
      const {
        data: predictionData,
        status,
      } = await ApiServices.listEveryCommunityPrediction(cpNextToken);
      if (status === 'error') throw new Error('listEveryCommunityPrediction');
      const list = predictionData?.listCommunityPredictions?.items || [];
      const formattedList = list.map((p) => ({
        id: p!.id,
        contenderId: p!.contenderId,
      }));
      communityPredictions.push(...formattedList);
      cpNextToken = predictionData?.listCommunityPredictions?.nextToken;
    }
    console.log('communityPredictions', communityPredictions.length);

    // COMMUNITY - get all instances where community predictions are referring to a contender that doesn't exist
    const invalidCommunityPredictions = communityPredictions.filter(
      (p) => !contenders.find((c) => c.id === p.contenderId),
    );
    console.log('invalidCommunityPredictions', invalidCommunityPredictions.length);
    // offer to delete them
    if (invalidCommunityPredictions.length > 0) {
      alertHelper(
        `Found ${invalidCommunityPredictions.length} community predictions that point to now-deleted contenders. Delete?`,
        async () => {
          await Promise.all(
            invalidCommunityPredictions.map((p) =>
              ApiServices.deleteCommunityPrediction(p.id),
            ),
          ).catch(() => {
            throw new Error('deleteCommunityPrediction');
          });
        },
      );
      return; // let it be the only thing that happens
    }

    // Get all COMMUNITY HISTORY PREDICTIONS
    const communityHistoryPredictions: {
      id: string;
      contenderId: string;
    }[] = [];
    let chNextToken;
    while (chNextToken !== null) {
      console.log(
        'fetching communityHistoryPredictions',
        communityHistoryPredictions.length,
      );
      const {
        data: predictionData,
        status,
      } = await ApiServices.listEveryCommunityHistoryPrediction(chNextToken);
      if (status === 'error') throw new Error('listEveryCommunityHistoryPrediction');
      const list = predictionData?.listCommunityHistoryPredictions?.items || [];
      const formattedList = list.map((p) => ({
        id: p!.id,
        contenderId: p!.contenderId,
      }));
      communityHistoryPredictions.push(...formattedList);
      chNextToken = predictionData?.listCommunityHistoryPredictions?.nextToken;
    }
    console.log('communityHistoryPredictions', communityHistoryPredictions.length);

    // COMMUNITY HISTORY - get all instances where community history predictions are referring to a contender that doesn't exist
    const invalidCommunityHistoryPredictions = communityHistoryPredictions.filter(
      (p) => !contenders.find((c) => c.id === p.contenderId),
    );
    console.log(
      'invalidCommunityHistoryPredictions',
      invalidCommunityHistoryPredictions.length,
    );
    // offer to delete them
    if (invalidCommunityHistoryPredictions.length > 0) {
      alertHelper(
        `Found ${invalidCommunityHistoryPredictions.length} community history predictions that point to now-deleted contenders. Delete?`,
        async () => {
          await Promise.all(
            invalidCommunityHistoryPredictions.map((p) =>
              ApiServices.deleteCommunityHistoryPrediction(p.id),
            ),
          ).catch(() => {
            throw new Error('deleteCommunityHistoryPrediction');
          });
        },
      );
      return; // let it be the only thing that happens
    }

    // [contendersThatShouldBeTheSame]: duplicatedContenderIds[]
    const groupedContenders = (contenders || []).reduce(
      (
        acc: {
          [key: string]: string[];
        },
        contender,
      ) => {
        if (!contender) return acc;
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

    const getPredictionsByContenderId = (
      contenderId: string,
      ps: {
        id: string;
        contenderId: string;
      }[],
    ) => {
      return ps.filter((p) => p && p.contenderId === contenderId);
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

            // PERSONAL PREDICTIONS
            const predictionsThatUseContender = getPredictionsByContenderId(
              idToDelete,
              predictions,
            );
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
              if (res1.status === 'error') throw new Error('updatePredictionContender');
            }

            // PERSONAL HISTORY PREDICTIONS
            const historyPredictionsThatUseContender = getPredictionsByContenderId(
              idToDelete,
              historyPredictions,
            );
            console.log(
              'historyPredictionsThatUseContender',
              historyPredictionsThatUseContender.length,
            );
            // go through each contender that uses movie and replace it with the "keeper"
            for (const prediction of historyPredictionsThatUseContender) {
              const { id: predictionId } = prediction;
              console.log(
                'updating this prediction:',
                predictionId,
                'with this contender:',
                toKeepId,
              );
              // THIS IS GOING TO SWITCH THE CONTENDER MOVIE FROM ONE TO ANOTHER (the keeper)
              const res1 = await ApiServices.updateHistoryPredictionContender(
                predictionId,
                toKeepId,
              );
              if (res1.status === 'error')
                throw new Error('updateHistoryPredictionContender');
            }

            // COMMUNITY PREDICTIONS
            const communityPredictionsThatUseContender = getPredictionsByContenderId(
              idToDelete,
              communityPredictions,
            );
            console.log(
              'communityPredictionsThatUseContender',
              communityPredictionsThatUseContender.length,
            );
            // go through each contender that uses movie and replace it with the "keeper"
            for (const prediction of communityPredictionsThatUseContender) {
              const { id: predictionId } = prediction;
              console.log(
                'updating this prediction:',
                predictionId,
                'with this contender:',
                toKeepId,
              );
              // THIS IS GOING TO SWITCH THE CONTENDER MOVIE FROM ONE TO ANOTHER (the keeper)
              const res1 = await ApiServices.updateCommunityPredictionContender(
                predictionId,
                toKeepId,
              );
              if (res1.status === 'error')
                throw new Error('communityPredictionsThatUseContender');
            }

            // COMMUNITY HISTORY PREDICTIONS
            const communityHistoryPredictionsThatUseContender = getPredictionsByContenderId(
              idToDelete,
              communityHistoryPredictions,
            );
            console.log(
              'communityHistoryPredictionsThatUseContender',
              communityHistoryPredictionsThatUseContender.length,
            );
            // go through each contender that uses movie and replace it with the "keeper"
            for (const prediction of communityHistoryPredictionsThatUseContender) {
              const { id: predictionId } = prediction;
              console.log(
                'updating this prediction:',
                predictionId,
                'with this contender:',
                toKeepId,
              );
              // THIS IS GOING TO SWITCH THE CONTENDER MOVIE FROM ONE TO ANOTHER (the keeper)
              const res1 = await ApiServices.updateCommunityHistoryPredictionContender(
                predictionId,
                toKeepId,
              );
              if (res1.status === 'error')
                throw new Error('communityHistoryPredictionsThatUseContender');
            }

            // VERY IMPORTANT: Deleting the contender comes LAST

            // Delete the contender
            console.log('deleting this contender:', idToDelete);
            const res3 = await ApiServices.deleteContenderById(idToDelete);
            if (res3.status === 'error') throw new Error('deleteContenderById');
          }
        }
      },
    );
    console.log('done!');
  } catch (err) {
    console.error(JSON.stringify(err));
  }
};

export default deleteDuplicatedContenders;
