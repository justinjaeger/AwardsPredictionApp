/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateCommunityPredictions = /* GraphQL */ `
  mutation UpdateCommunityPredictions($msg: String) {
    updateCommunityPredictions(msg: $msg)
  }
`;
export const updateCommunityHistory = /* GraphQL */ `
  mutation UpdateCommunityHistory($msg: String) {
    updateCommunityHistory(msg: $msg)
  }
`;
export const updatePersonalHistory = /* GraphQL */ `
  mutation UpdatePersonalHistory($msg: String) {
    updatePersonalHistory(msg: $msg)
  }
`;
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
      predictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      historyPredictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      followers {
        items {
          id
          followedUserId
          followingUserId
          createdAt
          updatedAt
        }
        nextToken
      }
      following {
        items {
          id
          followedUserId
          followingUserId
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
      predictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      historyPredictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      followers {
        items {
          id
          followedUserId
          followingUserId
          createdAt
          updatedAt
        }
        nextToken
      }
      following {
        items {
          id
          followedUserId
          followingUserId
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
      predictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      historyPredictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      followers {
        items {
          id
          followedUserId
          followingUserId
          createdAt
          updatedAt
        }
        nextToken
      }
      following {
        items {
          id
          followedUserId
          followingUserId
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
export const createRelationship = /* GraphQL */ `
  mutation CreateRelationship(
    $input: CreateRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    createRelationship(input: $input, condition: $condition) {
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateRelationship = /* GraphQL */ `
  mutation UpdateRelationship(
    $input: UpdateRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    updateRelationship(input: $input, condition: $condition) {
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteRelationship = /* GraphQL */ `
  mutation DeleteRelationship(
    $input: DeleteRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    deleteRelationship(input: $input, condition: $condition) {
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        items {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        nextToken
      }
      awardsBody
      year
      nominationDateTime
      winDateTime
      status
      predictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      historyPredictions {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      categories {
        items {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        nextToken
      }
      awardsBody
      year
      nominationDateTime
      winDateTime
      status
      predictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      historyPredictions {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      categories {
        items {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        nextToken
      }
      awardsBody
      year
      nominationDateTime
      winDateTime
      status
      predictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      historyPredictions {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      type
      isShortlisted
      predictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      historyPredictions {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      type
      isShortlisted
      predictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      historyPredictions {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      type
      isShortlisted
      predictionSets {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      historyPredictions {
        items {
          id
          userId
          eventId
          categoryId
          type
          comment
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
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
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
      personId
      person {
        id
        tmdbId
        createdAt
        updatedAt
      }
      songId
      song {
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
      visibility
      accolade
      createdAt
      updatedAt
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
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
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
      personId
      person {
        id
        tmdbId
        createdAt
        updatedAt
      }
      songId
      song {
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
      visibility
      accolade
      createdAt
      updatedAt
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
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
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
      personId
      person {
        id
        tmdbId
        createdAt
        updatedAt
      }
      songId
      song {
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
      visibility
      accolade
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
      id
      contenders {
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
      tmdbId
      studio
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
      id
      contenders {
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
      tmdbId
      studio
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
      id
      contenders {
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
      tmdbId
      studio
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
      id
      tmdbId
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
      id
      tmdbId
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
      id
      tmdbId
      createdAt
      updatedAt
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
  }
`;
export const updateSong = /* GraphQL */ `
  mutation UpdateSong(
    $input: UpdateSongInput!
    $condition: ModelSongConditionInput
  ) {
    updateSong(input: $input, condition: $condition) {
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
  }
`;
export const deleteSong = /* GraphQL */ `
  mutation DeleteSong(
    $input: DeleteSongInput!
    $condition: ModelSongConditionInput
  ) {
    deleteSong(input: $input, condition: $condition) {
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
      user {
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          predictionSetId
          contenderId
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      comment
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
      user {
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          predictionSetId
          contenderId
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      comment
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
      user {
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          predictionSetId
          contenderId
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      comment
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
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
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
`;
export const updatePrediction = /* GraphQL */ `
  mutation UpdatePrediction(
    $input: UpdatePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    updatePrediction(input: $input, condition: $condition) {
      id
      predictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
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
`;
export const deletePrediction = /* GraphQL */ `
  mutation DeletePrediction(
    $input: DeletePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    deletePrediction(input: $input, condition: $condition) {
      id
      predictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
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
`;
export const createHistoryPredictionSet = /* GraphQL */ `
  mutation CreateHistoryPredictionSet(
    $input: CreateHistoryPredictionSetInput!
    $condition: ModelHistoryPredictionSetConditionInput
  ) {
    createHistoryPredictionSet(input: $input, condition: $condition) {
      id
      userId
      user {
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          historyPredictionSetId
          contenderId
          categoryId
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      comment
      createdAt
      updatedAt
    }
  }
`;
export const updateHistoryPredictionSet = /* GraphQL */ `
  mutation UpdateHistoryPredictionSet(
    $input: UpdateHistoryPredictionSetInput!
    $condition: ModelHistoryPredictionSetConditionInput
  ) {
    updateHistoryPredictionSet(input: $input, condition: $condition) {
      id
      userId
      user {
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          historyPredictionSetId
          contenderId
          categoryId
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      comment
      createdAt
      updatedAt
    }
  }
`;
export const deleteHistoryPredictionSet = /* GraphQL */ `
  mutation DeleteHistoryPredictionSet(
    $input: DeleteHistoryPredictionSetInput!
    $condition: ModelHistoryPredictionSetConditionInput
  ) {
    deleteHistoryPredictionSet(input: $input, condition: $condition) {
      id
      userId
      user {
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
        followers {
          nextToken
        }
        following {
          nextToken
        }
        createdAt
        updatedAt
      }
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          historyPredictionSetId
          contenderId
          categoryId
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      comment
      createdAt
      updatedAt
    }
  }
`;
export const createHistoryPrediction = /* GraphQL */ `
  mutation CreateHistoryPrediction(
    $input: CreateHistoryPredictionInput!
    $condition: ModelHistoryPredictionConditionInput
  ) {
    createHistoryPrediction(input: $input, condition: $condition) {
      id
      historyPredictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      ranking
      createdAt
      updatedAt
    }
  }
`;
export const updateHistoryPrediction = /* GraphQL */ `
  mutation UpdateHistoryPrediction(
    $input: UpdateHistoryPredictionInput!
    $condition: ModelHistoryPredictionConditionInput
  ) {
    updateHistoryPrediction(input: $input, condition: $condition) {
      id
      historyPredictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      ranking
      createdAt
      updatedAt
    }
  }
`;
export const deleteHistoryPrediction = /* GraphQL */ `
  mutation DeleteHistoryPrediction(
    $input: DeleteHistoryPredictionInput!
    $condition: ModelHistoryPredictionConditionInput
  ) {
    deleteHistoryPrediction(input: $input, condition: $condition) {
      id
      historyPredictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      ranking
      createdAt
      updatedAt
    }
  }
`;
export const createCommunityPredictionSet = /* GraphQL */ `
  mutation CreateCommunityPredictionSet(
    $input: CreateCommunityPredictionSetInput!
    $condition: ModelCommunityPredictionSetConditionInput
  ) {
    createCommunityPredictionSet(input: $input, condition: $condition) {
      id
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          communityPredictionSetId
          contenderId
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
  }
`;
export const updateCommunityPredictionSet = /* GraphQL */ `
  mutation UpdateCommunityPredictionSet(
    $input: UpdateCommunityPredictionSetInput!
    $condition: ModelCommunityPredictionSetConditionInput
  ) {
    updateCommunityPredictionSet(input: $input, condition: $condition) {
      id
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          communityPredictionSetId
          contenderId
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
  }
`;
export const deleteCommunityPredictionSet = /* GraphQL */ `
  mutation DeleteCommunityPredictionSet(
    $input: DeleteCommunityPredictionSetInput!
    $condition: ModelCommunityPredictionSetConditionInput
  ) {
    deleteCommunityPredictionSet(input: $input, condition: $condition) {
      id
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          communityPredictionSetId
          contenderId
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
  }
`;
export const createCommunityPrediction = /* GraphQL */ `
  mutation CreateCommunityPrediction(
    $input: CreateCommunityPredictionInput!
    $condition: ModelCommunityPredictionConditionInput
  ) {
    createCommunityPrediction(input: $input, condition: $condition) {
      id
      communityPredictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
      }
      ranking
      indexedRankings
      createdAt
      updatedAt
    }
  }
`;
export const updateCommunityPrediction = /* GraphQL */ `
  mutation UpdateCommunityPrediction(
    $input: UpdateCommunityPredictionInput!
    $condition: ModelCommunityPredictionConditionInput
  ) {
    updateCommunityPrediction(input: $input, condition: $condition) {
      id
      communityPredictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
      }
      ranking
      indexedRankings
      createdAt
      updatedAt
    }
  }
`;
export const deleteCommunityPrediction = /* GraphQL */ `
  mutation DeleteCommunityPrediction(
    $input: DeleteCommunityPredictionInput!
    $condition: ModelCommunityPredictionConditionInput
  ) {
    deleteCommunityPrediction(input: $input, condition: $condition) {
      id
      communityPredictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
      }
      ranking
      indexedRankings
      createdAt
      updatedAt
    }
  }
`;
export const createCommunityHistoryPredictionSet = /* GraphQL */ `
  mutation CreateCommunityHistoryPredictionSet(
    $input: CreateCommunityHistoryPredictionSetInput!
    $condition: ModelCommunityHistoryPredictionSetConditionInput
  ) {
    createCommunityHistoryPredictionSet(input: $input, condition: $condition) {
      id
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          communityHistoryPredictionSetId
          contenderId
          categoryId
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
  }
`;
export const updateCommunityHistoryPredictionSet = /* GraphQL */ `
  mutation UpdateCommunityHistoryPredictionSet(
    $input: UpdateCommunityHistoryPredictionSetInput!
    $condition: ModelCommunityHistoryPredictionSetConditionInput
  ) {
    updateCommunityHistoryPredictionSet(input: $input, condition: $condition) {
      id
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          communityHistoryPredictionSetId
          contenderId
          categoryId
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
  }
`;
export const deleteCommunityHistoryPredictionSet = /* GraphQL */ `
  mutation DeleteCommunityHistoryPredictionSet(
    $input: DeleteCommunityHistoryPredictionSetInput!
    $condition: ModelCommunityHistoryPredictionSetConditionInput
  ) {
    deleteCommunityHistoryPredictionSet(input: $input, condition: $condition) {
      id
      eventId
      event {
        id
        categories {
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      predictions {
        items {
          id
          communityHistoryPredictionSetId
          contenderId
          categoryId
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
  }
`;
export const createCommunityHistoryPrediction = /* GraphQL */ `
  mutation CreateCommunityHistoryPrediction(
    $input: CreateCommunityHistoryPredictionInput!
    $condition: ModelCommunityHistoryPredictionConditionInput
  ) {
    createCommunityHistoryPrediction(input: $input, condition: $condition) {
      id
      communityHistoryPredictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      ranking
      indexedRankings
      createdAt
      updatedAt
    }
  }
`;
export const updateCommunityHistoryPrediction = /* GraphQL */ `
  mutation UpdateCommunityHistoryPrediction(
    $input: UpdateCommunityHistoryPredictionInput!
    $condition: ModelCommunityHistoryPredictionConditionInput
  ) {
    updateCommunityHistoryPrediction(input: $input, condition: $condition) {
      id
      communityHistoryPredictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      ranking
      indexedRankings
      createdAt
      updatedAt
    }
  }
`;
export const deleteCommunityHistoryPrediction = /* GraphQL */ `
  mutation DeleteCommunityHistoryPrediction(
    $input: DeleteCommunityHistoryPredictionInput!
    $condition: ModelCommunityHistoryPredictionConditionInput
  ) {
    deleteCommunityHistoryPrediction(input: $input, condition: $condition) {
      id
      communityHistoryPredictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          eventId
          name
          type
          isShortlisted
          createdAt
          updatedAt
        }
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        movieId
        movie {
          id
          tmdbId
          studio
          createdAt
          updatedAt
        }
        personId
        person {
          id
          tmdbId
          createdAt
          updatedAt
        }
        songId
        song {
          id
          movieId
          title
          artist
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        eventId
        event {
          id
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        name
        type
        isShortlisted
        predictionSets {
          nextToken
        }
        historyPredictions {
          nextToken
        }
        createdAt
        updatedAt
      }
      ranking
      indexedRankings
      createdAt
      updatedAt
    }
  }
`;
