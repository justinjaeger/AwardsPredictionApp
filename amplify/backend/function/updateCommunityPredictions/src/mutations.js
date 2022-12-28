// To create queries/mutations: https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1

const createCommunityPredictionSetMutation = /* GraphQL */ `
  mutation CreateCommunityPredictionSet($input: CreateCommunityPredictionSetInput!) {
    createCommunityPredictionSet(input: $input) {
      id # communityPredictionSetId
      communityPredictionSetEventId
      communityPredictionSetCategoryId
    }
  }
`;

const createCommunityPredictionMutation = /* GraphQL */ `
  mutation CreateCommunityPrediction($input: CreateCommunityPredictionInput!) {
    createCommunityPrediction(input: $input) {
      id # communityPredictionId
    }
  }
`;

const deleteCommunityPredictionSetMutation = /* GraphQL */ `
  mutation DeleteCommunityPredictionSet($input: DeleteCommunityPredictionSetInput!) {
    deleteCommunityPredictionSet(input: $input) {
      id
    }
  }
`;

const deleteCommunityPredictionMutation = /* GraphQL */ `
  mutation DeleteCommunityPrediction($input: DeleteCommunityPredictionInput!) {
    deleteCommunityPrediction(input: $input) {
      id
    }
  }
`;

module.exports = {
  createCommunityPredictionSetMutation,
  createCommunityPredictionMutation,
  deleteCommunityPredictionSetMutation,
  deleteCommunityPredictionMutation,
};
