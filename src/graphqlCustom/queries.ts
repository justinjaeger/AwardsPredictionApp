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
        comment
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
        comment
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
        comment
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

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      username
      name
      bio
      image
      role
      createdAt
      updatedAt
    }
  }
`;

export const getUserProfileQuery = /* GraphQL */ `
  query GetUser($id: ID!, $authUserId: ID) {
    getUser(id: $id) {
      id
      email
      username
      name
      bio
      image
      role
      # we want to know if we're following this person and if they're following us
      followers(filter: { followingUserId: { eq: $authUserId } }) {
        items {
          id
        }
      }
      following(filter: { followedUserId: { eq: $authUserId } }) {
        items {
          id
        }
      }
      # Return user's 10 latest prediction sets
      predictionSets(limit: 10, sortDirection: DESC) {
        items {
          id # predictionSetId
          eventId
          event {
            id
            awardsBody
            year
            status
            createdAt
            updatedAt
            # TODO: shouldn't really be returning this level of nesting but it's a quick fix
            categories {
              items {
                id
                name
                type
                isShortlisted
              }
            }
          }
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
          comment
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const getUserEvents = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      predictionSets {
        items {
          eventId
        }
      }
    }
  }
`;

export const getUserProfileQuerySignedOut = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      username
      name
      bio
      image
      role
      # Return user's 10 latest prediction sets
      predictionSets(limit: 10, sortDirection: DESC) {
        items {
          id # predictionSetId
          eventId
          event {
            id
            awardsBody
            year
            status
            createdAt
            updatedAt
            # TODO: shouldn't really be returning this level of nesting but it's a quick fix
            categories {
              items {
                id
                name
                type
                isShortlisted
              }
            }
          }
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
          comment
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const getUserWithRelationshipsQuery = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      username
      name
      bio
      image
      role
      followers {
        items {
          id
          followingUserId
          followingUser {
            id
            email
            username
            name
            bio
            image
            role
            predictionSets {
              nextToken
            }
            historyPredictionSets {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      following {
        items {
          id
          followedUserId
          followedUser {
            id
            email
            username
            name
            bio
            image
            role
            predictionSets {
              nextToken
            }
            historyPredictionSets {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const searchUsersSignedOutQuery = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: [SearchableUserSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAggregationInput]
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        email
        username
        name
        bio
        image
        role
      }
    }
  }
`;

export const searchUsersSignedInQuery = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: [SearchableUserSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAggregationInput]
    $searchingUserId: ID
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        email
        username
        name
        bio
        image
        role
        # we want to know if we're following this person and if they're following us
        followers(filter: { followingUserId: { eq: $searchingUserId } }) {
          items {
            id
          }
        }
        following(filter: { followedUserId: { eq: $searchingUserId } }) {
          items {
            id
          }
        }
      }
    }
  }
`;

export const searchFollowersSignedIn = /* GraphQL */ `
  query SearchRelationships(
    $filter: SearchableRelationshipFilterInput
    $sort: [SearchableRelationshipSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableRelationshipAggregationInput]
    $authUserId: ID # we want to know if authenticated user is following this user or not
  ) {
    searchRelationships(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        followingUser {
          id
          image
          name
          email
          bio
          username
          # we want to know if we're following this person and if they're following us
          followers(filter: { followingUserId: { eq: $authUserId } }) {
            items {
              id
            }
          }
          following(filter: { followedUserId: { eq: $authUserId } }) {
            items {
              id
            }
          }
        }
      }
      nextToken
    }
  }
`;

export const searchFollowingSignedIn = /* GraphQL */ `
  query SearchRelationships(
    $filter: SearchableRelationshipFilterInput
    $sort: [SearchableRelationshipSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableRelationshipAggregationInput]
    $authUserId: ID # we want to know if authenticated user is following this user or not
  ) {
    searchRelationships(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        followedUser {
          id
          image
          name
          email
          bio
          username
          # we want to know if we're following this person and if they're following us
          followers(filter: { followingUserId: { eq: $authUserId } }) {
            items {
              id
            }
          }
          following(filter: { followedUserId: { eq: $authUserId } }) {
            items {
              id
            }
          }
        }
      }
      nextToken
    }
  }
`;

export const searchFollowersSignedOut = /* GraphQL */ `
  query SearchRelationships(
    $filter: SearchableRelationshipFilterInput
    $sort: [SearchableRelationshipSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableRelationshipAggregationInput]
  ) {
    searchRelationships(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        followingUser {
          id
          image
          name
          email
          bio
          username
        }
      }
      nextToken
    }
  }
`;

export const searchFollowingSignedOut = /* GraphQL */ `
  query SearchRelationships(
    $filter: SearchableRelationshipFilterInput
    $sort: [SearchableRelationshipSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableRelationshipAggregationInput]
  ) {
    searchRelationships(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        followedUser {
          id
          image
          name
          email
          bio
          username
        }
      }
      nextToken
    }
  }
`;

export const getTotalRelationships = /* GraphQL */ `
  query SearchRelationships(
    $filter: SearchableRelationshipFilterInput
    $sort: [SearchableRelationshipSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableRelationshipAggregationInput]
  ) {
    searchRelationships(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      total
    }
  }
`;

export const searchRecommendedFollowing = /* GraphQL */ `
  query SearchRelationships(
    $filter: SearchableRelationshipFilterInput
    $sort: [SearchableRelationshipSortInput]
    $limit: Int # limit applies to both how many Following we return, but also how many Following's Following we return (so 10 = 100 results)
    $nextToken: String
    $from: Int
    $authUserId: ID
  ) {
    searchRelationships(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      nextToken
      total
      items {
        # we are already following these users
        followedUser {
          following(limit: $limit) {
            items {
              # our friends' friends
              followedUser {
                id
                image
                name
                username
                # we want to know if we're already following this person
                followers(filter: { followedUserId: { eq: $authUserId } }) {
                  items {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const searchRecommendedFollowingSignedOut = /* GraphQL */ `
  query SearchRelationships(
    $filter: SearchableRelationshipFilterInput
    $sort: [SearchableRelationshipSortInput]
    $limit: Int # limit applies to both how many Following we return, but also how many Following's Following we return (so 10 = 100 results)
    $nextToken: String
    $from: Int
  ) {
    searchRelationships(filter: $filter, limit: $limit, nextToken: $nextToken) {
      nextToken
      total
      items {
        followedUser {
          following(limit: $limit) {
            items {
              followedUser {
                id
                image
                name
                username
              }
            }
          }
        }
      }
    }
  }
`;
