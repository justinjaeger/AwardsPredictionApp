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
        admin
        createdAt
        updatedAt
      }
      followingUser {
        id
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
        admin
        createdAt
        updatedAt
      }
      followingUser {
        id
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
        admin
        createdAt
        updatedAt
      }
      followingUser {
        id
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
      }
      isActive
      createdAt
      updatedAt
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
      }
      isActive
      createdAt
      updatedAt
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
      }
      isActive
      createdAt
      updatedAt
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
export const updatePrediction = /* GraphQL */ `
  mutation UpdatePrediction(
    $input: UpdatePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    updatePrediction(input: $input, condition: $condition) {
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
export const deletePrediction = /* GraphQL */ `
  mutation DeletePrediction(
    $input: DeletePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    deletePrediction(input: $input, condition: $condition) {
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createUserPredictingEvent = /* GraphQL */ `
  mutation CreateUserPredictingEvent(
    $input: CreateUserPredictingEventInput!
    $condition: ModelUserPredictingEventConditionInput
  ) {
    createUserPredictingEvent(input: $input, condition: $condition) {
      eventId
      userId
      createdAt
      updatedAt
      eventUsersPredictingId
    }
  }
`;
export const updateUserPredictingEvent = /* GraphQL */ `
  mutation UpdateUserPredictingEvent(
    $input: UpdateUserPredictingEventInput!
    $condition: ModelUserPredictingEventConditionInput
  ) {
    updateUserPredictingEvent(input: $input, condition: $condition) {
      eventId
      userId
      createdAt
      updatedAt
      eventUsersPredictingId
    }
  }
`;
export const deleteUserPredictingEvent = /* GraphQL */ `
  mutation DeleteUserPredictingEvent(
    $input: DeleteUserPredictingEventInput!
    $condition: ModelUserPredictingEventConditionInput
  ) {
    deleteUserPredictingEvent(input: $input, condition: $condition) {
      eventId
      userId
      createdAt
      updatedAt
      eventUsersPredictingId
    }
  }
`;
export const createLeaderboardPosition = /* GraphQL */ `
  mutation CreateLeaderboardPosition(
    $input: CreateLeaderboardPositionInput!
    $condition: ModelLeaderboardPositionConditionInput
  ) {
    createLeaderboardPosition(input: $input, condition: $condition) {
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
        id
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
export const updateLeaderboardPosition = /* GraphQL */ `
  mutation UpdateLeaderboardPosition(
    $input: UpdateLeaderboardPositionInput!
    $condition: ModelLeaderboardPositionConditionInput
  ) {
    updateLeaderboardPosition(input: $input, condition: $condition) {
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
        id
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
export const deleteLeaderboardPosition = /* GraphQL */ `
  mutation DeleteLeaderboardPosition(
    $input: DeleteLeaderboardPositionInput!
    $condition: ModelLeaderboardPositionConditionInput
  ) {
    deleteLeaderboardPosition(input: $input, condition: $condition) {
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
        id
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createContenderSnapshot = /* GraphQL */ `
  mutation CreateContenderSnapshot(
    $input: CreateContenderSnapshotInput!
    $condition: ModelContenderSnapshotConditionInput
  ) {
    createContenderSnapshot(input: $input, condition: $condition) {
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
export const updateContenderSnapshot = /* GraphQL */ `
  mutation UpdateContenderSnapshot(
    $input: UpdateContenderSnapshotInput!
    $condition: ModelContenderSnapshotConditionInput
  ) {
    updateContenderSnapshot(input: $input, condition: $condition) {
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
export const deleteContenderSnapshot = /* GraphQL */ `
  mutation DeleteContenderSnapshot(
    $input: DeleteContenderSnapshotInput!
    $condition: ModelContenderSnapshotConditionInput
  ) {
    deleteContenderSnapshot(input: $input, condition: $condition) {
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
export const createMovie = /* GraphQL */ `
  mutation CreateMovie(
    $input: CreateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    createMovie(input: $input, condition: $condition) {
      imdbId
      year
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateMovie = /* GraphQL */ `
  mutation UpdateMovie(
    $input: UpdateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    updateMovie(input: $input, condition: $condition) {
      imdbId
      year
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie(
    $input: DeleteMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    deleteMovie(input: $input, condition: $condition) {
      imdbId
      year
      image
      createdAt
      updatedAt
    }
  }
`;
export const createPerson = /* GraphQL */ `
  mutation CreatePerson(
    $input: CreatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    createPerson(input: $input, condition: $condition) {
      imdbId
      image
      createdAt
      updatedAt
    }
  }
`;
export const updatePerson = /* GraphQL */ `
  mutation UpdatePerson(
    $input: UpdatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    updatePerson(input: $input, condition: $condition) {
      imdbId
      image
      createdAt
      updatedAt
    }
  }
`;
export const deletePerson = /* GraphQL */ `
  mutation DeletePerson(
    $input: DeletePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    deletePerson(input: $input, condition: $condition) {
      imdbId
      image
      createdAt
      updatedAt
    }
  }
`;
