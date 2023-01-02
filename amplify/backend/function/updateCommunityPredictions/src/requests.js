const { Request } = require('node-fetch');
const {
  getEventsQuery,
  getAllContendersQuery,
  getCommunityPredictionSetsQuery,
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
const createCommunityPrediction = (predictionSetId, contenderId, ranking) =>
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
          ranking,
          contenderCommunityPredictionsId: contenderId,
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
  deleteCommunityPredictionSet,
  deleteCommunityPrediction,
};
