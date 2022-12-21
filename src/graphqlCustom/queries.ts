export const listContenders = /* GraphQL */ `
  query ListContenders(
    $id: ID
    $filter: ModelContenderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listContenders(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        song {
          id
          title
          artist
          movie {
            id
            tmdbId
            studio
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          songMovieId
        }
        predictions {
          items {
            ranking #
            createdAt
            updatedAt
            predictionSetPredictionsId
            contenderPredictionsId
            predictionUserId
          }
        }
        didReceiveNominationOrWin
        createdAt
        updatedAt
        eventContendersId
        categoryContendersId #
        contenderMovieId
        contenderPersonId
        contenderSongId
        visibilty
      }
    }
  }
`;

export const listPredictionSets = /* GraphQL */ `
  query ListPredictionSets(
    $id: ID
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPredictionSets(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        predictions {
          items {
            id
            contender {
              id
              movie {
                id
                tmdbId
                studio
                createdAt
                updatedAt
              }
              person {
                id
                tmdbId
                createdAt
                updatedAt
              }
              song {
                id
                title
                artist
                createdAt
                updatedAt
                songMovieId
              }
              didReceiveNominationOrWin
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
              visibilty
            }
            ranking
            createdAt
            updatedAt
            predictionSetPredictionsId
            contenderPredictionsId
            predictionUserId
          }
        }
        createdAt
        updatedAt
        predictionSetUserId
        predictionSetEventId
        predictionSetCategoryId #
      }
    }
  }
`;

export const listEvents = /* GraphQL */ `
  query ListEvents(
    $id: ID
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEvents(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        categories {
          items {
            id
            name
            type
            createdAt
            updatedAt
          }
        }
        awardsBody
        year
        status
        nominationDateTime
        winDateTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listCategories = /* GraphQL */ `
  query ListCategories(
    $id: ID
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCategories(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        type
        event {
          id
          awardsBody
          year
          status
          nominationDateTime
          winDateTime
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        eventCategoriesId
      }
      nextToken
    }
  }
`;
