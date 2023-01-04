const { Request } = require('node-fetch');
const { getEventsQuery, listPredictionSetsQuery } = require('./queries');
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
        and: [
          { status: { ne: 'NOMS_STAGING' } },
          { status: { ne: 'WINS_STAGING' } },
          { status: { ne: 'ARCHIVED' } },
        ],
      },
    },
  }),
});

// ts: ListPredictionSetsQueryVariables
const listPredictionSetsRequest = (eventId) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: listPredictionSetsQuery,
      variables: {
        filter: { predictionSetEventId: { eq: eventId } },
      },
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
          historyPredictionSetUserId: userId,
          historyPredictionSetEventId: eventId,
          historyPredictionSetCategoryId: categoryId,
        },
      },
    }),
  });

// ts: CreateHistoryPredictionMutationVariables
const createHistoryPredictionRequest = (
  ranking,
  contenderId,
  historyPredictionSetId,
  userId,
) =>
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
          contenderHistoryPredictionsId: contenderId,
          historyPredictionSetPredictionsId: historyPredictionSetId,
          historyPredictionUserId: userId,
        },
      },
    }),
  });

module.exports = {
  getOpenEventsRequest,
  listPredictionSetsRequest,
  createHistoryPredictionSetRequest,
  createHistoryPredictionRequest,
};
