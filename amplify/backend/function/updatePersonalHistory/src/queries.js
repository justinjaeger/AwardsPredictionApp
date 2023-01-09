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

// TODO: use new predictionSetByEventId query
const predictionSetByEventId = /* GraphQL */ `
  query PredictionSetByEventId($eventId: ID!) {
    predictionSetByEventId(eventId: $eventId) {
      items {
        id # predictionSetid
        userId
        categoryId
        predictions {
          items {
            id # predictionId
            ranking
            contenderId
            contender {
              visibility
              accolade
            }
            createdAt
          }
        }
        type
        createdAt
      }
    }
  }
`;

module.exports = { getEventsQuery, predictionSetByEventId };
