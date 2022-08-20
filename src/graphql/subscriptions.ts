/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateRelationships = /* GraphQL */ `
  subscription OnCreateRelationships {
    onCreateRelationships {
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
export const onUpdateRelationships = /* GraphQL */ `
  subscription OnUpdateRelationships {
    onUpdateRelationships {
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
export const onDeleteRelationships = /* GraphQL */ `
  subscription OnDeleteRelationships {
    onDeleteRelationships {
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
export const onCreatePredictionSet = /* GraphQL */ `
  subscription OnCreatePredictionSet {
    onCreatePredictionSet {
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
export const onUpdatePredictionSet = /* GraphQL */ `
  subscription OnUpdatePredictionSet {
    onUpdatePredictionSet {
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
export const onDeletePredictionSet = /* GraphQL */ `
  subscription OnDeletePredictionSet {
    onDeletePredictionSet {
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
export const onCreatePrediction = /* GraphQL */ `
  subscription OnCreatePrediction {
    onCreatePrediction {
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
        _version
        _deleted
        _lastChangedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
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
export const onUpdatePrediction = /* GraphQL */ `
  subscription OnUpdatePrediction {
    onUpdatePrediction {
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
        _version
        _deleted
        _lastChangedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
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
export const onDeletePrediction = /* GraphQL */ `
  subscription OnDeletePrediction {
    onDeletePrediction {
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
        _version
        _deleted
        _lastChangedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreateUserPredictingEvent = /* GraphQL */ `
  subscription OnCreateUserPredictingEvent {
    onCreateUserPredictingEvent {
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
export const onUpdateUserPredictingEvent = /* GraphQL */ `
  subscription OnUpdateUserPredictingEvent {
    onUpdateUserPredictingEvent {
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
export const onDeleteUserPredictingEvent = /* GraphQL */ `
  subscription OnDeleteUserPredictingEvent {
    onDeleteUserPredictingEvent {
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
export const onCreateLeaderboardPosition = /* GraphQL */ `
  subscription OnCreateLeaderboardPosition {
    onCreateLeaderboardPosition {
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
export const onUpdateLeaderboardPosition = /* GraphQL */ `
  subscription OnUpdateLeaderboardPosition {
    onUpdateLeaderboardPosition {
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
export const onDeleteLeaderboardPosition = /* GraphQL */ `
  subscription OnDeleteLeaderboardPosition {
    onDeleteLeaderboardPosition {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateContender = /* GraphQL */ `
  subscription OnCreateContender {
    onCreateContender {
      id
      categoryId
      category {
        id
        name
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
        imdbId
        year
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      person {
        id
        imdbId
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
    }
  }
`;
export const onUpdateContender = /* GraphQL */ `
  subscription OnUpdateContender {
    onUpdateContender {
      id
      categoryId
      category {
        id
        name
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
        imdbId
        year
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      person {
        id
        imdbId
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
    }
  }
`;
export const onDeleteContender = /* GraphQL */ `
  subscription OnDeleteContender {
    onDeleteContender {
      id
      categoryId
      category {
        id
        name
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
        imdbId
        year
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      person {
        id
        imdbId
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
    }
  }
`;
export const onCreateContenderSnapshot = /* GraphQL */ `
  subscription OnCreateContenderSnapshot {
    onCreateContenderSnapshot {
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
      }
      categoryId
      category {
        id
        name
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
export const onUpdateContenderSnapshot = /* GraphQL */ `
  subscription OnUpdateContenderSnapshot {
    onUpdateContenderSnapshot {
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
      }
      categoryId
      category {
        id
        name
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
export const onDeleteContenderSnapshot = /* GraphQL */ `
  subscription OnDeleteContenderSnapshot {
    onDeleteContenderSnapshot {
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
      }
      categoryId
      category {
        id
        name
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
export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie {
    onCreateMovie {
      id
      imdbId
      year
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie {
    onUpdateMovie {
      id
      imdbId
      year
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie {
    onDeleteMovie {
      id
      imdbId
      year
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson {
    onCreatePerson {
      id
      imdbId
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson {
    onUpdatePerson {
      id
      imdbId
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson {
    onDeletePerson {
      id
      imdbId
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
