const fetch = require('node-fetch').default;
const {
  getOpenEventsRequest,
  predictionSetByEventIdRequest,
  createHistoryPredictionSetRequest,
  createHistoryPredictionRequest,
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

const getPredictionsByEventIds = async (eventIds) => {
  console.log('getPredictionsByEventIds');

  let response;
  let body;
  const predictionSetsFormatted = []; // ts: { id, eventId, categoryId, userId, type = 'NOMINATION' }[]
  const predictionsFormatted = []; // ts: { ranking, contenderId, predictionSetId }[]

  // request for all contenders
  try {
    for (const eventId of eventIds) {
      response = await fetch(predictionSetByEventIdRequest(eventId));
      body = await response.json();
      if (body.errors) throw new Error(body.errors);
      const predictionSets = body.data.predictionSetByEventId.items;
      // add to predictionSetsFormatted
      predictionSets.forEach((predictionSet) => {
        const predictionSetId = predictionSet.id;
        const { userId, categoryId, type } = predictionSet;
        const predictions = predictionSet.predictions.items;
        predictionSetsFormatted.push({
          id: predictionSetId,
          eventId,
          categoryId,
          userId,
          type,
        });
        // add to predictionsFormatted
        predictions.forEach((prediction) => {
          const { ranking, contenderId } = prediction;
          predictionsFormatted.push({
            ranking,
            contenderId,
            predictionSetId,
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

const createHistoryPredictions = async (
  predictionSets, // ts: { id, eventId, categoryId, userId, type = 'NOMINATION' }[]
  predictions, // ts: { ranking, contenderId, predictionSetId }[]
) => {
  console.log('createHistoryPredictions');

  try {
    // Create history prediction sets
    const createPredictionSetPromises = [];
    for (const { eventId, categoryId, userId, type } of predictionSets) {
      createPredictionSetPromises.push(
        fetch(createHistoryPredictionSetRequest(eventId, categoryId, userId, type)),
      );
    }
    const responses = await Promise.all(createPredictionSetPromises);
    console.log('createPredictionPromises response', responses.length);

    // For efficiency, we want to create the predictions in a Promise.all. To do this, we need to map the historyPredictionSetId to the predictionSetId
    // important: with Promise.all, the order of repsonses is maintained, so we know that response[1] is the response for predictionSets[1]
    const idsToHistoryIds = {}; // ts: { [id: string]: historyId }
    for (const i in responses) {
      const response = responses[i];
      const body = await response.json();
      const historyPredictionSetId = body.data.createHistoryPredictionSet.id;
      const predictionSetId = predictionSets[i].id;
      idsToHistoryIds[predictionSetId] = historyPredictionSetId;
    }

    const createPredictionPromises = [];
    for (const { ranking, contenderId, predictionSetId } of predictions) {
      const historyPredictionSetId = idsToHistoryIds[predictionSetId]; // get the historyPredictionSetId from the mapping
      createPredictionPromises.push(
        fetch(
          createHistoryPredictionRequest(ranking, contenderId, historyPredictionSetId),
        ),
      );
    }
    const createPredictionResponses = await Promise.allSettled(createPredictionPromises);
    console.log('createPredictionPromises response:', createPredictionResponses.length);

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
  getPredictionsByEventIds,
  createHistoryPredictions,
};