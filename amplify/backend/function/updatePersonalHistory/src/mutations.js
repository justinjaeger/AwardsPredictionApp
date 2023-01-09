/**
 * need to pass:
 * type, userId, eventId, categoryId
 */
const createHistoryPredictionSetMutation = /* GraphQL */ `
  mutation CreateHistoryPredictionSet($input: CreateHistoryPredictionSetInput!) {
    createHistoryPredictionSet(input: $input) {
      id # predictionSetId
    }
  }
`;

/**
 * need to pass:
 * ranking, contenderId, predictionSetId
 */
const createHistoryPredictionMutation = /* GraphQL */ `
  mutation CreateHistoryPrediction($input: CreateHistoryPredictionInput!) {
    createHistoryPrediction(input: $input) {
      id
    }
  }
`;

module.exports = { createHistoryPredictionSetMutation, createHistoryPredictionMutation };
