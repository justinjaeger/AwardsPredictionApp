const fetch = require('node-fetch').default;
const { isWithinLastMonth, getPredictionType } = require('./utils');
const {
  getOpenEventsRequest,
  getAllEventContendersRequest,
  getCommunityPredictionSetsRequest,
  createCommunityPredictionSet,
  createCommunityPrediction,
  createCommunityHistoryPredictionSet,
  createCommunityHistoryPrediction,
  deleteCommunityPredictionSet,
  deleteCommunityPrediction,
} = require('./requests');

const getOpenEventIds = async () => {
  console.log('getOpenEventIds');

  let response;
  let body;
  try {
    response = await fetch(getOpenEventsRequest);
    body = await response.json();
    if (body.errors) throw new Error();
    const openEvents = body.data.listEvents.items.reduce((acc, event) => {
      // if predictionType is null, it indicates we don't want to create community predictions, so leave it out
      const predictionType = getPredictionType(event.status);
      if (predictionType) {
        acc.push({
          id: event.id,
          type: predictionType,
        });
      }
      return acc;
    }, []);
    console.log('openEvents', openEvents);
    return {
      status: 'success',
      data: { openEvents },
    };
  } catch (error) {
    return {
      status: 'error',
      data: {
        errors: [
          {
            status: response.status,
            message: error.message,
            stack: error.stack,
          },
        ],
      },
    };
  }
};

const getContendersByEventIds = async (eventIds) => {
  console.log('getContendersByEventIds');

  let response;
  let body;
  /**
   * ts: {
   *    [eventId: string]: {
   *        [categoryId: string]: {
   *            [contenderId: string]: {
   *                [ranking: number]: number
   *            }
   *        }
   *    }
   * }
   */
  const indexedRankings = {};
  // request for all contenders
  try {
    for (const eventId of eventIds) {
      // Request all contenders per event
      //   const req = getAllEventContendersRequest(eventId);
      //   console.log('req', req);
      response = await fetch(getAllEventContendersRequest(eventId));
      body = await response.json();
      if (body.errors) throw new Error();
      // index rankings by eventId, categoryId, and ranking. Tracks of how many people are predicting at each ranking
      // Loop through all contenders
      const contenders = body.data.listContenders.items;
      contenders.forEach((contender) => {
        const eventId = contender.eventContendersId;
        const categoryId = contender.categoryContendersId;
        const contenderId = contender.id;
        // if hidden, don't include
        if (contender.visibility === 'HIDDEN') return;
        // Create space entry if it doesn't exist
        if (!indexedRankings[eventId]) {
          indexedRankings[eventId] = {};
        }
        if (!indexedRankings[eventId][categoryId]) {
          indexedRankings[eventId][categoryId] = {};
        }
        if (!indexedRankings[eventId][categoryId][contenderId]) {
          indexedRankings[eventId][categoryId][contenderId] = {};
        }
        // Loop through all predictions and tally rankings
        const predictions = contender.predictions.items;
        predictions.forEach((prediction) => {
          // Only include if prediction was created in the last month
          const lastUpdated = prediction?.createdAt || '';
          const isRecentPrediction = isWithinLastMonth(lastUpdated);
          if (isRecentPrediction) {
            // Tally prediction ranking to "rankings" total
            // indexedRankings[eventId][categoryId][ranking] = tally
            const someUsersRanking = prediction?.ranking || 0;
            // don't include rankings higher than 20
            if (someUsersRanking > 20) return;
            // if ranking doesn't exist, initialize it to zero
            if (!indexedRankings[eventId][categoryId][contenderId][someUsersRanking]) {
              indexedRankings[eventId][categoryId][contenderId][someUsersRanking] = 0;
            }
            // tally ranking
            indexedRankings[eventId][categoryId][contenderId][someUsersRanking] += 1;
          }
        });
      });
    }
    return {
      status: 'success',
      data: { indexedRankings },
    };
  } catch (error) {
    return {
      status: 'error',
      data: {
        errors: [
          {
            status: response.status,
            message: error.message,
            stack: error.stack,
          },
        ],
      },
    };
  }
};

const getPredictionSetIds = async (eventIds) => {
  console.log('getPredictionSetIds');

  let response;
  let body;
  const formerPredictionSetIds = [];
  const formerPredictionIds = [];

  // request for all contenders
  try {
    for (const eventId of eventIds) {
      response = await fetch(getCommunityPredictionSetsRequest(eventId));
      body = await response.json();
      if (body.errors) throw new Error();
      const predictionSets = body.data.listCommunityPredictionSets.items;
      // add to formerPredictionSetIds
      predictionSets.forEach((predictionSet) => {
        formerPredictionSetIds.push(predictionSet.id);
      });
      // loop through predictionSets and extract predictionIds
      predictionSets.forEach((predictionSet) => {
        const predictions = predictionSet.predictions.items;
        predictions.forEach((prediction) => {
          formerPredictionIds.push(prediction.id);
        });
      });
    }
    console.log('formerPredictionSetIds', formerPredictionSetIds.length);
    console.log('formerPredictionIds', formerPredictionIds.length);

    return {
      status: 'success',
      data: { formerPredictionSetIds, formerPredictionIds },
    };
  } catch (error) {
    return {
      status: 'error',
      data: {
        errors: [
          {
            status: response.status,
            message: error.message,
            stack: error.stack,
          },
        ],
      },
    };
  }
};

