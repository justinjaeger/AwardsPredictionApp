// To create queries/mutations: https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1

const createCommunityHistoryPredictionSetMutation = /* GraphQL */ `
  mutation CreateCommunityHistoryPredictionSet(
    $input: CreateCommunityHistoryPredictionSetInput!
  ) {
    createCommunityHistoryPredictionSet(input: $input) {
      id # communityHistoryPredictionSetId
      eventId
      categoryId
      type
    }
  }
`;

const createCommunityHistoryPredictionMutation = /* GraphQL */ `
  mutation CreateCommunityHistoryPrediction(
    $input: CreateCommunityHistoryPredictionInput!
  ) {
    createCommunityHistoryPrediction(input: $input) {
      id # communityHistoryPredictionId
    }
  }
`;

module.exports = {
  createCommunityHistoryPredictionSetMutation,
  createCommunityHistoryPredictionMutation,
};
