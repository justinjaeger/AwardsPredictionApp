const fetch = require('node-fetch').default;
const { getPredictionType } = require('./utils');
const {
  getOpenEventsRequest,
  listPredictionSetsRequest,
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
    console.log('error', error);
    return {
      status: 'error',
      data: {
        errors: error,
      },
    };
  }
};

const getPredictionsByEventIds = async (eventIds) => {
  console.log('getPredictionsByEventIds');

  let response;
  let body;
  const predictionSetsFormatted = []; // ts: { id, eventId, categoryId, userId, type = 'NOMINATION' }[]
  const predictionsFormatted = []; // ts: { ranking, contenderId, predictionSetId, userId }[]

  // request for all contenders
  try {
    for (const eventId of eventIds) {
      response = await fetch(listPredictionSetsRequest(eventId));
      body = await response.json();
      if (body.errors) throw new Error(body.errors);
      const predictionSets = body.data.listPredictionSets.items;
      // add to predictionSetsFormatted
      predictionSets.forEach((predictionSet) => {
        const predictionSetId = predictionSet.id;
        const userId = predictionSet.predictionSetUserId;
        const categoryId = predictionSet.predictionSetCategoryId;
        const eventId = predictionSet.predictionSetEventId;
        const predictions = predictionSet.predictions.items;
        predictionSetsFormatted.push({
          id: predictionSetId,
          eventId,
          categoryId,
          userId,
          type: predictionSet.type,
        });
        // add to predictionsFormatted
        predictions.forEach((prediction) => {
          predictionsFormatted.push({
            ranking: prediction.ranking,
            contenderId: prediction.contenderPredictionsId,
            userId,
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
  predictions, // ts: { ranking, contenderId, predictionSetId, userId }[]
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
    for (const { ranking, contenderId, predictionSetId, userId } of predictions) {
      const historyPredictionSetId = idsToHistoryIds[predictionSetId]; // get the historyPredictionSetId from the mapping
      createPredictionPromises.push(
        fetch(
          createHistoryPredictionRequest(
            ranking,
            contenderId,
            historyPredictionSetId,
            userId,
          ),
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
