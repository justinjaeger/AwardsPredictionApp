const {
  getOpenEventIds,
  getCommunityPredictionsByEventIds,
  createCommunityHistory,
} = require('./services');

/* Amplify Params - DO NOT EDIT
      ENV
      REGION
  Amplify Params - DO NOT EDIT */

/**
     @type {import('@types/aws-lambda').APIGatewayProxyHandler}
     RECURRING INVOCATION: Every hour (modify with "amplify update function")
   */
exports.handler = async () => {
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

    response = await getCommunityPredictionsByEventIds(openEventIds);
    if (response.status === 'error') {
      throw new Error(response.data.errors);
    }
    const { predictionSets, predictions } = response.data;

    // Copy all communityPredictionSets with openEventIds into communityHistoryPredictionSets
    response = await createCommunityHistory(predictionSets, predictions);
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
