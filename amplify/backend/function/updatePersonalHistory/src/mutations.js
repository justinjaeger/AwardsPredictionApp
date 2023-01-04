/**
 * need to pass:
 * type: PredictionType
   historyPredictionSetUserId: ID!
   historyPredictionSetEventId: ID!
   historyPredictionSetCategoryId: ID!
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
 * ranking: Int!
   contenderHistoryPredictionsId: ID
   historyPredictionSetPredictionsId: ID
   historyPredictionUserId: ID!
 */
const createHistoryPredictionMutation = /* GraphQL */ `
  mutation CreateHistoryPrediction($input: CreateHistoryPredictionInput!) {
    createHistoryPrediction(input: $input) {
      id
    }
  }
`;

module.exports = { createHistoryPredictionSetMutation, createHistoryPredictionMutation };
