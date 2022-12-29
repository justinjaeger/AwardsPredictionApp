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

const getAllContendersQuery = /* GraphQL */ `
  query ListContenders($filter: ModelContenderFilterInput) {
    listContenders(filter: $filter) {
      items {
        id # contenderId
        predictions {
          items {
            ranking # where film is in user's ranking
            createdAt # only count if created in the last month
          }
        }
        eventContendersId # eventId
        categoryContendersId # categoryId
      }
    }
  }
`;

const getCommunityPredictionSetsQuery = /* GraphQL */ `
  query ListCommunityPredictionSets($filter: ModelCommunityPredictionSetFilterInput) {
    listCommunityPredictionSets(filter: $filter) {
      items {
        id # communityPredictionSetId
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
  getAllContendersQuery,
  getCommunityPredictionSetsQuery,
};
