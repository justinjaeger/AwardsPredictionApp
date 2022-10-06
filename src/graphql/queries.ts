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
        followers {
          nextToken
        }
        following {
          nextToken
        }
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
        id
        email
        username
        name
        bio
        image
        role
        followers {
          nextToken
        }
        following {
          nextToken
        }
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
        role
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
        items {
          id
          userId
          predictionSetId
          contenderId
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
        predictions {
          nextToken
        }
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
      userId
      predictionSetId
      contenderId
      contender {
        id
        categoryId
        category {
          id
          name
          type
          eventId
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
        numberOfUsersPredictingWin
        numberOfUsersPredictingNom
        numberOfUsersPredictingUnranked
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
        contender {
          id
          categoryId
          didReceiveNominationOrWin
          numberOfUsersPredictingWin
          numberOfUsersPredictingNom
          numberOfUsersPredictingUnranked
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
      nextToken
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
          eventId
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
      nextToken
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
          categoryId
          didReceiveNominationOrWin
          numberOfUsersPredictingWin
          numberOfUsersPredictingNom
          numberOfUsersPredictingUnranked
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
          predictionSetId
          contenderId
          ranking
          createdAt
          updatedAt
          predictionSetPredictionsId
          contenderPredictionsId
        }
        nextToken
      }
      didReceiveNominationOrWin
      numberOfUsersPredictingWin
      numberOfUsersPredictingNom
      numberOfUsersPredictingUnranked
      createdAt
      updatedAt
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
        category {
          id
          name
          type
          eventId
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
        numberOfUsersPredictingWin
        numberOfUsersPredictingNom
        numberOfUsersPredictingUnranked
        createdAt
        updatedAt
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      nextToken
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
      }
      nextToken
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
      }
      nextToken
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
      }
      createdAt
      updatedAt
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
      nextToken
    }
  }
`;
