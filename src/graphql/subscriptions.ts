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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
        items {
          id
          userId
          ranking
          createdAt
          updatedAt
          predictionSetPredictionsId
          contenderPredictionsId
        }
        nextToken
      }
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
        items {
          id
          userId
          ranking
          createdAt
          updatedAt
          predictionSetPredictionsId
          contenderPredictionsId
        }
        nextToken
      }
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
        items {
          id
          userId
          ranking
          createdAt
          updatedAt
          predictionSetPredictionsId
          contenderPredictionsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePrediction = /* GraphQL */ `
  subscription OnCreatePrediction {
    onCreatePrediction {
      id
      userId
      contender {
        id
        category {
          id
          name
          type
          createdAt
          updatedAt
          eventCategoriesId
        }
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
        predictions {
          nextToken
        }
        didReceiveNominationOrWin
        createdAt
        updatedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      ranking
      createdAt
      updatedAt
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
      contender {
        id
        category {
          id
          name
          type
          createdAt
          updatedAt
          eventCategoriesId
        }
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
        predictions {
          nextToken
        }
        didReceiveNominationOrWin
        createdAt
        updatedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      ranking
      createdAt
      updatedAt
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
      contender {
        id
        category {
          id
          name
          type
          createdAt
          updatedAt
          eventCategoriesId
        }
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
        predictions {
          nextToken
        }
        didReceiveNominationOrWin
        createdAt
        updatedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      ranking
      createdAt
      updatedAt
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
        items {
          id
          name
          type
          createdAt
          updatedAt
          eventCategoriesId
        }
        nextToken
      }
      awardsBody
      year
      type
      expiration
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
        items {
          id
          name
          type
          createdAt
          updatedAt
          eventCategoriesId
        }
        nextToken
      }
      awardsBody
      year
      type
      expiration
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
        items {
          id
          name
          type
          createdAt
          updatedAt
          eventCategoriesId
        }
        nextToken
      }
      awardsBody
      year
      type
      expiration
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      id
      name
      type
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        type
        expiration
        isActive
        createdAt
        updatedAt
      }
      contenders {
        items {
          id
          didReceiveNominationOrWin
          createdAt
          updatedAt
          categoryContendersId
          contenderMovieId
          contenderPersonId
          contenderSongId
        }
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
      type
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        type
        expiration
        isActive
        createdAt
        updatedAt
      }
      contenders {
        items {
          id
          didReceiveNominationOrWin
          createdAt
          updatedAt
          categoryContendersId
          contenderMovieId
          contenderPersonId
          contenderSongId
        }
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
      type
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        type
        expiration
        isActive
        createdAt
        updatedAt
      }
      contenders {
        items {
          id
          didReceiveNominationOrWin
          createdAt
          updatedAt
          categoryContendersId
          contenderMovieId
          contenderPersonId
          contenderSongId
        }
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
      category {
        id
        name
        type
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
          id
          userId
          ranking
          createdAt
          updatedAt
          predictionSetPredictionsId
          contenderPredictionsId
        }
        nextToken
      }
      didReceiveNominationOrWin
      createdAt
      updatedAt
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
      category {
        id
        name
        type
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
          id
          userId
          ranking
          createdAt
          updatedAt
          predictionSetPredictionsId
          contenderPredictionsId
        }
        nextToken
      }
      didReceiveNominationOrWin
      createdAt
      updatedAt
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
      category {
        id
        name
        type
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
          id
          userId
          ranking
          createdAt
          updatedAt
          predictionSetPredictionsId
          contenderPredictionsId
        }
        nextToken
      }
      didReceiveNominationOrWin
      createdAt
      updatedAt
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
      }
      createdAt
      updatedAt
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
      }
      createdAt
      updatedAt
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
      }
      createdAt
      updatedAt
      songMovieId
    }
  }
`;
