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
          name
          type
          eventId
          event {
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
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          eventCategoriesId
        }
        nextToken
      }
      awardsBody
      year
      nominationDateTime
      winDateTime
      status
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
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
          items {
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
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
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
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
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        eventCategoriesId
      }
      eventId
      event {
        id
        categories {
          items {
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          nextToken
        }
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
        contenders {
          items {
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
                nominationDateTime
                winDateTime
                status
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
              eventCategoriesId
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
              createdAt
              updatedAt
            }
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
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
              title
              artist
              movieId
              movie {
                id
                tmdbId
                studio
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            visibility
            accolade
            createdAt
            updatedAt
            movieContendersId
          }
          nextToken
        }
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
        title
        artist
        movieId
        movie {
          id
          tmdbId
          studio
          contenders {
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
                title
                artist
                movieId
                createdAt
                updatedAt
              }
              visibility
              accolade
              createdAt
              updatedAt
              movieContendersId
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      visibility
      accolade
      createdAt
      updatedAt
      movieContendersId
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
          event {
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
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          eventCategoriesId
        }
        eventId
        event {
          id
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
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
          contenders {
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
                title
                artist
                movieId
                createdAt
                updatedAt
              }
              visibility
              accolade
              createdAt
              updatedAt
              movieContendersId
            }
            nextToken
          }
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
          title
          artist
          movieId
          movie {
            id
            tmdbId
            studio
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
                movieContendersId
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
        movieContendersId
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
      contenders {
        items {
          id
          categoryId
          category {
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          eventId
          event {
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
                movieContendersId
              }
              nextToken
            }
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
            title
            artist
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          visibility
          accolade
          createdAt
          updatedAt
          movieContendersId
        }
        nextToken
      }
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
        contenders {
          items {
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
                nominationDateTime
                winDateTime
                status
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
              eventCategoriesId
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
              createdAt
              updatedAt
            }
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
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
              title
              artist
              movieId
              movie {
                id
                tmdbId
                studio
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            visibility
            accolade
            createdAt
            updatedAt
            movieContendersId
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
      movieId
      movie {
        id
        tmdbId
        studio
        contenders {
          items {
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
                nominationDateTime
                winDateTime
                status
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
              eventCategoriesId
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
              createdAt
              updatedAt
            }
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
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
              title
              artist
              movieId
              movie {
                id
                tmdbId
                studio
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            visibility
            accolade
            createdAt
            updatedAt
            movieContendersId
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
        movieId
        movie {
          id
          tmdbId
          studio
          contenders {
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
                title
                artist
                movieId
                createdAt
                updatedAt
              }
              visibility
              accolade
              createdAt
              updatedAt
              movieContendersId
            }
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
export const getPredictionSet = /* GraphQL */ `
  query GetPredictionSet($id: ID!) {
    getPredictionSet(id: $id) {
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
        createdAt
        updatedAt
      }
      eventId
      event {
        id
        categories {
          items {
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        name
        type
        eventId
        event {
          id
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        eventCategoriesId
      }
      predictions {
        items {
          id
          contenderId
          contender {
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
                nominationDateTime
                winDateTime
                status
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
              eventCategoriesId
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
              createdAt
              updatedAt
            }
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
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
              title
              artist
              movieId
              movie {
                id
                tmdbId
                studio
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            visibility
            accolade
            createdAt
            updatedAt
            movieContendersId
          }
          ranking
          createdAt
          updatedAt
          predictionSetPredictionsId
        }
        nextToken
      }
      type
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
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        categoryId
        category {
          id
          name
          type
          eventId
          event {
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
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          eventCategoriesId
        }
        predictions {
          items {
            id
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
                title
                artist
                movieId
                createdAt
                updatedAt
              }
              visibility
              accolade
              createdAt
              updatedAt
              movieContendersId
            }
            ranking
            createdAt
            updatedAt
            predictionSetPredictionsId
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
export const getPrediction = /* GraphQL */ `
  query GetPrediction($id: ID!) {
    getPrediction(id: $id) {
      id
      contenderId
      contender {
        id
        categoryId
        category {
          id
          name
          type
          eventId
          event {
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
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          eventCategoriesId
        }
        eventId
        event {
          id
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
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
          contenders {
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
                title
                artist
                movieId
                createdAt
                updatedAt
              }
              visibility
              accolade
              createdAt
              updatedAt
              movieContendersId
            }
            nextToken
          }
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
          title
          artist
          movieId
          movie {
            id
            tmdbId
            studio
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
                movieContendersId
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
        movieContendersId
      }
      ranking
      createdAt
      updatedAt
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
        contenderId
        contender {
          id
          categoryId
          category {
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          eventId
          event {
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
                movieContendersId
              }
              nextToken
            }
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
            title
            artist
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          visibility
          accolade
          createdAt
          updatedAt
          movieContendersId
        }
        ranking
        createdAt
        updatedAt
        predictionSetPredictionsId
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
        categories {
          items {
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        name
        type
        eventId
        event {
          id
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        eventCategoriesId
      }
      predictions {
        items {
          id
          contenderId
          contender {
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
                nominationDateTime
                winDateTime
                status
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
              eventCategoriesId
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
              createdAt
              updatedAt
            }
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
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
              title
              artist
              movieId
              movie {
                id
                tmdbId
                studio
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            visibility
            accolade
            createdAt
            updatedAt
            movieContendersId
          }
          ranking
          createdAt
          updatedAt
          historyPredictionSetPredictionsId
        }
        nextToken
      }
      type
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
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        categoryId
        category {
          id
          name
          type
          eventId
          event {
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
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          eventCategoriesId
        }
        predictions {
          items {
            id
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
                title
                artist
                movieId
                createdAt
                updatedAt
              }
              visibility
              accolade
              createdAt
              updatedAt
              movieContendersId
            }
            ranking
            createdAt
            updatedAt
            historyPredictionSetPredictionsId
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
export const getHistoryPrediction = /* GraphQL */ `
  query GetHistoryPrediction($id: ID!) {
    getHistoryPrediction(id: $id) {
      id
      contenderId
      contender {
        id
        categoryId
        category {
          id
          name
          type
          eventId
          event {
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
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          eventCategoriesId
        }
        eventId
        event {
          id
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
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
          contenders {
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
                title
                artist
                movieId
                createdAt
                updatedAt
              }
              visibility
              accolade
              createdAt
              updatedAt
              movieContendersId
            }
            nextToken
          }
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
          title
          artist
          movieId
          movie {
            id
            tmdbId
            studio
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
                movieContendersId
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
        movieContendersId
      }
      ranking
      createdAt
      updatedAt
      historyPredictionSetPredictionsId
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
        contenderId
        contender {
          id
          categoryId
          category {
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          eventId
          event {
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
                movieContendersId
              }
              nextToken
            }
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
            title
            artist
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          visibility
          accolade
          createdAt
          updatedAt
          movieContendersId
        }
        ranking
        createdAt
        updatedAt
        historyPredictionSetPredictionsId
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        name
        type
        eventId
        event {
          id
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        eventCategoriesId
      }
      predictions {
        items {
          id
          contenderId
          contender {
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
                nominationDateTime
                winDateTime
                status
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
              eventCategoriesId
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
              createdAt
              updatedAt
            }
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
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
              title
              artist
              movieId
              movie {
                id
                tmdbId
                studio
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            visibility
            accolade
            createdAt
            updatedAt
            movieContendersId
          }
          indexedRankings
          createdAt
          updatedAt
          communityPredictionSetPredictionsId
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
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        categoryId
        category {
          id
          name
          type
          eventId
          event {
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
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          eventCategoriesId
        }
        predictions {
          items {
            id
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
                title
                artist
                movieId
                createdAt
                updatedAt
              }
              visibility
              accolade
              createdAt
              updatedAt
              movieContendersId
            }
            indexedRankings
            createdAt
            updatedAt
            communityPredictionSetPredictionsId
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
      contenderId
      contender {
        id
        categoryId
        category {
          id
          name
          type
          eventId
          event {
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
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          eventCategoriesId
        }
        eventId
        event {
          id
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
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
          contenders {
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
                title
                artist
                movieId
                createdAt
                updatedAt
              }
              visibility
              accolade
              createdAt
              updatedAt
              movieContendersId
            }
            nextToken
          }
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
          title
          artist
          movieId
          movie {
            id
            tmdbId
            studio
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
                movieContendersId
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
        movieContendersId
      }
      indexedRankings
      createdAt
      updatedAt
      communityPredictionSetPredictionsId
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
        contenderId
        contender {
          id
          categoryId
          category {
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          eventId
          event {
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
                movieContendersId
              }
              nextToken
            }
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
            title
            artist
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          visibility
          accolade
          createdAt
          updatedAt
          movieContendersId
        }
        indexedRankings
        createdAt
        updatedAt
        communityPredictionSetPredictionsId
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          nextToken
        }
        awardsBody
        year
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        name
        type
        eventId
        event {
          id
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        eventCategoriesId
      }
      predictions {
        items {
          id
          contenderId
          contender {
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
                nominationDateTime
                winDateTime
                status
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
              eventCategoriesId
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
              createdAt
              updatedAt
            }
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
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
              title
              artist
              movieId
              movie {
                id
                tmdbId
                studio
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            visibility
            accolade
            createdAt
            updatedAt
            movieContendersId
          }
          indexedRankings
          createdAt
          updatedAt
          communityHistoryPredictionSetPredictionsId
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
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        categoryId
        category {
          id
          name
          type
          eventId
          event {
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
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          eventCategoriesId
        }
        predictions {
          items {
            id
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
                title
                artist
                movieId
                createdAt
                updatedAt
              }
              visibility
              accolade
              createdAt
              updatedAt
              movieContendersId
            }
            indexedRankings
            createdAt
            updatedAt
            communityHistoryPredictionSetPredictionsId
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
      contenderId
      contender {
        id
        categoryId
        category {
          id
          name
          type
          eventId
          event {
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
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          eventCategoriesId
        }
        eventId
        event {
          id
          categories {
            items {
              id
              name
              type
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
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
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
          contenders {
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
                title
                artist
                movieId
                createdAt
                updatedAt
              }
              visibility
              accolade
              createdAt
              updatedAt
              movieContendersId
            }
            nextToken
          }
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
          title
          artist
          movieId
          movie {
            id
            tmdbId
            studio
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
                movieContendersId
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        visibility
        accolade
        createdAt
        updatedAt
        movieContendersId
      }
      indexedRankings
      createdAt
      updatedAt
      communityHistoryPredictionSetPredictionsId
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
        contenderId
        contender {
          id
          categoryId
          category {
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
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            eventCategoriesId
          }
          eventId
          event {
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
                movieContendersId
              }
              nextToken
            }
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
            title
            artist
            movieId
            movie {
              id
              tmdbId
              studio
              contenders {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          visibility
          accolade
          createdAt
          updatedAt
          movieContendersId
        }
        indexedRankings
        createdAt
        updatedAt
        communityHistoryPredictionSetPredictionsId
      }
      nextToken
    }
  }
`;
