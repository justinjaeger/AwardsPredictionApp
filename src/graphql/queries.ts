/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($email: ID!) {
    getUser(email: $email) {
      email
      username
      name
      bio
      image
      admin
      followers {
        nextToken
      }
      following {
        nextToken
      }
      activePredictionsByEvent {
        nextToken
      }
      activePredictionsByCategory {
        nextToken
      }
      pastPredictionsByEvent {
        nextToken
      }
      pastPredictionsByCategory {
        nextToken
      }
      leaderboardScores {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $email: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        username
        name
        bio
        image
        admin
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRelationships = /* GraphQL */ `
  query GetRelationships($id: ID!) {
    getRelationships(id: $id) {
      id
      followedUserId
      followingUserId
      followedUser {
        email
        username
        name
        bio
        image
        admin
        createdAt
        updatedAt
      }
      followingUser {
        email
        username
        name
        bio
        image
        admin
        createdAt
        updatedAt
      }
      followedPredictionFeed {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRelationships = /* GraphQL */ `
  query ListRelationships(
    $id: ID
    $filter: ModelRelationshipsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRelationships(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        followedUserId
        followingUserId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPredictionSet = /* GraphQL */ `
  query GetPredictionSet($id: ID!) {
    getPredictionSet(id: $id) {
      id
      userId
      eventId
      categoryId
      predictions {
        nextToken
      }
      isActive
      createdAt
      updatedAt
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
        userId
        eventId
        categoryId
        isActive
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPrediction = /* GraphQL */ `
  query GetPrediction($id: ID!) {
    getPrediction(id: $id) {
      id
      predictionSetId
      userId
      contenderId
      contender {
        id
        categoryId
        didReceiveNominationOrWin
        createdAt
        updatedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
      }
      ranking
      isActive
      createdAt
      updatedAt
      predictionSetPredictionsId
    }
  }
`;
export const listPredictions = /* GraphQL */ `
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
        predictionSetId
        userId
        contenderId
        ranking
        isActive
        createdAt
        updatedAt
        predictionSetPredictionsId
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      categories {
        nextToken
      }
      leaderboard {
        nextToken
      }
      awardsBody
      year
      type
      expiration
      usersPredicting {
        nextToken
      }
      isActive
      createdAt
      updatedAt
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
        awardsBody
        year
        type
        expiration
        isActive
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserPredictingEvent = /* GraphQL */ `
  query GetUserPredictingEvent($eventId: ID!, $userId: ID!) {
    getUserPredictingEvent(eventId: $eventId, userId: $userId) {
      eventId
      userId
      createdAt
      updatedAt
      eventUsersPredictingId
    }
  }
`;
export const listUserPredictingEvents = /* GraphQL */ `
  query ListUserPredictingEvents(
    $eventId: ID
    $userId: ModelIDKeyConditionInput
    $filter: ModelUserPredictingEventFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserPredictingEvents(
      eventId: $eventId
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        eventId
        userId
        createdAt
        updatedAt
        eventUsersPredictingId
      }
      nextToken
    }
  }
`;
export const getLeaderboardPosition = /* GraphQL */ `
  query GetLeaderboardPosition($userId: ID!, $eventId: ID!) {
    getLeaderboardPosition(userId: $userId, eventId: $eventId) {
      userId
      eventId
      event {
        id
        awardsBody
        year
        type
        expiration
        isActive
        createdAt
        updatedAt
      }
      user {
        email
        username
        name
        bio
        image
        admin
        createdAt
        updatedAt
      }
      accuracy
      ranking
      createdAt
      updatedAt
      userLeaderboardScoresId
    }
  }
`;
export const listLeaderboardPositions = /* GraphQL */ `
  query ListLeaderboardPositions(
    $userId: ID
    $eventId: ModelIDKeyConditionInput
    $filter: ModelLeaderboardPositionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLeaderboardPositions(
      userId: $userId
      eventId: $eventId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        eventId
        accuracy
        ranking
        createdAt
        updatedAt
        userLeaderboardScoresId
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      eventId
      event {
        id
        awardsBody
        year
        type
        expiration
        isActive
        createdAt
        updatedAt
      }
      contenders {
        nextToken
      }
      createdAt
      updatedAt
      eventCategoriesId
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
        eventId
        createdAt
        updatedAt
        eventCategoriesId
      }
      nextToken
    }
  }
`;
export const getContender = /* GraphQL */ `
  query GetContender($id: ID!) {
    getContender(id: $id) {
      id
      categoryId
      category {
        id
        name
        eventId
        createdAt
        updatedAt
        eventCategoriesId
      }
      movie {
        imdbId
        year
        image
        createdAt
        updatedAt
      }
      person {
        imdbId
        image
        createdAt
        updatedAt
      }
      snapshots {
        nextToken
      }
      activePredictions {
        nextToken
      }
      activePredictionsRankings {
        nextToken
      }
      predictionsByUser {
        nextToken
      }
      didReceiveNominationOrWin
      createdAt
      updatedAt
      categoryContendersId
      contenderMovieId
      contenderPersonId
    }
  }
`;
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
        categoryId
        didReceiveNominationOrWin
        createdAt
        updatedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
      }
      nextToken
    }
  }
`;
export const getContenderSnapshot = /* GraphQL */ `
  query GetContenderSnapshot($id: ID!) {
    getContenderSnapshot(id: $id) {
      id
      contenderId
      contender {
        id
        categoryId
        didReceiveNominationOrWin
        createdAt
        updatedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
      }
      categoryId
      category {
        id
        name
        eventId
        createdAt
        updatedAt
        eventCategoriesId
      }
      numberOfUsersPredicting
      numberOfUsersPredictingWin
      createdAt
      updatedAt
    }
  }
`;
export const listContenderSnapshots = /* GraphQL */ `
  query ListContenderSnapshots(
    $id: ID
    $filter: ModelContenderSnapshotFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listContenderSnapshots(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        contenderId
        categoryId
        numberOfUsersPredicting
        numberOfUsersPredictingWin
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMovie = /* GraphQL */ `
  query GetMovie($imdbId: String!) {
    getMovie(imdbId: $imdbId) {
      imdbId
      year
      image
      createdAt
      updatedAt
    }
  }
`;
export const listMovies = /* GraphQL */ `
  query ListMovies(
    $imdbId: String
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMovies(
      imdbId: $imdbId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        imdbId
        year
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPerson = /* GraphQL */ `
  query GetPerson($imdbId: String!) {
    getPerson(imdbId: $imdbId) {
      imdbId
      image
      createdAt
      updatedAt
    }
  }
`;
export const listPeople = /* GraphQL */ `
  query ListPeople(
    $imdbId: String
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPeople(
      imdbId: $imdbId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        imdbId
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryRelationshipsByFollowedUser = /* GraphQL */ `
  query QueryRelationshipsByFollowedUser(
    $followedUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryRelationshipsByFollowedUser(
      followedUserId: $followedUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        followedUserId
        followingUserId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryRelationshipsByFollowingUser = /* GraphQL */ `
  query QueryRelationshipsByFollowingUser(
    $followingUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryRelationshipsByFollowingUser(
      followingUserId: $followingUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        followedUserId
        followingUserId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryPredictionSetByUserByActive = /* GraphQL */ `
  query QueryPredictionSetByUserByActive(
    $userId: ID!
    $isActive: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryPredictionSetByUserByActive(
      userId: $userId
      isActive: $isActive
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        eventId
        categoryId
        isActive
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryPredictionSetByUserByEventByActive = /* GraphQL */ `
  query QueryPredictionSetByUserByEventByActive(
    $userId: ID!
    $eventIdIsActive: ModelPredictionSetByUserByEventActiveCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryPredictionSetByUserByEventByActive(
      userId: $userId
      eventIdIsActive: $eventIdIsActive
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        eventId
        categoryId
        isActive
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryPredictionSetByUserByEventByCreatedAt = /* GraphQL */ `
  query QueryPredictionSetByUserByEventByCreatedAt(
    $userId: ID!
    $eventIdCreatedAt: ModelPredictionSetByUserByEventByDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryPredictionSetByUserByEventByCreatedAt(
      userId: $userId
      eventIdCreatedAt: $eventIdCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        eventId
        categoryId
        isActive
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryPredictionSetByUserByCategoryByActive = /* GraphQL */ `
  query QueryPredictionSetByUserByCategoryByActive(
    $userId: ID!
    $categoryIdIsActive: ModelPredictionSetByUserByCategoryByActiveCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryPredictionSetByUserByCategoryByActive(
      userId: $userId
      categoryIdIsActive: $categoryIdIsActive
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        eventId
        categoryId
        isActive
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryPredictionSetByUserByCategoryByCreatedAt = /* GraphQL */ `
  query QueryPredictionSetByUserByCategoryByCreatedAt(
    $userId: ID!
    $categoryIdCreatedAt: ModelPredictionSetByUserByCategoryByDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryPredictionSetByUserByCategoryByCreatedAt(
      userId: $userId
      categoryIdCreatedAt: $categoryIdCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        eventId
        categoryId
        isActive
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const queryPredictionByContenderByUser = /* GraphQL */ `
  query QueryPredictionByContenderByUser(
    $contenderId: ID!
    $userId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryPredictionByContenderByUser(
      contenderId: $contenderId
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        predictionSetId
        userId
        contenderId
        ranking
        isActive
        createdAt
        updatedAt
        predictionSetPredictionsId
      }
      nextToken
    }
  }
`;
export const queryPredictionByContenderByActive = /* GraphQL */ `
  query QueryPredictionByContenderByActive(
    $contenderId: ID!
    $isActive: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryPredictionByContenderByActive(
      contenderId: $contenderId
      isActive: $isActive
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        predictionSetId
        userId
        contenderId
        ranking
        isActive
        createdAt
        updatedAt
        predictionSetPredictionsId
      }
      nextToken
    }
  }
`;
export const queryPredictionByContenderByRanking = /* GraphQL */ `
  query QueryPredictionByContenderByRanking(
    $contenderId: ID!
    $isActiveRanking: ModelPredictionByContenderByActiveByRankingCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryPredictionByContenderByRanking(
      contenderId: $contenderId
      isActiveRanking: $isActiveRanking
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        predictionSetId
        userId
        contenderId
        ranking
        isActive
        createdAt
        updatedAt
        predictionSetPredictionsId
      }
      nextToken
    }
  }
`;
export const queryLeaderboardPositionByEventByRanking = /* GraphQL */ `
  query QueryLeaderboardPositionByEventByRanking(
    $eventId: ID!
    $ranking: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLeaderboardPositionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryLeaderboardPositionByEventByRanking(
      eventId: $eventId
      ranking: $ranking
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        eventId
        accuracy
        ranking
        createdAt
        updatedAt
        userLeaderboardScoresId
      }
      nextToken
    }
  }
`;
export const queryContenderSnapshotByContenderByDate = /* GraphQL */ `
  query QueryContenderSnapshotByContenderByDate(
    $contenderId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContenderSnapshotFilterInput
    $limit: Int
    $nextToken: String
  ) {
    queryContenderSnapshotByContenderByDate(
      contenderId: $contenderId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        contenderId
        categoryId
        numberOfUsersPredicting
        numberOfUsersPredictingWin
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
