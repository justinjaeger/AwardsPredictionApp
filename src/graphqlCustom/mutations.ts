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
