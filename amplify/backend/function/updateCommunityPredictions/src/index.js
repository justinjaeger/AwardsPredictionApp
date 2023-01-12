const {
  getOpenEventIds,
  getPredictions,
  createCommunityPredictions,
  deletePreviousCommunityPredictions,
  getFormerCommunityPredictions,
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

    // Get all predictions sets with openEventIds & create IndexedRankings
    response = await getFormerCommunityPredictions(openEventIds);
    if (response.status === 'error') {
      throw new Error(response.data.errors);
    }
    const { formerPredictionSetIds, formerPredictionIds } = response.data;

    // Get all predictions sets with openEventIds & create IndexedRankings
    response = await getPredictions(openEventIds, openEvents);
    if (response.status === 'error') {
      throw new Error(response.data.errors);
    }
    const { indexedRankings, contenderPoints } = response.data;

    response = await createCommunityPredictions(
      indexedRankings,
      contenderPoints,
      openEvents,
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
