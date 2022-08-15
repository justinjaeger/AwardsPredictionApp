/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateRelationships = /* GraphQL */ `
  subscription OnCreateRelationships {
    onCreateRelationships {
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
export const onUpdateRelationships = /* GraphQL */ `
  subscription OnUpdateRelationships {
    onUpdateRelationships {
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
export const onDeleteRelationships = /* GraphQL */ `
  subscription OnDeleteRelationships {
    onDeleteRelationships {
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
export const onCreatePredictionSet = /* GraphQL */ `
  subscription OnCreatePredictionSet {
    onCreatePredictionSet {
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
export const onUpdatePredictionSet = /* GraphQL */ `
  subscription OnUpdatePredictionSet {
    onUpdatePredictionSet {
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
export const onDeletePredictionSet = /* GraphQL */ `
  subscription OnDeletePredictionSet {
    onDeletePredictionSet {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreateUserPredictingEvent = /* GraphQL */ `
  subscription OnCreateUserPredictingEvent {
    onCreateUserPredictingEvent {
      eventId
      userId
      createdAt
      updatedAt
      eventUsersPredictingId
    }
  }
`;
export const onUpdateUserPredictingEvent = /* GraphQL */ `
  subscription OnUpdateUserPredictingEvent {
    onUpdateUserPredictingEvent {
      eventId
      userId
      createdAt
      updatedAt
      eventUsersPredictingId
    }
  }
`;
export const onDeleteUserPredictingEvent = /* GraphQL */ `
  subscription OnDeleteUserPredictingEvent {
    onDeleteUserPredictingEvent {
      eventId
      userId
      createdAt
      updatedAt
      eventUsersPredictingId
    }
  }
`;
export const onCreateLeaderboardPosition = /* GraphQL */ `
  subscription OnCreateLeaderboardPosition {
    onCreateLeaderboardPosition {
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
export const onUpdateLeaderboardPosition = /* GraphQL */ `
  subscription OnUpdateLeaderboardPosition {
    onUpdateLeaderboardPosition {
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
export const onDeleteLeaderboardPosition = /* GraphQL */ `
  subscription OnDeleteLeaderboardPosition {
    onDeleteLeaderboardPosition {
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
export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie {
    onCreateMovie {
      imdbId
      year
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie {
    onUpdateMovie {
      imdbId
      year
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie {
    onDeleteMovie {
      imdbId
      year
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson {
    onCreatePerson {
      imdbId
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson {
    onUpdatePerson {
      imdbId
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson {
    onDeletePerson {
      imdbId
      image
      createdAt
      updatedAt
    }
  }
`;
