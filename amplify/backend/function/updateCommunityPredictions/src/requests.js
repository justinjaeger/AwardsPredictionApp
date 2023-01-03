const { Request } = require('node-fetch');
const {
  getEventsQuery,
  getAllContendersQuery,
  getCommunityPredictionSetsQuery,
} = require('./queries');
const {
  createCommunityPredictionSetMutation,
  createCommunityPredictionMutation,
  createCommunityHistoryPredictionSetMutation,
  createCommunityHistoryPredictionMutation,
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
          { status: { ne: 'NOMS_STAGING' } },
          { status: { ne: 'WINS_STAGING' } },
          { status: { ne: 'ARCHIVED' } },
        ],
      },
    },
  }),
});

// ts: ListContendersQueryVariables
const getAllEventContendersRequest = (eventId) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: getAllContendersQuery,
      variables: {
        filter: { eventContendersId: { eq: eventId } },
      },
    }),
  });

// ts: ListCommunityPredictionSetsQueryVariables
const getCommunityPredictionSetsRequest = (eventId) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: getCommunityPredictionSetsQuery,
      variables: {
        filter: { eventId: { eq: eventId } },
      },
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
          eventId: eventId,
          communityPredictionSetCategoryId: categoryId,
          type,
        },
      },
    }),
  });

// ts: CreateCommunityPredictionMutationVariables
// indexedRankings = { [place: number]: number }
const createCommunityPrediction = (predictionSetId, contenderId, indexedRankings) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: createCommunityPredictionMutation,
      variables: {
        input: {
          communityPredictionSetPredictionsId: predictionSetId,
          indexedRankings: JSON.stringify(indexedRankings), // IMPORTANT: stringify indexedRankings
          contenderCommunityPredictionsId: contenderId,
        },
      },
    }),
  });

// ts: CreateCommunityHistoryPredictionSetMutationVariables
const createCommunityHistoryPredictionSet = (eventId, categoryId, type = 'NOMINATION') =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: createCommunityHistoryPredictionSetMutation,
      variables: {
        input: {
          eventId: eventId,
          communityHistoryPredictionSetCategoryId: categoryId,
          type,
        },
      },
    }),
  });

// ts: CreateCommunityPredictionMutationVariables
// indexedRankings = { [place: number]: number }
const createCommunityHistoryPrediction = (
  predictionSetId,
  contenderId,
  indexedRankings,
) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: createCommunityHistoryPredictionMutation,
      variables: {
        input: {
          communityHistoryPredictionSetPredictionsId: predictionSetId,
          indexedRankings: JSON.stringify(indexedRankings), // IMPORTANT: stringify indexedRankings
          contenderCommunityHistoryPredictionsId: contenderId,
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
  getAllEventContendersRequest,
  getCommunityPredictionSetsRequest,
  createCommunityPredictionSet,
  createCommunityPrediction,
  createCommunityHistoryPredictionSet,
  createCommunityHistoryPrediction,
  deleteCommunityPredictionSet,
  deleteCommunityPrediction,
};
