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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        eventId
        categoryId
        movieId
        personId
        songId
        visibility
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
              }
              person {
                id
                tmdbId
              }
              song {
                id
                title
                artist
              }
              categoryId
              eventId
              movieId
              personId
              songId
              visibility
              accolade
              createdAt
              updatedAt
            }
            ranking
            createdAt
            updatedAt
            predictionSetPredictionsId
          }
        }
        createdAt
        updatedAt
        predictionSetCategoryId #
      }
    }
  }
`;

export const listCommunityPredictionSets = /* GraphQL */ `
  query ListCommunityPredictionSets(
    $id: ID
    $filter: ModelCommunityPredictionSetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommunityPredictionSets(
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
              }
              person {
                id
                tmdbId
              }
              song {
                id
                title
                artist
              }
              visibility
              accolade
            }
            contenderId
            indexedRankings
            createdAt
            updatedAt
            communityPredictionSetPredictionsId
          }
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      nextToken
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
        nominationDateTime
        winDateTime
        status
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
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
