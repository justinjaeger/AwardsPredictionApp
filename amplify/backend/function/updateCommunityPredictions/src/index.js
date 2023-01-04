const {
  getOpenEventIds,
  getContendersByEventIds,
  getPredictionSetIds,
  createCommunityPredictions,
  deletePreviousCommunityPredictions,
} = require('./services');

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
   @type {import('@types/aws-lambda').APIGatewayProxyHandler}
   RECURRING INVOCATION: Every hour (modify with "amplify update function")
     *** MUST UPDATE OCCURANCE_INTERVAL IF CHANGE THE INVOCATION INTERVAL
   Once a day, it also creates a community HISTORY record
   - difference between community prediction and history record is history record is never deleted (and less frequently updated)
 */
exports.handler = async () => {
  const OCCURANCE_INTERVAL = 60; // in minutes
  const HOUR_OF_HISTORY_RECORD = 12; // in hours out of 24 (13 is 1pm)

  // get range in which we want to create history record
  const occuranceInHours = OCCURANCE_INTERVAL / 60;
  const timeToRecordHistory = new Date();
  timeToRecordHistory.setHours(HOUR_OF_HISTORY_RECORD);
  const timeHistoryExpires = new Date();
  timeHistoryExpires.setHours(HOUR_OF_HISTORY_RECORD + occuranceInHours);

  // if current time is within range, create history record
  let createHistoryRecord = false; // SHOULD BE FALSE BY DEFAULT
  const now = new Date();
  if (now >= timeToRecordHistory && now < timeHistoryExpires) {
    createHistoryRecord = true;
  }

  let statusCode = 200;
  let error;
  let response;

  try {
    response = await getOpenEventIds();
    if (response.status === 'error') {
      throw new Error(response.data.errors);
    }
    const { openEvents } = response.data;
    const openEventIds = openEvents.map((event) => event.id);

    response = await getContendersByEventIds(openEventIds);
    if (response.status === 'error') {
      throw new Error(response.data.errors);
    }
    const { indexedRankings } = response.data;

    response = await getPredictionSetIds(openEventIds);
    if (response.status === 'error') {
      throw new Error(response.data.errors);
    }
    const { formerPredictionSetIds, formerPredictionIds } = response.data;

    response = await createCommunityPredictions(
      indexedRankings,
      openEvents,
      createHistoryRecord,
    );
    if (response.status === 'error') {
      throw new Error(response.data.errors);
    }

    response = await deletePreviousCommunityPredictions(
      formerPredictionSetIds,
      formerPredictionIds,
    );
    if (response.status === 'error') {
      throw new Error(response.data.errors);
    }
  } catch (err) {
    statusCode = 400;
    error = JSON.stringify(err);
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origien": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: error || '',
  };
};
