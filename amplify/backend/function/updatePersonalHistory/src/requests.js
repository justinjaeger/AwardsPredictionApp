const { Request } = require('node-fetch');
const { getEventsQuery, predictionSetByEventId } = require('./queries');
const {
  createHistoryPredictionSetMutation,
  createHistoryPredictionMutation,
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
        and: [{ status: { ne: 'WINS_STAGING' } }, { status: { ne: 'ARCHIVED' } }],
      },
    },
  }),
});

// ts: ListCommunityPredictionSetsQueryVariables
const predictionSetByEventIdRequest = (eventId) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: predictionSetByEventId,
      variables: { eventId },
    }),
  });

// ts: CreateHistoryPredictionSetMutationVariables
const createHistoryPredictionSetRequest = (
  eventId,
  categoryId,
  userId,
  type = 'NOMINATION',
) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: createHistoryPredictionSetMutation,
      variables: {
        input: {
          type,
          userId,
          eventId,
          categoryId,
        },
      },
    }),
  });

// ts: CreateHistoryPredictionMutationVariables
const createHistoryPredictionRequest = (ranking, contenderId, historyPredictionSetId) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: createHistoryPredictionMutation,
      variables: {
        input: {
          ranking,
          contenderId,
          historyPredictionSetId,
        },
      },
    }),
  });

module.exports = {
  getOpenEventsRequest,
  predictionSetByEventIdRequest,
  createHistoryPredictionSetRequest,
  createHistoryPredictionRequest,
};