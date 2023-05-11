export const listContenders = /* GraphQL */ `
  query ListContenders(
    $id: ID
    $filter: ModelContenderFilterInput
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listContenders(
      id: $id
      filter: $filter
      limit: 10000
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

export const listEveryContender = /* GraphQL */ `
  query ListContenders(
    $id: ID
    $filter: ModelContenderFilterInput
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listContenders(
      id: $id
      filter: $filter
      limit: 10000
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        movieId
        personId
        songId
      }
    }
  }
`;

export const listEveryContenderPaginated = /* GraphQL */ `
  query ListContenders(
    $id: ID
    $limit: Int
    $filter: ModelContenderFilterInput
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
      nextToken
      items {
        id
        movieId
        personId
        songId
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
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEvents(
      id: $id
      filter: $filter
      limit: 1000 # would never happen but is safety measure
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
        liveAt
      }
    }
  }
`;

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      categories {
        items {
          id
          name
          type
          isShortlisted
        }
      }
      awardsBody
      year
      nominationDateTime
      winDateTime
      status
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
        }
        # only return the top 10 predictions in each category (10 because it's just displaying in the event page)
        predictions(ranking: { le: 10 }) {
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

export const communityPredictionSetByCategoryId = /* GraphQL */ `
  query CommunityPredictionSetByCategoryId(
    $categoryId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommunityPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    communityPredictionSetByCategoryId(
      categoryId: $categoryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        # returns a solid 50 predictions for each category
        predictions(ranking: { le: 50 }) {
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
        predictions(ranking: { le: 10 }) {
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
    $eventIdCreatedAt: ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyConditionInput
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

export const getUserBasic = /* GraphQL */ `
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

export const userByEmailBasic = /* GraphQL */ `
  query UserByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        oauthId
        username
        name
        bio
        image
        role
        createdAt
        updatedAt
      }
    }
  }
`;

export const userByOauthIdBasic = /* GraphQL */ `
  query UserByOauthId(
    $oauthId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByOauthId(
      oauthId: $oauthId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        oauthId
        username
        name
        bio
        image
        role
        createdAt
        updatedAt
      }
    }
  }
`;

export const userByUsernameBasic = /* GraphQL */ `
  query UserByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        oauthId
        username
        name
        bio
        image
        role
        createdAt
        updatedAt
      }
    }
  }
