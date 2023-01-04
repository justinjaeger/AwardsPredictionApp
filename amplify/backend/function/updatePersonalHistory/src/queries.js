const getEventsQuery = /* GraphQL */ `
  query ListEvents($filter: ModelEventFilterInput) {
    listEvents(filter: $filter) {
      items {
        id # eventId
        status
      }
    }
  }
`;

const listPredictionSetsQuery = /* GraphQL */ `
  query ListPredictionSets($filter: ModelPredictionSetFilterInput) {
    listPredictionSets(filter: $filter) {
      items {
        id # predictionSetId
        predictions {
          items {
            id # predictionId
            contenderPredictionsId # contenderId
            ranking
          }
        }
        type
        predictionSetUserId
        predictionSetEventId
        predictionSetCategoryId
      }
    }
  }
`;

module.exports = { getEventsQuery, listPredictionSetsQuery };
