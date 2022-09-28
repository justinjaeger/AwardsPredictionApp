/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      followers {
        nextToken
        startedAt
      }
      following {
        nextToken
        startedAt
      }
      activePredictionsByEvent {
        nextToken
        startedAt
      }
      activePredictionsByCategory {
        nextToken
        startedAt
      }
      pastPredictionsByEvent {
        nextToken
        startedAt
      }
      pastPredictionsByCategory {
        nextToken
        startedAt
      }
      leaderboardScores {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        email
        username
        name
        bio
        image
        role
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        id
        email
        username
        name
        bio
        image
        role
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
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
        _version
        _deleted
        _lastChangedAt
      }
      followedPredictionFeed {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncRelationships = /* GraphQL */ `
  query SyncRelationships(
    $filter: ModelRelationshipsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRelationships(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        followedUserId
        followingUserId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        startedAt
      }
      isActive
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPredictionSets = /* GraphQL */ `
  query SyncPredictionSets(
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPredictionSets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userId
        eventId
        categoryId
        isActive
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getPrediction = /* GraphQL */ `
  query GetPrediction($id: ID!) {
    getPrediction(id: $id) {
      id
      userId
      predictionSetId
      contenderId
      contender {
        id
        categoryId
        didReceiveNominationOrWin
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      ranking
      isActive
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        userId
        predictionSetId
        contenderId
        ranking
        isActive
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        predictionSetPredictionsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPredictions = /* GraphQL */ `
  query SyncPredictions(
    $filter: ModelPredictionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPredictions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userId
        predictionSetId
        contenderId
        ranking
        isActive
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        predictionSetPredictionsId
      }
      nextToken
      startedAt
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      categories {
        nextToken
        startedAt
      }
      leaderboard {
        nextToken
        startedAt
      }
      awardsBody
      year
      type
      expiration
      usersPredicting {
        nextToken
        startedAt
      }
      isActive
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEvents = /* GraphQL */ `
  query SyncEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUserPredictingEvent = /* GraphQL */ `
  query GetUserPredictingEvent($id: ID!, $eventId: ID!, $userId: ID!) {
    getUserPredictingEvent(id: $id, eventId: $eventId, userId: $userId) {
      id
      eventId
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      eventUsersPredictingId
    }
  }
`;
export const listUserPredictingEvents = /* GraphQL */ `
  query ListUserPredictingEvents(
    $id: ID
    $eventIdUserId: ModelUserPredictingEventPrimaryCompositeKeyConditionInput
    $filter: ModelUserPredictingEventFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserPredictingEvents(
      id: $id
      eventIdUserId: $eventIdUserId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        eventId
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        eventUsersPredictingId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserPredictingEvents = /* GraphQL */ `
  query SyncUserPredictingEvents(
    $filter: ModelUserPredictingEventFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserPredictingEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        eventId
        userId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        eventUsersPredictingId
      }
      nextToken
      startedAt
    }
  }
`;
export const getLeaderboardPosition = /* GraphQL */ `
  query GetLeaderboardPosition($id: ID!, $userId: ID!, $eventId: ID!) {
    getLeaderboardPosition(id: $id, userId: $userId, eventId: $eventId) {
      id
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
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        email
        username
        name
        bio
        image
        role
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      accuracy
      ranking
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userLeaderboardScoresId
    }
  }
`;
export const listLeaderboardPositions = /* GraphQL */ `
  query ListLeaderboardPositions(
    $id: ID
    $userIdEventId: ModelLeaderboardPositionPrimaryCompositeKeyConditionInput
    $filter: ModelLeaderboardPositionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLeaderboardPositions(
      id: $id
      userIdEventId: $userIdEventId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userId
        eventId
        accuracy
        ranking
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userLeaderboardScoresId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLeaderboardPositions = /* GraphQL */ `
  query SyncLeaderboardPositions(
    $filter: ModelLeaderboardPositionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLeaderboardPositions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userId
        eventId
        accuracy
        ranking
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userLeaderboardScoresId
      }
      nextToken
      startedAt
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      type
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
        _version
        _deleted
        _lastChangedAt
      }
      contenders {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        type
        eventId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        eventCategoriesId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCategories = /* GraphQL */ `
  query SyncCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        type
        eventId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        eventCategoriesId
      }
      nextToken
      startedAt
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
        type
        eventId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        eventCategoriesId
      }
      movie {
        id
        tmdbId
        studio
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      person {
        id
        tmdbId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      song {
        id
        title
        artist
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        songMovieId
      }
      snapshots {
        nextToken
        startedAt
      }
      activePredictions {
        nextToken
        startedAt
      }
      activePredictionsRankings {
        nextToken
        startedAt
      }
      predictionsByUser {
        nextToken
        startedAt
      }
      didReceiveNominationOrWin
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      categoryContendersId
      contenderMovieId
      contenderPersonId
      contenderSongId
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
        _version
        _deleted
        _lastChangedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncContenders = /* GraphQL */ `
  query SyncContenders(
    $filter: ModelContenderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncContenders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        categoryId
        didReceiveNominationOrWin
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      categoryId
      category {
        id
        name
        type
        eventId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        eventCategoriesId
      }
      numberOfUsersPredicting
      numberOfUsersPredictingWin
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncContenderSnapshots = /* GraphQL */ `
  query SyncContenderSnapshots(
    $filter: ModelContenderSnapshotFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncContenderSnapshots(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        contenderId
        categoryId
        numberOfUsersPredicting
        numberOfUsersPredictingWin
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getMovie = /* GraphQL */ `
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
      id
      tmdbId
      studio
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listMovies = /* GraphQL */ `
  query ListMovies(
    $id: ID
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMovies(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        tmdbId
        studio
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMovies = /* GraphQL */ `
  query SyncMovies(
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMovies(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        tmdbId
        studio
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getPerson = /* GraphQL */ `
  query GetPerson($id: ID!) {
    getPerson(id: $id) {
      id
      tmdbId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listPeople = /* GraphQL */ `
  query ListPeople(
    $id: ID
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPeople(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        tmdbId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPeople = /* GraphQL */ `
  query SyncPeople(
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPeople(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        tmdbId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSong = /* GraphQL */ `
  query GetSong($id: ID!) {
    getSong(id: $id) {
      id
      title
      artist
      movie {
        id
        tmdbId
        studio
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      songMovieId
    }
  }
`;
export const listSongs = /* GraphQL */ `
  query ListSongs(
    $id: ID
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSongs(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        title
        artist
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        songMovieId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSongs = /* GraphQL */ `
  query SyncSongs(
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSongs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        artist
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        songMovieId
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        userId
        predictionSetId
        contenderId
        ranking
        isActive
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        predictionSetPredictionsId
      }
      nextToken
      startedAt
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
        userId
        predictionSetId
        contenderId
        ranking
        isActive
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        predictionSetPredictionsId
      }
      nextToken
      startedAt
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
        userId
        predictionSetId
        contenderId
        ranking
        isActive
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        predictionSetPredictionsId
      }
      nextToken
      startedAt
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
        id
        userId
        eventId
        accuracy
        ranking
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userLeaderboardScoresId
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
