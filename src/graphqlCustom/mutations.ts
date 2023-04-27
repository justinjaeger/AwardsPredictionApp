export const updateContender = /* GraphQL */ `
  mutation UpdateContender(
    $input: UpdateContenderInput!
    $condition: ModelContenderConditionInput
  ) {
    updateContender(input: $input, condition: $condition) {
      id
    }
  }
`;

export const updateSong = /* GraphQL */ `
  mutation UpdateSong($input: UpdateSongInput!, $condition: ModelSongConditionInput) {
    updateSong(input: $input, condition: $condition) {
      id
    }
  }
`;

export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie($input: DeleteMovieInput!, $condition: ModelMovieConditionInput) {
    deleteMovie(input: $input, condition: $condition) {
      id
    }
  }
`;

export const updatePrediction = /* GraphQL */ `
  mutation UpdatePrediction(
    $input: UpdatePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    updatePrediction(input: $input, condition: $condition) {
      id
    }
  }
`;

export const deleteContender = /* GraphQL */ `
  mutation DeleteContender(
    $input: DeleteContenderInput!
    $condition: ModelContenderConditionInput
  ) {
    deleteContender(input: $input, condition: $condition) {
      id
    }
  }
`;
