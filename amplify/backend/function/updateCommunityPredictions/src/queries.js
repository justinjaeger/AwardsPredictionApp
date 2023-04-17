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

const predictionSetByEventId = /* GraphQL */ `
  query PredictionSetByEventId($eventId: ID!, $nextToken: String) {
    predictionSetByEventId(eventId: $eventId, nextToken: $nextToken, limit: 500) {
      nextToken
      items {
        id # predictionSetid
        categoryId
        category {
          isShortlisted
        }
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

const communityPredictionSetByEventId = /* GraphQL */ `
  query CommunityPredictionSetByEventId($eventId: ID!) {
    communityPredictionSetByEventId(eventId: $eventId) {
      items {
        id # communityPredictionSetid
        categoryId
        predictions {
          items {
            id # communityPredictionId
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

const communityPredictionSetIdsOnlyByEventId = /* GraphQL */ `
  query CommunityPredictionSetByEventId($eventId: ID!) {
    communityPredictionSetByEventId(eventId: $eventId) {
      items {
        id # communityPredictionSetid
        predictions {
          items {
            id # communityPredictionId
          }
        }
      }
    }
  }
`;

module.exports = {
  getEventsQuery,
  predictionSetByEventId,
  communityPredictionSetByEventId,
  communityPredictionSetIdsOnlyByEventId,
};
