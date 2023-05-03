/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: [SearchableUserSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAggregationInput]
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        email
        oauthId
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
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const searchRelationships = /* GraphQL */ `
  query SearchRelationships(
    $filter: SearchableRelationshipFilterInput
    $sort: [SearchableRelationshipSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableRelationshipAggregationInput]
  ) {
    searchRelationships(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        followedUserId
        followedUser {
          id
          email
          oauthId
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
          oauthId
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
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      oauthId
      username
      name
      bio
      image
      role
      predictionSets {
        items {
          id
          userId
          user {
            id
            email
            oauthId
            username
            name
            bio
            image
            role
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
            liveAt
            createdAt
            updatedAt
          }
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
          predictions {
            nextToken
          }
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
          user {
            id
            email
            oauthId
            username
            name
            bio
            image
            role
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
            liveAt
            createdAt
            updatedAt
          }
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
          predictions {
            nextToken
          }
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
          followedUser {
            id
            email
            oauthId
            username
            name
            bio
            image
            role
            createdAt
            updatedAt
          }
          followingUserId
          followingUser {
            id
            email
            oauthId
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
      following {
        items {
          id
          followedUserId
          followedUser {
            id
            email
            oauthId
            username
            name
            bio
            image
            role
            createdAt
            updatedAt
          }
          followingUserId
          followingUser {
            id
            email
            oauthId
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
        oauthId
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
      nextToken
    }
  }
`;
export const getRelationship = /* GraphQL */ `
  query GetRelationship($id: ID!) {
    getRelationship(id: $id) {
      id
      followedUserId
      followedUser {
        id
        email
        oauthId
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
      followingUserId
      followingUser {
        id
        email
        oauthId
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
      createdAt
      updatedAt
    }
  }
`;
export const listRelationships = /* GraphQL */ `
  query ListRelationships(
    $id: ID
    $filter: ModelRelationshipFilterInput
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
        followedUser {
          id
          email
          oauthId
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
          oauthId
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
          eventId
          event {
            id
            awardsBody
            year
            nominationDateTime
            winDateTime
            status
            liveAt
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
          user {
            id
            email
            oauthId
            username
            name
            bio
            image
            role
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
            liveAt
            createdAt
            updatedAt
          }
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
          predictions {
            nextToken
          }
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
          user {
            id
            email
            oauthId
            username
            name
            bio
            image
            role
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
            liveAt
            createdAt
            updatedAt
          }
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
          predictions {
            nextToken
          }
          type
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      liveAt
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
        liveAt
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
      eventId
      event {
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
        liveAt
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
          user {
            id
            email
            oauthId
            username
            name
            bio
            image
            role
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
            liveAt
            createdAt
            updatedAt
          }
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
          predictions {
            nextToken
          }
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
          user {
            id
            email
            oauthId
            username
            name
            bio
            image
            role
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
            liveAt
            createdAt
            updatedAt
          }
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
          predictions {
            nextToken
          }
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
          liveAt
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
          liveAt
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
      eventId
      event {
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
        liveAt
        createdAt
        updatedAt
      }
      movieId
      movie {
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
      visibility
      accolade
      createdAt
      updatedAt
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
          eventId
          event {
            id
            awardsBody
            year
            nominationDateTime
            winDateTime
            status
            liveAt
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
          liveAt
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
      nextToken
    }
  }
`;
export const getMovie = /* GraphQL */ `
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
      id
      contenders {
        items {
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
            liveAt
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
        nextToken
      }
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
      movieId
      movie {
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
      title
      artist
      createdAt
      updatedAt
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
      nextToken
    }
  }
`;
export const getPredictionSet = /* GraphQL */ `
  query GetPredictionSet($id: ID!) {
    getPredictionSet(id: $id) {
      id
      userId
      user {
        id
        email
        oauthId
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
      eventId
      event {
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
        liveAt
        createdAt
        updatedAt
      }
      categoryId
      category {
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
          liveAt
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
      predictions {
        items {
          id
          predictionSetId
          contenderId
          contender {
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
        user {
          id
          email
          oauthId
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const getPrediction = /* GraphQL */ `
  query GetPrediction($id: ID!) {
    getPrediction(id: $id) {
      id
      predictionSetId
      contenderId
      contender {
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
            liveAt
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
          liveAt
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
      ranking
      createdAt
      updatedAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const getHistoryPredictionSet = /* GraphQL */ `
  query GetHistoryPredictionSet($id: ID!) {
    getHistoryPredictionSet(id: $id) {
      id
      userId
      user {
        id
        email
        oauthId
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
      eventId
      event {
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
        liveAt
        createdAt
        updatedAt
      }
      categoryId
      category {
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
          liveAt
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
      predictions {
        items {
          id
          historyPredictionSetId
          contenderId
          contender {
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
export const listHistoryPredictionSets = /* GraphQL */ `
  query ListHistoryPredictionSets(
    $id: ID
    $filter: ModelHistoryPredictionSetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listHistoryPredictionSets(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userId
        user {
          id
          email
          oauthId
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const getHistoryPrediction = /* GraphQL */ `
  query GetHistoryPrediction($id: ID!) {
    getHistoryPrediction(id: $id) {
      id
      historyPredictionSetId
      contenderId
      contender {
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
            liveAt
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
          liveAt
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
      categoryId
      category {
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
          liveAt
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
      ranking
      createdAt
      updatedAt
    }
  }
`;
export const listHistoryPredictions = /* GraphQL */ `
  query ListHistoryPredictions(
    $id: ID
    $filter: ModelHistoryPredictionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listHistoryPredictions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
            liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const getCommunityPredictionSet = /* GraphQL */ `
  query GetCommunityPredictionSet($id: ID!) {
    getCommunityPredictionSet(id: $id) {
      id
      eventId
      event {
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
        liveAt
        createdAt
        updatedAt
      }
      categoryId
      category {
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
          liveAt
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
      predictions {
        items {
          id
          communityPredictionSetId
          contenderId
          contender {
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
export const listCommunityPredictionSets = /* GraphQL */ `
  query ListCommunityPredictionSets(
    $id: ID
    $filter: ModelCommunityPredictionSetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommunityPredictionSets(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const getCommunityPrediction = /* GraphQL */ `
  query GetCommunityPrediction($id: ID!) {
    getCommunityPrediction(id: $id) {
      id
      communityPredictionSetId
      contenderId
      contender {
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
            liveAt
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
          liveAt
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
      ranking
      indexedRankings
      createdAt
      updatedAt
    }
  }
`;
export const listCommunityPredictions = /* GraphQL */ `
  query ListCommunityPredictions(
    $id: ID
    $filter: ModelCommunityPredictionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommunityPredictions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
            liveAt
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
      nextToken
    }
  }
`;
export const getCommunityHistoryPredictionSet = /* GraphQL */ `
  query GetCommunityHistoryPredictionSet($id: ID!) {
    getCommunityHistoryPredictionSet(id: $id) {
      id
      eventId
      event {
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
        liveAt
        createdAt
        updatedAt
      }
      categoryId
      category {
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
          liveAt
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
      predictions {
        items {
          id
          communityHistoryPredictionSetId
          contenderId
          contender {
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
export const listCommunityHistoryPredictionSets = /* GraphQL */ `
  query ListCommunityHistoryPredictionSets(
    $id: ID
    $filter: ModelCommunityHistoryPredictionSetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommunityHistoryPredictionSets(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const getCommunityHistoryPrediction = /* GraphQL */ `
  query GetCommunityHistoryPrediction($id: ID!) {
    getCommunityHistoryPrediction(id: $id) {
      id
      communityHistoryPredictionSetId
      contenderId
      contender {
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
            liveAt
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
          liveAt
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
      categoryId
      category {
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
          liveAt
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
      ranking
      indexedRankings
      createdAt
      updatedAt
    }
  }
`;
export const listCommunityHistoryPredictions = /* GraphQL */ `
  query ListCommunityHistoryPredictions(
    $id: ID
    $filter: ModelCommunityHistoryPredictionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommunityHistoryPredictions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
            liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        oauthId
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
      nextToken
    }
  }
`;
export const userByOauthId = /* GraphQL */ `
  query UserByOauthId(
    $oauthId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByOauthId(
      oauthId: $oauthId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        oauthId
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
      nextToken
    }
  }
`;
export const userByUsername = /* GraphQL */ `
  query UserByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        oauthId
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
      nextToken
    }
  }
`;
export const relationshipByFollowedUserId = /* GraphQL */ `
  query RelationshipByFollowedUserId(
    $followedUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    relationshipByFollowedUserId(
      followedUserId: $followedUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        followedUserId
        followedUser {
          id
          email
          oauthId
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
          oauthId
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
      nextToken
    }
  }
`;
export const uniqueRelationshipViaFollowedUser = /* GraphQL */ `
  query UniqueRelationshipViaFollowedUser(
    $followedUserId: ID!
    $followingUserId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    uniqueRelationshipViaFollowedUser(
      followedUserId: $followedUserId
      followingUserId: $followingUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        followedUserId
        followedUser {
          id
          email
          oauthId
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
          oauthId
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
      nextToken
    }
  }
`;
export const relationshipByFollowingUserId = /* GraphQL */ `
  query RelationshipByFollowingUserId(
    $followingUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    relationshipByFollowingUserId(
      followingUserId: $followingUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        followedUserId
        followedUser {
          id
          email
          oauthId
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
          oauthId
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
      nextToken
    }
  }
`;
export const categoryByEvent = /* GraphQL */ `
  query CategoryByEvent(
    $eventId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    categoryByEvent(
      eventId: $eventId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          liveAt
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
      nextToken
    }
  }
`;
export const getUniqueContender = /* GraphQL */ `
  query GetUniqueContender(
    $eventId: ID!
    $movieIdPersonIdSongId: ModelContenderGetUniqueContenderCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContenderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUniqueContender(
      eventId: $eventId
      movieIdPersonIdSongId: $movieIdPersonIdSongId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            liveAt
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
          liveAt
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
      nextToken
    }
  }
`;
export const contenderByMovie = /* GraphQL */ `
  query ContenderByMovie(
    $movieId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelContenderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contenderByMovie(
      movieId: $movieId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            liveAt
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
          liveAt
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
      nextToken
    }
  }
`;
export const predictionSetByUserIdAndEventId = /* GraphQL */ `
  query PredictionSetByUserIdAndEventId(
    $userId: ID!
    $eventId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    predictionSetByUserIdAndEventId(
      userId: $userId
      eventId: $eventId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        user {
          id
          email
          oauthId
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const predictionSetByUserIdAndCategoryId = /* GraphQL */ `
  query PredictionSetByUserIdAndCategoryId(
    $userId: ID!
    $categoryId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    predictionSetByUserIdAndCategoryId(
      userId: $userId
      categoryId: $categoryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        user {
          id
          email
          oauthId
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const predictionSetByUserIdAndCreatedAt = /* GraphQL */ `
  query PredictionSetByUserIdAndCreatedAt(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    predictionSetByUserIdAndCreatedAt(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        user {
          id
          email
          oauthId
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const predictionSetByEventId = /* GraphQL */ `
  query PredictionSetByEventId(
    $eventId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    predictionSetByEventId(
      eventId: $eventId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        user {
          id
          email
          oauthId
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const predictionByPredictionSetId = /* GraphQL */ `
  query PredictionByPredictionSetId(
    $predictionSetId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPredictionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    predictionByPredictionSetId(
      predictionSetId: $predictionSetId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            liveAt
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
      nextToken
    }
  }
`;
export const historyPredictionSetByUserIdAndCreatedAt = /* GraphQL */ `
  query HistoryPredictionSetByUserIdAndCreatedAt(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    historyPredictionSetByUserIdAndCreatedAt(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        user {
          id
          email
          oauthId
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const historyPredictionSetByUserIdAndEventIdAndCreatedAt = /* GraphQL */ `
  query HistoryPredictionSetByUserIdAndEventIdAndCreatedAt(
    $userId: ID!
    $eventIdCreatedAt: ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    historyPredictionSetByUserIdAndEventIdAndCreatedAt(
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
        user {
          id
          email
          oauthId
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const historyPredictionSetByUserIdAndCategoryIdAndCreatedAt = /* GraphQL */ `
  query HistoryPredictionSetByUserIdAndCategoryIdAndCreatedAt(
    $userId: ID!
    $categoryIdCreatedAt: ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndCategoryIdAndCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    historyPredictionSetByUserIdAndCategoryIdAndCreatedAt(
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
        user {
          id
          email
          oauthId
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const historyPredictionSetByCategoryId = /* GraphQL */ `
  query HistoryPredictionSetByCategoryId(
    $categoryId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    historyPredictionSetByCategoryId(
      categoryId: $categoryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        user {
          id
          email
          oauthId
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const historyPredictionByHistoryPredictionSetId = /* GraphQL */ `
  query HistoryPredictionByHistoryPredictionSetId(
    $historyPredictionSetId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryPredictionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    historyPredictionByHistoryPredictionSetId(
      historyPredictionSetId: $historyPredictionSetId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const historyPredictionByCategoryId = /* GraphQL */ `
  query HistoryPredictionByCategoryId(
    $categoryId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryPredictionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    historyPredictionByCategoryId(
      categoryId: $categoryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const communityPredictionSetByEventId = /* GraphQL */ `
  query CommunityPredictionSetByEventId(
    $eventId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommunityPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    communityPredictionSetByEventId(
      eventId: $eventId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const communityPredictionByCommunityPredictionSetId = /* GraphQL */ `
  query CommunityPredictionByCommunityPredictionSetId(
    $communityPredictionSetId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommunityPredictionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    communityPredictionByCommunityPredictionSetId(
      communityPredictionSetId: $communityPredictionSetId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            liveAt
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
      nextToken
    }
  }
`;
export const communityHistoryPredictionSetsByEventIdAndCreatedAt = /* GraphQL */ `
  query CommunityHistoryPredictionSetsByEventIdAndCreatedAt(
    $eventId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommunityHistoryPredictionSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    communityHistoryPredictionSetsByEventIdAndCreatedAt(
      eventId: $eventId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const communityHistoryPredictionByCommunityHistoryPredictionSetId = /* GraphQL */ `
  query CommunityHistoryPredictionByCommunityHistoryPredictionSetId(
    $communityHistoryPredictionSetId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommunityHistoryPredictionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    communityHistoryPredictionByCommunityHistoryPredictionSetId(
      communityHistoryPredictionSetId: $communityHistoryPredictionSetId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
export const communityHistoryPredictionByCategoryId = /* GraphQL */ `
  query CommunityHistoryPredictionByCategoryId(
    $categoryId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommunityHistoryPredictionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    communityHistoryPredictionByCategoryId(
      categoryId: $categoryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            liveAt
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
            liveAt
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
      nextToken
    }
  }
`;
