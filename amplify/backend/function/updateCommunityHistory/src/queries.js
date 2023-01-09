// To create queries/mutations: https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1

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
const communityPredictionSetByEventIdQuery = /* GraphQL */ `
  query CommunityPredictionSetByEventId($eventId: ID!) {
    communityPredictionSetByEventId(eventId: $eventId) {
      items {
        id # predictionSetid
        predictions {
          items {
            id # predictionId
            ranking
            contenderId
            contender {
              visibility
            }
            createdAt
          }
        }
        categoryId
        type
        createdAt
      }
    }
  }
`;

module.exports = {
  getEventsQuery,
  communityPredictionSetByEventIdQuery,
};
