const fetch = require('node-fetch').default;
const { isWithinLastMonth, getContenderRank } = require('./utils');
const {
  getOpenEventsRequest,
  predictionSetByEventIdRequest,
  communityPredictionSetByEventIdRequest,
  createCommunityPredictionSet,
  createCommunityPrediction,
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
    if (body.errors) throw new Error(JSON.stringify(body.errors));
    const openEvents = body.data.listEvents.items;
    console.log('openEvents', openEvents);
    return {
      status: 'success',
      data: { openEvents },
    };
  } catch (error) {
    console.log('error', error);
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

const getFormerCommunityPredictions = async (eventIds) => {
  console.log('getFormerCommunityPredictions');

  let response;
  let body;
  const formerPredictionSetIds = [];
  const formerPredictionIds = [];

  try {
    for (const eventId of eventIds) {
      response = await fetch(communityPredictionSetByEventIdRequest(eventId));
      body = await response.json();
      if (body.errors) throw new Error(JSON.stringify(body.errors));
      const predictionSets = body.data.communityPredictionSetByEventId.items;
      // add to formerPredictionSetIds
      predictionSets.forEach((predictionSet) => {
        formerPredictionSetIds.push(predictionSet.id);
        const predictions = predictionSet.predictions.items;
        predictions.forEach((prediction) => {
          // extract prediction ids
          formerPredictionIds.push(prediction.id);
        });
      });
    }
    return {
      status: 'success',
      data: { formerPredictionSetIds, formerPredictionIds },
    };
  } catch (error) {
    console.log('error', error);
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

const getPredictions = async (eventIds) => {
  console.log('getPredictions');

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

  // request for all prediction sets with openEventIds
  try {
    for (const eventId of eventIds) {
      // Create space for entry if it doesn't exist
      if (!indexedRankings[eventId]) {
        indexedRankings[eventId] = {};
      }
      response = await fetch(predictionSetByEventIdRequest(eventId));
      body = await response.json();
      if (body.errors) throw new Error(JSON.stringify(body.errors));
      const predictionSets = body.data.predictionSetByEventId.items;
      // add to formerPredictionSetIds
      predictionSets.forEach((predictionSet) => {
        const categoryId = predictionSet.categoryId;
        // Create space entry if it doesn't exist
        if (!indexedRankings[eventId][categoryId]) {
          indexedRankings[eventId][categoryId] = {};
        }
        const predictions = predictionSet.predictions.items;
        predictions.forEach((prediction) => {
          // add to indexed rankings
          const { contenderId, contender, ranking: _ranking, createdAt } = prediction;
          const ranking = _ranking || 0; // make sure ranking is a number
          // don't include hidden contenders in tally
          // don't include rankings higher than 20
          // don't include if prediction is more than a month old
          const isHidden = contender.visibility === 'HIDDEN';
          const isLowOnList = ranking > 20;
          const isRecentPrediction = isWithinLastMonth(createdAt);
          if (isHidden || isLowOnList || !isRecentPrediction) {
            return;
          }
          // Create space for contender entry if it doesn't exist
          if (!indexedRankings[eventId][categoryId][contenderId]) {
            indexedRankings[eventId][categoryId][contenderId] = {};
          }
          // if ranking doesn't exist, initialize to zero
          if (!indexedRankings[eventId][categoryId][contenderId][ranking]) {
            indexedRankings[eventId][categoryId][contenderId][ranking] = 0;
          }
          // tally user's ranking
          indexedRankings[eventId][categoryId][contenderId][ranking] += 1;
        });
      });
    }

    /**
     * ts: {
     *   [categoryId: string]: {
     *     [contenderId: string]: points
     *   }
     * }
     */
    const contenderPoints = {};
    // calculate relative ranking
    // loop through all contenders in category
    // calculate point values for each contender and assign them
    for (const [, indexedCategories] of Object.entries(indexedRankings)) {
      for (const [categoryId, indexedContenders] of Object.entries(indexedCategories)) {
        // create space for category if doesn't exist
        if (!contenderPoints[categoryId]) {
          contenderPoints[categoryId] = {};
        }
        for (const [contenderId, rankings] of Object.entries(indexedContenders)) {
          // add point value to relativeRankings
          const points = getContenderRank(rankings);
          contenderPoints[categoryId][contenderId] = points;
        }
      }
    }
    // console.log('indexedRankings', indexedRankings);
    // console.log('contenderPoints', contenderPoints);

    return {
      status: 'success',
      data: {
        indexedRankings,
        contenderPoints,
      },
    };
  } catch (error) {
    console.log('error', error);
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
 * indexedRankings: {
 *    [eventId: string]: {
 *        [categoryId: string]: {
 *            [contenderId: string]: {
 *                [ranking: number]: number
 *            }
 *        }
 *    }
 * }
 * contenderPoints: {
 *   [categoryId: string]: {
 *     [contenderId: string]: points
 *   }
 * }
 * openEvents = { id: string, type: 'NOMINATION' | 'WIN' }[]
 */
const createCommunityPredictions = async (
  indexedRankings = {},
  contenderPoints = {},
  openEvents = [],
  //   createHistoryRecord = false,
) => {
  console.log('createCommunityPredictions');

  let responses;
  let body;

  try {
    // prepare createPredictionSet mutations
    const createPredictionSetPromises = [];
    // const createHistoryPredictionSetPromises = [];
    for (const [eventId, indexedCategories] of Object.entries(indexedRankings)) {
      // get the event type (NOMINATION or WIN)
      const event = openEvents.find((event) => event.id === eventId);
      const eventType = event?.type || 'NOMINATION';
      for (const [categoryId] of Object.entries(indexedCategories)) {
        const req = fetch(createCommunityPredictionSet(eventId, categoryId, eventType));
        createPredictionSetPromises.push(req);
      }
    }

    // create all predictionSets in parallel
    responses = await Promise.all(createPredictionSetPromises);

    // prepare createPrediction requests
    const createPredictionPromises = [];
    for (const response of responses) {
      body = await response.json();
      // get params from body
      const predictionSet = body.data.createCommunityPredictionSet;
      const { id, eventId, categoryId } = predictionSet;
      // push createPrediction requests to array
      const indexedContenders = indexedRankings[eventId][categoryId];
      // get contender points in descending order so we can assess contender's ranking relative to other contenders
      const sortedPoints = Object.values(contenderPoints[categoryId]).sort(
        (a, b) => b - a,
      );
      for (const [contenderId, indexedRankings] of Object.entries(indexedContenders)) {
        const points = contenderPoints[categoryId][contenderId];
        const relativeRanking = sortedPoints.indexOf(points) + 1;
        createPredictionPromises.push(
          fetch(
            createCommunityPrediction(id, contenderId, indexedRankings, relativeRanking),
          ),
        );
      }
    }

    // create all predictions in parallel
    responses = await Promise.allSettled(createPredictionPromises);
    console.log('createPredictionPromises response:', responses.length);

    return {
      status: 'success',
    };
  } catch (error) {
    console.log('error', error);
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
    response = await Promise.all(deletePredictionPromises);
    console.log('deletePredictionPromises response:', response.length);
    const deletePredictionSetPromises = [];
    for (const predictionSetId of formerPredictionSetIds) {
      deletePredictionSetPromises.push(
        fetch(deleteCommunityPredictionSet(predictionSetId)),
      );
    }
    response = await Promise.all(deletePredictionSetPromises);
    console.log('deletePredictionSetPromises response:', response.length);
    return {
      status: 'success',
    };
  } catch (error) {
    console.log('error', error);
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
  getPredictions,
  createCommunityPredictions,
  deletePreviousCommunityPredictions,
  getFormerCommunityPredictions,
};
