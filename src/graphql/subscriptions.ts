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
      userId
      predictionSetId
      contenderId
      contender {
        id
        categoryId
        didReceiveNominationOrWin
        numberOfUsersPredictingWin
        numberOfUsersPredictingNom
        numberOfUsersPredictingUnranked
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      predictionSetPredictionsId
      contenderPredictionsId
    }
  }
`;
export const onUpdatePrediction = /* GraphQL */ `
  subscription OnUpdatePrediction {
    onUpdatePrediction {
      id
      userId
      predictionSetId
      contenderId
      contender {
        id
        categoryId
        didReceiveNominationOrWin
        numberOfUsersPredictingWin
        numberOfUsersPredictingNom
        numberOfUsersPredictingUnranked
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      predictionSetPredictionsId
      contenderPredictionsId
    }
  }
`;
export const onDeletePrediction = /* GraphQL */ `
  subscription OnDeletePrediction {
    onDeletePrediction {
      id
      userId
      predictionSetId
      contenderId
      contender {
        id
        categoryId
        didReceiveNominationOrWin
        numberOfUsersPredictingWin
        numberOfUsersPredictingNom
        numberOfUsersPredictingUnranked
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      predictionSetPredictionsId
      contenderPredictionsId
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
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateContender = /* GraphQL */ `
  subscription OnCreateContender {
    onCreateContender {
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
      predictions {
        nextToken
        startedAt
      }
      didReceiveNominationOrWin
      numberOfUsersPredictingWin
      numberOfUsersPredictingNom
      numberOfUsersPredictingUnranked
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
export const onUpdateContender = /* GraphQL */ `
  subscription OnUpdateContender {
    onUpdateContender {
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
      predictions {
        nextToken
        startedAt
      }
      didReceiveNominationOrWin
      numberOfUsersPredictingWin
      numberOfUsersPredictingNom
      numberOfUsersPredictingUnranked
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
export const onDeleteContender = /* GraphQL */ `
  subscription OnDeleteContender {
    onDeleteContender {
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
      predictions {
        nextToken
        startedAt
      }
      didReceiveNominationOrWin
      numberOfUsersPredictingWin
      numberOfUsersPredictingNom
      numberOfUsersPredictingUnranked
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
export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie {
    onCreateMovie {
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
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie {
    onUpdateMovie {
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
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie {
    onDeleteMovie {
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
export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson {
    onCreatePerson {
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
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson {
    onUpdatePerson {
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
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson {
    onDeletePerson {
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
export const onCreateSong = /* GraphQL */ `
  subscription OnCreateSong {
    onCreateSong {
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
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong {
    onUpdateSong {
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
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong {
    onDeleteSong {
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
