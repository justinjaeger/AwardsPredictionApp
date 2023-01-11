const fetch = require('node-fetch').default;
const { getOpenEventsRequest, communityPredictionSetByEventId } = require('./requests');
const {
  createCommunityHistoryPredictionSet,
  createCommunityHistoryPrediction,
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

const getCommunityPredictionsByEventIds = async (eventIds) => {
  console.log('getCommunityPredictionsByEventIds');

  let response;
  let body;
  const predictionSetsFormatted = []; // ts: { id, eventId, categoryId, type }[]
  const predictionsFormatted = []; // ts: { ranking, contenderId, categoryId, indexedRankings, communityPredictionsId, }[]

  // request for all contenders
  try {
    for (const eventId of eventIds) {
      response = await fetch(communityPredictionSetByEventId(eventId));
      body = await response.json();
      if (body.errors) throw new Error(body.errors);
      const predictionSets = body.data.communityPredictionSetByEventId.items;
      // add to predictionSetsFormatted
      predictionSets.forEach((predictionSet) => {
        const communityPredictionsId = predictionSet.id;
        const { categoryId, type } = predictionSet;
        const predictions = predictionSet.predictions.items;
        predictionSetsFormatted.push({
          id: communityPredictionsId,
          eventId,
          categoryId,
          type,
        });
        // add to predictionsFormatted
        predictions.forEach((prediction) => {
          const { ranking, contenderId, indexedRankings } = prediction;
          predictionsFormatted.push({
            ranking,
            contenderId,
            categoryId,
            communityPredictionsId,
            indexedRankings,
          });
        });
      });
    }
    console.log('predictionSets', predictionSetsFormatted.length);
    console.log('predictions', predictionsFormatted.length);

    return {
      status: 'success',
      data: {
        predictionSets: predictionSetsFormatted,
        predictions: predictionsFormatted,
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

const createCommunityHistory = async (
  predictionSets, // ts: { id, eventId, categoryId, type }[]
  predictions, // ts: { ranking, contenderId, categoryId, indexedRankings, communityPredictionsId, }[]
) => {
  console.log('createHistoryPredictions');

  let body;
  let response;

  try {
    // Create history prediction sets
    const createHistoryPredictionSetPromises = [];
    for (const { eventId, categoryId, type } of predictionSets) {
      createHistoryPredictionSetPromises.push(
        fetch(createCommunityHistoryPredictionSet(eventId, categoryId, type)),
      );
    }
    const responses = await Promise.all(createHistoryPredictionSetPromises);
    console.log('createHistoryPredictionSetPromises response', responses.length);

    // For efficiency, we want to create the predictions in a Promise.all. To do this, we need to map the historyPredictionSetId to the predictionSetId
    // important: with Promise.all, the order of repsonses is maintained, so we know that response[1] is the response for predictionSets[1]
    const idsToHistoryIds = {}; // ts: { [id: string]: historyId }
    for (const i in responses) {
      response = responses[i];
      body = await response.json();
      const communityHistoryPredictionSetId =
        body.data.createCommunityHistoryPredictionSet.id;
      const predictionSetId = predictionSets[i].id;
      idsToHistoryIds[predictionSetId] = communityHistoryPredictionSetId;
    }

    const createHistoryPredictionPromises = [];
    for (const {
      ranking,
      contenderId,
      categoryId,
      indexedRankings,
      communityPredictionsId,
    } of predictions) {
      const communityHistoryPredictionSetId = idsToHistoryIds[communityPredictionsId]; // get the historyPredictionSetId from the mapping
      createHistoryPredictionPromises.push(
        fetch(
          createCommunityHistoryPrediction(
            communityHistoryPredictionSetId,
            contenderId,
            categoryId,
            indexedRankings,
            ranking,
          ),
        ),
      );
    }
    const createHistoryPredictionResponses = await Promise.allSettled(
      createHistoryPredictionPromises,
    );
    console.log(
      'createHistoryPredictionResponses response:',
      createHistoryPredictionResponses.length,
    );

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
            status: 400,
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
  getCommunityPredictionsByEventIds,
  createCommunityHistory,
};
