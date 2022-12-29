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
Amplify Params - DO NOT EDIT */ /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// RECURRING INVOCATION: Every hour (modify with "amplify update function")
exports.handler = async () => {
  //   return { statusCode: 200, body: JSON.stringify('Hello from Lambda!') }; // To test if working

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

    response = await createCommunityPredictions(indexedRankings, openEvents);
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
