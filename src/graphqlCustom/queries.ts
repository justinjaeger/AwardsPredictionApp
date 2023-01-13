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
        movieId
        movie {
          id
          tmdbId
          studio
        }
        personId
        person {
          id
          tmdbId
        }
        songId
        song {
          id
          title
          artist
        }
        visibility
        accolade
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
        categoryId
        predictions {
          items {
            id
            predictionSetId
            contenderId
            contender {
              id
              movieId
              movie {
                id
                tmdbId
                studio
              }
              personId
              person {
                id
                tmdbId
              }
              songId
              song {
                id
                title
                artist
              }
              visibility
              accolade
              createdAt
              updatedAt
            }
            ranking
            createdAt
            updatedAt
          }
        }
        type
        createdAt
        updatedAt
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
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const communityPredictionSetByEventId = /* GraphQL */ `
  query CommunityPredictionSetByEventId(
    $eventId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommunityPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    communityPredictionSetByEventId(
      eventId: $eventId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        categoryId
        category {
          id
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        predictions {
          items {
            id
            communityPredictionSetId
            contenderId
            contender {
              id
              movieId
              movie {
                id
                tmdbId
                studio
              }
              personId
              person {
                id
                tmdbId
              }
              songId
              song {
                id
                movieId
                title
                artist
              }
              visibility
              accolade
            }
            ranking
            indexedRankings
            createdAt
            updatedAt
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

export const predictionSetByUserIdAndEventId = /* GraphQL */ `
  query PredictionSetByUserIdAndEventId(
    $userId: ID!
    $eventId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    predictionSetByUserIdAndEventId(
      userId: $userId
      eventId: $eventId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        categoryId
        category {
          id
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        predictions {
          items {
            id
            predictionSetId
            contenderId
            contender {
              id
              movieId
              movie {
                id
                tmdbId
                studio
              }
              personId
              person {
                id
                tmdbId
              }
              songId
              song {
                id
                movieId
                title
                artist
              }
              visibility
              accolade
            }
            ranking
            createdAt
            updatedAt
          }
        }
        type
        createdAt
        updatedAt
      }
    }
  }
`;

export const historyPredictionSetByUserIdAndEventIdAndCreatedAt = /* GraphQL */ `
  query HistoryPredictionSetByUserIdAndEventIdAndCreatedAt(
    $userId: ID!
    $eventIdCreatedAt: ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndEventIdAndCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    historyPredictionSetByUserIdAndEventIdAndCreatedAt(
      userId: $userId
      eventIdCreatedAt: $eventIdCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        categoryId
        category {
          id
          name
          type
          isShortlisted
        }
        predictions {
          items {
            id
            historyPredictionSetId
            contenderId
            contender {
              id
              movieId
              movie {
                id
                tmdbId
                studio
              }
              personId
              person {
                id
                tmdbId
              }
              songId
              song {
                id
                movieId
                title
                artist
              }
              visibility
              accolade
            }
            ranking
            createdAt
            updatedAt
          }
        }
        type
        createdAt
        updatedAt
      }
    }
  }
`;

export const communityHistoryPredictionSetsByEventIdAndCreatedAt = /* GraphQL */ `
  query CommunityHistoryPredictionSetsByEventIdAndCreatedAt(
    $eventId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommunityHistoryPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    communityHistoryPredictionSetsByEventIdAndCreatedAt(
      eventId: $eventId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        categoryId
        category {
          id
          name
          type
          isShortlisted
        }
        predictions {
          items {
            id
            communityHistoryPredictionSetId
            contenderId
            contender {
              id
              movieId
              movie {
                id
                tmdbId
                studio
              }
              personId
              person {
                id
                tmdbId
              }
              songId
              song {
                id
                movieId
                title
                artist
              }
              visibility
              accolade
            }
            ranking
            indexedRankings
          }
        }
        type
        createdAt
        updatedAt
      }
    }
  }
`;
