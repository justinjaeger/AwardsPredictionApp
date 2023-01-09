const { Request } = require('node-fetch');
const { getEventsQuery, communityPredictionSetByEventIdQuery } = require('./queries');
const {
  createCommunityHistoryPredictionSetMutation,
  createCommunityHistoryPredictionMutation,
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

// ts: CommunityPredictionSetByEventIdQueryVariables
const communityPredictionSetByEventId = (eventId) =>
  new Request(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({
      query: communityPredictionSetByEventIdQuery,
      variables: { eventId },
    }),
  });

// ts: CreateCommunityPredictionSetMutationVariables
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
          eventId,
          categoryId,
          type,
        },
      },
    }),
  });

// ts: CreateCommunityPredictionMutationVariables
// indexedRankings = { [place: number]: number }
const createCommunityHistoryPrediction = (
  communityHistoryPredictionSetId,
  contenderId,
  categoryId,
  indexedRankings,
  ranking,
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
          communityHistoryPredictionSetId,
          contenderId,
          categoryId,
          indexedRankings, // indexedRankings are already stringified
          ranking,
        },
      },
    }),
  });

module.exports = {
  getOpenEventsRequest,
  communityPredictionSetByEventId,
  createCommunityHistoryPredictionSet,
  createCommunityHistoryPrediction,
};
