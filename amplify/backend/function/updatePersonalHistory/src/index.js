const {
  getOpenEventIds,
  getPredictionsByEventIds,
  createHistoryPredictions,
} = require('./services');

/* Amplify Params - DO NOT EDIT
	API_AWARDSAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_AWARDSAPP_GRAPHQLAPIIDOUTPUT
	API_AWARDSAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
   @type {import('@types/aws-lambda').APIGatewayProxyHandler}
   RECURRING INVOCATION: Every day (modify with "amplify update function")
   Goes through all PredictionSets and copies them to HistoryPredictionSets
 */
exports.handler = async () => {
  let statusCode = 200;
  let error;
  let response;

  try {
    response = await getOpenEventIds();
    if (response.status === 'error') {
      throw new Error();
    }
    const { openEvents } = response.data;
    const openEventIds = openEvents.map((event) => event.id);

    response = await getPredictionsByEventIds(openEventIds);
    if (response.status === 'error') {
      throw new Error(response.data.errors);
    }
    const { predictionSets, predictions } = response.data;

    // createHistoryPredictionSets (and predictions)
    response = await createHistoryPredictions(predictionSets, predictions);
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
