/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createRelationships = /* GraphQL */ `
  mutation CreateRelationships(
    $input: CreateRelationshipsInput!
    $condition: ModelRelationshipsConditionInput
  ) {
    createRelationships(input: $input, condition: $condition) {
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
export const updateRelationships = /* GraphQL */ `
  mutation UpdateRelationships(
    $input: UpdateRelationshipsInput!
    $condition: ModelRelationshipsConditionInput
  ) {
    updateRelationships(input: $input, condition: $condition) {
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
export const deleteRelationships = /* GraphQL */ `
  mutation DeleteRelationships(
    $input: DeleteRelationshipsInput!
    $condition: ModelRelationshipsConditionInput
  ) {
    deleteRelationships(input: $input, condition: $condition) {
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
export const createPredictionSet = /* GraphQL */ `
  mutation CreatePredictionSet(
    $input: CreatePredictionSetInput!
    $condition: ModelPredictionSetConditionInput
  ) {
    createPredictionSet(input: $input, condition: $condition) {
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
export const updatePredictionSet = /* GraphQL */ `
  mutation UpdatePredictionSet(
    $input: UpdatePredictionSetInput!
    $condition: ModelPredictionSetConditionInput
  ) {
    updatePredictionSet(input: $input, condition: $condition) {
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
export const deletePredictionSet = /* GraphQL */ `
  mutation DeletePredictionSet(
    $input: DeletePredictionSetInput!
    $condition: ModelPredictionSetConditionInput
  ) {
    deletePredictionSet(input: $input, condition: $condition) {
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
export const createPrediction = /* GraphQL */ `
  mutation CreatePrediction(
    $input: CreatePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    createPrediction(input: $input, condition: $condition) {
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
export const updatePrediction = /* GraphQL */ `
  mutation UpdatePrediction(
    $input: UpdatePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    updatePrediction(input: $input, condition: $condition) {
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
export const deletePrediction = /* GraphQL */ `
  mutation DeletePrediction(
    $input: DeletePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    deletePrediction(input: $input, condition: $condition) {
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createContender = /* GraphQL */ `
  mutation CreateContender(
    $input: CreateContenderInput!
    $condition: ModelContenderConditionInput
  ) {
    createContender(input: $input, condition: $condition) {
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
export const updateContender = /* GraphQL */ `
  mutation UpdateContender(
    $input: UpdateContenderInput!
    $condition: ModelContenderConditionInput
  ) {
    updateContender(input: $input, condition: $condition) {
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
export const deleteContender = /* GraphQL */ `
  mutation DeleteContender(
    $input: DeleteContenderInput!
    $condition: ModelContenderConditionInput
  ) {
    deleteContender(input: $input, condition: $condition) {
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
export const createMovie = /* GraphQL */ `
  mutation CreateMovie(
    $input: CreateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    createMovie(input: $input, condition: $condition) {
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
export const updateMovie = /* GraphQL */ `
  mutation UpdateMovie(
    $input: UpdateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    updateMovie(input: $input, condition: $condition) {
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
export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie(
    $input: DeleteMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    deleteMovie(input: $input, condition: $condition) {
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
export const createPerson = /* GraphQL */ `
  mutation CreatePerson(
    $input: CreatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    createPerson(input: $input, condition: $condition) {
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
export const updatePerson = /* GraphQL */ `
  mutation UpdatePerson(
    $input: UpdatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    updatePerson(input: $input, condition: $condition) {
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
export const deletePerson = /* GraphQL */ `
  mutation DeletePerson(
    $input: DeletePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    deletePerson(input: $input, condition: $condition) {
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
export const createSong = /* GraphQL */ `
  mutation CreateSong(
    $input: CreateSongInput!
    $condition: ModelSongConditionInput
  ) {
    createSong(input: $input, condition: $condition) {
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
export const updateSong = /* GraphQL */ `
  mutation UpdateSong(
    $input: UpdateSongInput!
    $condition: ModelSongConditionInput
  ) {
    updateSong(input: $input, condition: $condition) {
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
export const deleteSong = /* GraphQL */ `
  mutation DeleteSong(
    $input: DeleteSongInput!
    $condition: ModelSongConditionInput
  ) {
    deleteSong(input: $input, condition: $condition) {
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
