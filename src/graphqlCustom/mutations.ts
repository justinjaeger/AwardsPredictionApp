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

export const deletePerson = /* GraphQL */ `
  mutation DeletePerson(
    $input: DeletePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    deletePerson(input: $input, condition: $condition) {
      id
    }
  }
`;

export const deleteSong = /* GraphQL */ `
  mutation DeleteSong($input: DeleteSongInput!, $condition: ModelSongConditionInput) {
    deleteSong(input: $input, condition: $condition) {
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

export const updateHistoryPrediction = /* GraphQL */ `
  mutation UpdateHistoryPrediction(
    $input: UpdateHistoryPredictionInput!
    $condition: ModelHistoryPredictionConditionInput
  ) {
    updateHistoryPrediction(input: $input, condition: $condition) {
      id
    }
  }
`;

export const updateCommunityPrediction = /* GraphQL */ `
  mutation UpdateCommunityPrediction(
    $input: UpdateCommunityPredictionInput!
    $condition: ModelCommunityPredictionConditionInput
  ) {
    updateCommunityPrediction(input: $input, condition: $condition) {
      id
    }
  }
`;

export const updateCommunityHistoryPrediction = /* GraphQL */ `
  mutation UpdateCommunityHistoryPrediction(
    $input: UpdateCommunityHistoryPredictionInput!
    $condition: ModelCommunityHistoryPredictionConditionInput
  ) {
    updateCommunityHistoryPrediction(input: $input, condition: $condition) {
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

export const deletePrediction = /* GraphQL */ `
  mutation DeletePrediction(
    $input: DeletePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    deletePrediction(input: $input, condition: $condition) {
      id
    }
  }
`;

export const deleteHistoryPrediction = /* GraphQL */ `
  mutation DeleteHistoryPrediction(
    $input: DeleteHistoryPredictionInput!
    $condition: ModelHistoryPredictionConditionInput
  ) {
    deleteHistoryPrediction(input: $input, condition: $condition) {
      id
    }
  }
`;

export const deleteCommunityPrediction = /* GraphQL */ `
  mutation DeleteCommunityPrediction(
    $input: DeleteCommunityPredictionInput!
    $condition: ModelCommunityPredictionConditionInput
  ) {
    deleteCommunityPrediction(input: $input, condition: $condition) {
      id
    }
  }
`;

export const deleteCommunityHistoryPrediction = /* GraphQL */ `
  mutation DeleteCommunityHistoryPrediction(
    $input: DeleteCommunityHistoryPredictionInput!
    $condition: ModelCommunityHistoryPredictionConditionInput
  ) {
    deleteCommunityHistoryPrediction(input: $input, condition: $condition) {
      id
    }
  }
`;

export const deletePredictionSet = /* GraphQL */ `
  mutation DeletePredictionSet(
    $input: DeletePredictionSetInput!
    $condition: ModelPredictionSetConditionInput
  ) {
    deletePredictionSet(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createPredictionSet = /* GraphQL */ `
  mutation CreatePredictionSet(
    $input: CreatePredictionSetInput!
    $condition: ModelPredictionSetConditionInput
  ) {
    createPredictionSet(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createPrediction = /* GraphQL */ `
  mutation CreatePrediction(
    $input: CreatePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    createPrediction(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createMovie = /* GraphQL */ `
  mutation CreateMovie($input: CreateMovieInput!, $condition: ModelMovieConditionInput) {
    createMovie(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createSong = /* GraphQL */ `
  mutation CreateSong($input: CreateSongInput!, $condition: ModelSongConditionInput) {
    createSong(input: $input, condition: $condition) {
      id
    }
  }
`;