`;

// NOTE: should be used alongside a query for a unique followingship
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
      # NOTE: This is inefficient but it's just one scan
      followers(filter: { followingUserId: { eq: $authUserId } }, limit: 10000) {
        items {
          id
        }
      }
      following(filter: { followedUserId: { eq: $authUserId } }, limit: 10000) {
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
            liveAt
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
          predictions(ranking: { le: 5 }) {
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

export const getUserWithPredictedEventIds = /* GraphQL */ `
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
            liveAt
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
          predictions(ranking: { le: 5 }) {
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
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
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
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const searchUsers = /* GraphQL */ `
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
        # TODO: This is a bad way to see if I'm in the list. We should do a search for a unique relationship, via "uniqueRelationshipByViaFollowingUser"
        followers(filter: { followingUserId: { eq: $searchingUserId } }, limit: 10000) {
          items {
            id
          }
        }
        # TODO: This is a bad way to see if I'm in the list. We should do a search for a unique relationship, via "uniqueRelationshipByViaFollowingUser"
        following(filter: { followedUserId: { eq: $searchingUserId } }, limit: 10000) {
          items {
            id
          }
        }
      }
    }
  }
`;

export const getWhoUserIsFollowing = /* GraphQL */ `
  query RelationshipByFollowingUserId(
    $followingUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    relationshipByFollowingUserId(
      followingUserId: $followingUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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

export const getWhoUserIsFollowedBy = /* GraphQL */ `
  query RelationshipByFollowedUserId(
    $followedUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    relationshipByFollowedUserId(
      followedUserId: $followedUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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

// Will return 100 user ids (bc 10x10)
export const getWhoPeopleUserFollowsAreFollowing = /* GraphQL */ `
  query RelationshipByFollowingUserId(
    $followingUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $nextToken: String
  ) {
    relationshipByFollowingUserId(
      followingUserId: $followingUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: 10
      nextToken: $nextToken
    ) {
      items {
        followedUser {
          following(limit: 10) {
            items {
              followedUser {
                id
                email
                username
                name
                bio
                image
                role
              }
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;

// Will return 100 user ids (bc 10x10)
export const getWhoRandomUsersAreFollowing = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: 10
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        following(limit: 10) {
          items {
            followedUser {
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
      }
      nextToken
    }
  }
`;

export const searchFollowersSignedOut = /* GraphQL */ `
  query RelationshipByFollowedUserId(
    $followedUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $authUserId: ID! # we want to know if authenticated user is following this user or not
  ) {
    relationshipByFollowedUserId(
      followedUserId: $followedUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
    $limit: Int # limit applies to both how many Following we return, but also how many Following's Following we return (so 10 = 100 results)
    $nextToken: String
    $from: Int
  ) {
    searchRelationships(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      # Just enough to derive the relationship count
      total
    }
  }
`;

// Instead of scanning through each of my friend's followers to see if I'm there,
// I could query for all the people who follow ME and filter out the result on the frontend
// 1. GET ALL MY FOLLOWERS
// 2. PAGINATED - GET SOME OF MY FOLLOWERS' FOLLOWERS
// 3. FILTER OUT THE ONES I ALREADY FOLLOW
// 4. IF NOT ENOUGH RESULTS, GET MORE OF MY FOLLOWERS' FOLLOWERS (repeat #2)
export const getRecommendedFollowersFromFriendsQuery = /* GraphQL */ `
  query RelationshipByFollowingUserId(
    $followingUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $nextToken: String
    $authUserId: ID
  ) {
    relationshipByFollowingUserId(
      followingUserId: $followingUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: 10
      nextToken: $nextToken
    ) {
      nextToken
      total
      # items are the people I follow, and we use them to recomment other people I should follow
      items {
        followedUser {
          id
          email
          image
          name
          username
        }
      }
    }
  }
`;

export const searchRecommendedFollowingSignedOut = /* GraphQL */ `
  query SearchRelationships(
    $filter: SearchableRelationshipFilterInput
    $limit: Int # limit applies to both how many Following we return, but also how many Following's Following we return (so 10 = 100 results)
    $nextToken: String
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
                email
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

export const listEveryRelationship = /* GraphQL */ `
  query ListRelationships {
    listRelationships(limit: 100000) {
      items {
        id
        followedUserId
        followingUserId
      }
    }
  }
`;

// TODO: What if we follow like 200 users? It's just gonna be slow. Paginating doesn't help
// To speed this up we'd really want a field on Relationship to be
// "lastTimeFollowedUserUpdatedPredictions" (call it "lastUpdated"): AWSDateTime",
// and then do an index called "relationshipByFollowingUserIdAndLastUpdated",
// so we pass followingUserId and set the "sortDirection",
// example of this here (CMD-F "repsByPeriodAndTotal"): https://docs.amplify.aws/cli/graphql/examples-and-solutions/#16-get-total-product-inventory
// Actually we can't because the sort key can't be an optional value I think
// Plus, if we just followed a user, this field would be empty and we would NOT see their latest predictions
// OR the field could just be set to createdAt, and we'd return even if they didn't make recent predictions, which is actually kind of okay
// TO FIX: the hacky way to do it would be to create an arbitrary field to update when a user makes a prediction, so that we can sort by updatedAt
// "relationshipByFollowingUserIdAndLastUpdated"
// updateMeWhenFollowedUserMakesPrediction: stirng
// But think about this... when a user has 1k followers and updates a prediction, this updates 1k relationship records which is nuts
// we'd just want a field on the user "lastTimeUpdatedAnyPrediction: AWSDateTime"
// then we could return a paginated list of users we follow, sorted by lastTimeUpdatedAnyPrediction,
// BUT we'd make a SEPARATE request to get the predictions for each user
// This isn't so bad because we'd get like 5-10 users at a time instead of potentially 100
// But it doesn't let us take advantage of the resolvers
// Note also that this new field would be nullable and sortKeys aren't supposed to be nullable right?
// The best I could do is put a "userByLastUpdated" on the user, then make a GSI onthe user.id, but even then I still cannot sub-query (use resolvers)
export const getRecentFollowingPredictions = /* GraphQL */ `
  query RelationshipByFollowingUserId(
    $followingUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $greaterThanDate: String
  ) {
    relationshipByFollowingUserId(
      followingUserId: $followingUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        followedUser {
          id
          image
          name
          username
          # NOTE: prediction sets are sorted by createdAt, so this works
          predictionSets(
            createdAt: { gt: $greaterThanDate }
            limit: 5
            sortDirection: DESC
          ) {
            items {
              id
              type
              event {
                id
                awardsBody
                year
                status
              }
              category {
                id
                name
                type
                isShortlisted
              }
              createdAt
              updatedAt
              predictions(ranking: { le: 5 }) {
                items {
                  id
                  ranking
                  contender {
                    id
                    movie {
                      tmdbId
                    }
                    person {
                      tmdbId
                    }
                    song {
                      title
                      artist
                    }
                    accolade
                    visibility
                    updatedAt
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

// TODO: would want this but for category as well
/**
 * TODO: Optimize this
 * Ideally you want to have a UsersPredictingEvent table
 * - userId @primaryKey(with eventId, sort key on lastUpdated)
 * - eventId
 * - lastUpdated
 *
 * Then you want to put a field on user, predictingEvents: [UsersPredictingEvent] @hasMany
 * Then you just update this in tandem with updating a user's predictions
 * THEN when you want to list friends predicting something, you return those where userId#eventId, AND sort it in the direction of lastUpdated, so those users come up first
 *
 * BUT FOR NOW: we're not using this; just reutrn the user's friends
 */
export const getFriendsPredictingEventQuery = /* GraphQL */ `
  query RelationshipByFollowingUserId(
    $followingUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $eventId: ID
  ) {
    relationshipByFollowingUserId(
      followingUserId: $followingUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        # these would be my friends, say 100 of them
        followedUser {
          id
          image
          name
          username
          # for prediction sets we'd have say 100 of them from like 5 events. so that's 10,000 prediction sets to scan through per query
          # Not the best but it's better than doing this query per every user
          # Return user's {LIMIT # OF} latest prediction sets
          # FOR NOW THOUGH since we have just one event, we can do this without that much cost. every PS is gonna be the same event
          predictionSets(
            filter: { eventId: { eq: $eventId } }
            limit: 1
            sortDirection: DESC
          ) {
            items {
              id
              createdAt
            }
          }
        }
      }
    }
  }
`;

// lists all users but with an indication of whether we are already following them
export const listAllUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: 10000
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        email
      }
    }
  }
`;

// saying paginated because every "list" should be paginated
export const listUsersPaginated = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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

// Always paginate. Lists all users but with an indication of whether we are already following them
export const listUsersPaginatedWithIsFollowing = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
    $authUserId: ID
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        email
        username
        name
        bio
        image
        role
        # NOTE: This is inefficient. But, most users don't have 10000 followers. And we're PAGINATING this. And it beats checking every user returned for a matching relationship.
        followers(filter: { followingUserId: { eq: $authUserId } }, limit: 10000) {
          items {
            id
          }
        }
      }
    }
  }
`;

// lists all users but with an indication of whether we are already following them
export const searchUsersWithIsFollowing = /* GraphQL */ `
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
        # TODO: This is a bad way to see if I'm in the list. We should do a search for a unique relationship, via "uniqueRelationshipByViaFollowingUser"
        followers(filter: { followingUserId: { eq: $authUserId } }) {
          items {
            id
          }
        }
      }
    }
  }
`;

export const listMovies = /* GraphQL */ `
  query ListMovies(
    $id: ID
    $filter: ModelMovieFilterInput
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMovies(
      id: $id
      filter: $filter
      limit: 10000
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        tmdbId
        studio
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listSongs = /* GraphQL */ `
  query ListSongs(
    $id: ID
    $filter: ModelSongFilterInput
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSongs(
      id: $id
      filter: $filter
      limit: 1000
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        movieId
        movie {
          id
          contenders {
            nextToken
          }
          tmdbId
          studio
          createdAt
          updatedAt
        }
        title
        artist
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listEverySong = /* GraphQL */ `
  query ListSongs(
    $id: ID
    $filter: ModelSongFilterInput
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSongs(
      id: $id
      filter: $filter
      limit: 1000
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        movieId
        title
        artist
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listEveryPersonalPrediction = /* GraphQL */ `
  query ListPredictions(
    $id: ID
    $filter: ModelPredictionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPredictions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        contenderId
      }
      nextToken
    }
  }
`;

export const listEveryPersonalPredictionSet = /* GraphQL */ `
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
        userId
        eventId
        categoryId
        createdAt
      }
      nextToken
    }
  }
`;

export const uniqueRelationshipViaFollowedUser = /* GraphQL */ `
  query UniqueRelationshipViaFollowedUser(
    $followedUserId: ID!
    $followingUserId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    uniqueRelationshipViaFollowedUser(
      followedUserId: $followedUserId
      followingUserId: $followingUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        followedUserId
        followedUser {
          id
          email
          oauthId
          username
          name
          bio
          image
          role
        }
        followingUserId
        followingUser {
          id
          email
          oauthId
          username
          name
          bio
          image
          role
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getUniquePredictionSet = /* GraphQL */ `
  query PredictionSetByUserIdAndCategoryId(
    $userId: ID!
    $categoryId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    predictionSetByUserIdAndCategoryId(
      userId: $userId
      categoryId: $categoryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        categoryId
        # would probably not even be over 50 but just in case
        predictions(limit: 1000) {
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
      nextToken
    }
  }
`;

export const movieByTmdbId = /* GraphQL */ `
  query MovieByTmdbId(
    $tmdbId: Int!
    $sortDirection: ModelSortDirection
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    movieByTmdbId(
      tmdbId: $tmdbId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tmdbId
        studio
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const personByTmdbId = /* GraphQL */ `
  query PersonByTmdbId(
    $tmdbId: Int!
    $sortDirection: ModelSortDirection
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    personByTmdbId(
      tmdbId: $tmdbId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tmdbId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getMovie = /* GraphQL */ `
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
      id
    }
  }
`;

export const getSong = /* GraphQL */ `
  query GetSong($id: ID!) {
    getSong(id: $id) {
      id
      movieId
      movie {
        id
        tmdbId
        studio
        createdAt
        updatedAt
      }
      title
      artist
      createdAt
      updatedAt
    }
  }
`;

export const songByMovieIdAndTitle = /* GraphQL */ `
  query SongByMovieIdAndTitle(
    $movieId: ID!
    $title: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    songByMovieIdAndTitle(
      movieId: $movieId
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        title
        artist
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const eventByAwardsBodyAndYear = /* GraphQL */ `
  query EventByAwardsBodyAndYear(
    $awardsBody: AwardsBody!
    $year: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventByAwardsBodyAndYear(
      awardsBody: $awardsBody
      year: $year
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        liveAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getUniqueMovieContender = /* GraphQL */ `
  query GetUniqueMovieContender(
    $categoryId: ID!
    $movieId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContenderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUniqueMovieContender(
      categoryId: $categoryId
      movieId: $movieId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
      nextToken
    }
  }
`;
