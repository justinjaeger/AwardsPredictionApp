const { Request } = require('node-fetch');
const {
  getEventsQuery,
  predictionSetByEventId,
  communityPredictionSetByEventId,
  communityPredictionSetIdsOnlyByEventId,
} = require('./queries');
const {
  createCommunityPredictionSetMutation,
  createCommunityPredictionMutation,
  deleteCommunityPredictionSetMutation,
  deleteCommunityPredictionMutation,
} = require('./mutations');

const GRAPHQL_ENDPOINT = process.env.API_AWARDSAPP_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_AWARDSAPP_GRAPHQLAPIKEYOUTPUT;

/** @type {import('node-fetch').RequestInit} */

// ts: ListEventsQueryVariables
const getOpenEventsRequest = new Request(GRAPHQL_ENDPOINT, {
  method: 'POST',
  headers: {
    'x-api-key': GRAPHQL_API_KEY,
  },
  body: JSON.stringify({
    query: getEventsQuery,
    variables: {
      filter: {
        and: [
          //   { status: { ne: 'NOMS_STAGING' } }, // We COULD keep this in but I'd rather the community see what admin has done in staging (since they're the only ones able to predict) than see nothing
          { status: { ne: 'WINS_STAGING' } },
          { status: { ne: 'ARCHIVED' } },
        ],
      },
    },
  }),
});

// ts: ListCommunityPredictionSetsQueryVariables
const predictionSetByEventIdRequest = (eventId, nextToken) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: predictionSetByEventId,
      variables: { eventId, nextToken },
    }),
  });

// ts: ListCommunityPredictionSetsQueryVariables
const communityPredictionSetByEventIdRequest = (eventId) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: communityPredictionSetByEventId,
      variables: { eventId },
    }),
  });

const communityPredictionSetIdsOnlyByEventIdRequest = (eventId) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: communityPredictionSetIdsOnlyByEventId,
      variables: { eventId },
    }),
  });

// ts: CreateCommunityPredictionSetMutationVariables
const createCommunityPredictionSet = (eventId, categoryId, type = 'NOMINATION') =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: createCommunityPredictionSetMutation,
      variables: {
        input: {
          eventId,
          categoryId,
          type,
        },
      },
    }),
  });

// ts: CreateCommunityPredictionMutationVariables
// indexedRankings = { [place: number]: number }
const createCommunityPrediction = (
  predictionSetId,
  contenderId,
  indexedRankings,
  relativeRanking,
) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: createCommunityPredictionMutation,
      variables: {
        input: {
          communityPredictionSetId: predictionSetId,
          contenderId,
          indexedRankings: JSON.stringify(indexedRankings), // IMPORTANT: stringify indexedRankings
          ranking: relativeRanking,
        },
      },
    }),
  });

// DeleteCommunityPredictionSetMutationVariables
const deleteCommunityPredictionSet = (predictionSetId) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: deleteCommunityPredictionSetMutation,
      variables: {
        input: { id: predictionSetId },
      },
    }),
  });

// DeleteCommunityPredictionMutationVariables
const deleteCommunityPrediction = (predictionId) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: deleteCommunityPredictionMutation,
      variables: {
        input: { id: predictionId },
      },
    }),
  });

module.exports = {
  getOpenEventsRequest,
  predictionSetByEventIdRequest,
  communityPredictionSetByEventIdRequest,
  communityPredictionSetIdsOnlyByEventIdRequest,
  createCommunityPredictionSet,
  createCommunityPrediction,
  deleteCommunityPredictionSet,
  deleteCommunityPrediction,
};