/**
 * creates new communityPredictionSet and corresponding predictions
 * also creates historyPredictionSet if createHistoryRecord = true
 * indexedRankings: {
 *    [eventId: string]: {
 *        [categoryId: string]: {
 *            [contenderId: string]: {
 *                [ranking: number]: number
 *            }
 *        }
 *    }
 * }
 * openEvents = { id: string, type: 'NOMINATION' | 'WIN' }[]
 */
const createCommunityPredictions = async (
  indexedRankings = {},
  openEvents = [],
  createHistoryRecord = false,
) => {
  console.log('createCommunityPredictions');

  let responses;
  let body;

  try {
    // prepare createPredictionSet requests
    const createPredictionSetPromises = [];
    const createHistoryPredictionSetPromises = [];
    for (const [eventId, indexedCategories] of Object.entries(indexedRankings)) {
      // get the event type (NOMINATION or WIN)
      const event = openEvents.find((event) => event.id === eventId);
      const eventType = event?.type || 'NOMINATION';
      for (const [categoryId] of Object.entries(indexedCategories)) {
        const req = fetch(createCommunityPredictionSet(eventId, categoryId, eventType));
        createPredictionSetPromises.push(req);
        if (createHistoryRecord) {
          const req = fetch(
            createCommunityHistoryPredictionSet(eventId, categoryId, eventType),
          );
          createHistoryPredictionSetPromises.push(req);
        }
      }
    }

    // create all predictionSets in parallel
    responses = await Promise.all(createPredictionSetPromises);
    console.log('createPredictionSetPromises responses:', responses.length);

    // prepare createPrediction requests
    const createPredictionPromises = [];
    for (const response of responses) {
      body = await response.json();
      // get params from body
      const predictionSet = body.data.createCommunityPredictionSet;
      const predictionSetId = predictionSet.id;
      const eventId = predictionSet.eventId;
      const categoryId = predictionSet.communityPredictionSetCategoryId;
      // push createPrediction requests to array
      const indexedContenders = indexedRankings[eventId][categoryId];
      for (const [contenderId, indexedRankings] of Object.entries(indexedContenders)) {
        createPredictionPromises.push(
          fetch(createCommunityPrediction(predictionSetId, contenderId, indexedRankings)),
        );
      }
    }

    // create all predictions in parallel
    responses = await Promise.allSettled(createPredictionPromises);
    console.log('createPredictionPromises response:', responses.length);

    // create history predictions
    if (createHistoryRecord) {
      // create history prediction sets
      responses = await Promise.all(createHistoryPredictionSetPromises);
      console.log('createHistoryPredictionSetPromises responses:', responses.length);

      // prepare createHistoryPrediction requests
      const createHistoryPredictionPromises = [];
      for (const response of responses) {
        body = await response.json();
        // get params from body
        const predictionSet = body.data.createCommunityHistoryPredictionSet;
        const predictionSetId = predictionSet.id;
        const eventId = predictionSet.eventId;
        const categoryId = predictionSet.communityHistoryPredictionSetCategoryId;
        // push createPrediction requests to array
        const indexedContenders = indexedRankings[eventId][categoryId];
        for (const [contenderId, indexedRankings] of Object.entries(indexedContenders)) {
          createHistoryPredictionPromises.push(
            fetch(
              createCommunityHistoryPrediction(
                predictionSetId,
                contenderId,
                indexedRankings,
              ),
            ),
          );
        }
      }

      // create history predictions in parallel
      responses = await Promise.allSettled(createHistoryPredictionPromises);
      console.log('createHistoryPredictionPromises response:', responses.length);
    }

    return {
      status: 'success',
    };
  } catch (error) {
    return {
      status: 'error',
      data: {
        errors: [
          {
            status: 'error',
            message: error.message,
            stack: error.stack,
          },
        ],
      },
    };
  }
};

const deletePreviousCommunityPredictions = async (
  formerPredictionSetIds,
  formerPredictionIds,
) => {
  console.log('deletePreviousCommunityPredictions');
  let response;

  try {
    // Have to delete predictions first, then predictionSets
    const deletePredictionPromises = [];
    for (const predictionId of formerPredictionIds) {
      deletePredictionPromises.push(fetch(deleteCommunityPrediction(predictionId)));
    }
    response = await Promise.allSettled(deletePredictionPromises);
    console.log('deletePredictionPromises response:', response.length);
    const deletePredictionSetPromises = [];
    for (const predictionSetId of formerPredictionSetIds) {
      deletePredictionSetPromises.push(
        fetch(deleteCommunityPredictionSet(predictionSetId)),
      );
    }
    response = await Promise.allSettled(deletePredictionSetPromises);
    console.log('deletePredictionSetPromises response:', response.length);
    return {
      status: 'success',
    };
  } catch (error) {
    return {
      status: 'error',
      data: {
        errors: [
          {
            status: response.status,
            message: error.message,
            stack: error.stack,
          },
        ],
      },
    };
  }
};

module.exports = {
  getOpenEventIds,
  getContendersByEventIds,
  getPredictionSetIds,
  createCommunityPredictions,
  deletePreviousCommunityPredictions,
};
