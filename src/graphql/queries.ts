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
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
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
        nextToken
      }
      awardsBody
      year
      contenders {
        items {
          id
          category {
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
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderPredictionsId
              predictionSetPredictionsId
              predictionUserId
            }
            nextToken
          }
          historyPredictions {
            items {
              id
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderHistoryPredictionsId
              historyPredictionSetPredictionsId
              historyPredictionUserId
            }
            nextToken
          }
          communityPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityPredictionsId
              communityPredictionSetPredictionsId
            }
            nextToken
          }
          communityHistoryPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityHistoryPredictionsId
              communityHistoryPredictionSetPredictionsId
            }
            nextToken
          }
          visibility
          createdAt
          updatedAt
          eventContendersId
          categoryContendersId
          contenderMovieId
          contenderPersonId
          contenderSongId
        }
        nextToken
      }
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
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          nextToken
        }
        awardsBody
        year
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          nextToken
        }
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
      event {
        id
        categories {
          items {
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
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          nextToken
        }
        awardsBody
        year
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          nextToken
        }
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
      }
      contenders {
        items {
          id
          category {
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
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderPredictionsId
              predictionSetPredictionsId
              predictionUserId
            }
            nextToken
          }
          historyPredictions {
            items {
              id
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderHistoryPredictionsId
              historyPredictionSetPredictionsId
              historyPredictionUserId
            }
            nextToken
          }
          communityPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityPredictionsId
              communityPredictionSetPredictionsId
            }
            nextToken
          }
          communityHistoryPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityHistoryPredictionsId
              communityHistoryPredictionSetPredictionsId
            }
            nextToken
          }
          visibility
          createdAt
          updatedAt
          eventContendersId
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
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
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
      nextToken
    }
  }
`;
export const getContender = /* GraphQL */ `
  query GetContender($id: ID!) {
    getContender(id: $id) {
      id
      category {
        id
        name
        type
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
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
      event {
        id
        categories {
          items {
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
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          nextToken
        }
        awardsBody
        year
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          nextToken
        }
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
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
          contender {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          ranking
          createdAt
          updatedAt
          contenderPredictionsId
          predictionSetPredictionsId
          predictionUserId
        }
        nextToken
      }
      historyPredictions {
        items {
          id
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
          contender {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          ranking
          createdAt
          updatedAt
          contenderHistoryPredictionsId
          historyPredictionSetPredictionsId
          historyPredictionUserId
        }
        nextToken
      }
      communityPredictions {
        items {
          id
          contender {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          ranking
          createdAt
          updatedAt
          contenderCommunityPredictionsId
          communityPredictionSetPredictionsId
        }
        nextToken
      }
      communityHistoryPredictions {
        items {
          id
          contender {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          ranking
          createdAt
          updatedAt
          contenderCommunityHistoryPredictionsId
          communityHistoryPredictionSetPredictionsId
        }
        nextToken
      }
      visibility
      createdAt
      updatedAt
      eventContendersId
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
        category {
          id
          name
          type
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
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
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderPredictionsId
            predictionSetPredictionsId
            predictionUserId
          }
          nextToken
        }
        historyPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderHistoryPredictionsId
            historyPredictionSetPredictionsId
            historyPredictionUserId
          }
          nextToken
        }
        communityPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityPredictionsId
            communityPredictionSetPredictionsId
          }
          nextToken
        }
        communityHistoryPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityHistoryPredictionsId
            communityHistoryPredictionSetPredictionsId
          }
          nextToken
        }
        visibility
        createdAt
        updatedAt
        eventContendersId
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
export const getPredictionSet = /* GraphQL */ `
  query GetPredictionSet($id: ID!) {
    getPredictionSet(id: $id) {
      id
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
      event {
        id
        categories {
          items {
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
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          nextToken
        }
        awardsBody
        year
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          nextToken
        }
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
      }
      category {
        id
        name
        type
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
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
      predictions {
        items {
          id
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
          contender {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          ranking
          createdAt
          updatedAt
          contenderPredictionsId
          predictionSetPredictionsId
          predictionUserId
        }
        nextToken
      }
      type
      createdAt
      updatedAt
      predictionSetUserId
      predictionSetEventId
      predictionSetCategoryId
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
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        category {
          id
          name
          type
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
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
        predictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderPredictionsId
            predictionSetPredictionsId
            predictionUserId
          }
          nextToken
        }
        type
        createdAt
        updatedAt
        predictionSetUserId
        predictionSetEventId
        predictionSetCategoryId
      }
      nextToken
    }
  }
`;
export const getPrediction = /* GraphQL */ `
  query GetPrediction($id: ID!) {
    getPrediction(id: $id) {
      id
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
      contender {
        id
        category {
          id
          name
          type
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
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
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderPredictionsId
            predictionSetPredictionsId
            predictionUserId
          }
          nextToken
        }
        historyPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderHistoryPredictionsId
            historyPredictionSetPredictionsId
            historyPredictionUserId
          }
          nextToken
        }
        communityPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityPredictionsId
            communityPredictionSetPredictionsId
          }
          nextToken
        }
        communityHistoryPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityHistoryPredictionsId
            communityHistoryPredictionSetPredictionsId
          }
          nextToken
        }
        visibility
        createdAt
        updatedAt
        eventContendersId
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      ranking
      createdAt
      updatedAt
      contenderPredictionsId
      predictionSetPredictionsId
      predictionUserId
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
        contender {
          id
          category {
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
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderPredictionsId
              predictionSetPredictionsId
              predictionUserId
            }
            nextToken
          }
          historyPredictions {
            items {
              id
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderHistoryPredictionsId
              historyPredictionSetPredictionsId
              historyPredictionUserId
            }
            nextToken
          }
          communityPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityPredictionsId
              communityPredictionSetPredictionsId
            }
            nextToken
          }
          communityHistoryPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityHistoryPredictionsId
              communityHistoryPredictionSetPredictionsId
            }
            nextToken
          }
          visibility
          createdAt
          updatedAt
          eventContendersId
          categoryContendersId
          contenderMovieId
          contenderPersonId
          contenderSongId
        }
        ranking
        createdAt
        updatedAt
        contenderPredictionsId
        predictionSetPredictionsId
        predictionUserId
      }
      nextToken
    }
  }
`;
export const getHistoryPredictionSet = /* GraphQL */ `
  query GetHistoryPredictionSet($id: ID!) {
    getHistoryPredictionSet(id: $id) {
      id
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
      event {
        id
        categories {
          items {
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
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          nextToken
        }
        awardsBody
        year
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          nextToken
        }
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
      }
      category {
        id
        name
        type
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
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
      predictions {
        items {
          id
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
          contender {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          ranking
          createdAt
          updatedAt
          contenderHistoryPredictionsId
          historyPredictionSetPredictionsId
          historyPredictionUserId
        }
        nextToken
      }
      type
      createdAt
      updatedAt
      historyPredictionSetUserId
      historyPredictionSetEventId
      historyPredictionSetCategoryId
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
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        category {
          id
          name
          type
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
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
        predictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderHistoryPredictionsId
            historyPredictionSetPredictionsId
            historyPredictionUserId
          }
          nextToken
        }
        type
        createdAt
        updatedAt
        historyPredictionSetUserId
        historyPredictionSetEventId
        historyPredictionSetCategoryId
      }
      nextToken
    }
  }
`;
export const getHistoryPrediction = /* GraphQL */ `
  query GetHistoryPrediction($id: ID!) {
    getHistoryPrediction(id: $id) {
      id
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
      contender {
        id
        category {
          id
          name
          type
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
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
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderPredictionsId
            predictionSetPredictionsId
            predictionUserId
          }
          nextToken
        }
        historyPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderHistoryPredictionsId
            historyPredictionSetPredictionsId
            historyPredictionUserId
          }
          nextToken
        }
        communityPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityPredictionsId
            communityPredictionSetPredictionsId
          }
          nextToken
        }
        communityHistoryPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityHistoryPredictionsId
            communityHistoryPredictionSetPredictionsId
          }
          nextToken
        }
        visibility
        createdAt
        updatedAt
        eventContendersId
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      ranking
      createdAt
      updatedAt
      contenderHistoryPredictionsId
      historyPredictionSetPredictionsId
      historyPredictionUserId
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
        contender {
          id
          category {
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
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderPredictionsId
              predictionSetPredictionsId
              predictionUserId
            }
            nextToken
          }
          historyPredictions {
            items {
              id
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderHistoryPredictionsId
              historyPredictionSetPredictionsId
              historyPredictionUserId
            }
            nextToken
          }
          communityPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityPredictionsId
              communityPredictionSetPredictionsId
            }
            nextToken
          }
          communityHistoryPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityHistoryPredictionsId
              communityHistoryPredictionSetPredictionsId
            }
            nextToken
          }
          visibility
          createdAt
          updatedAt
          eventContendersId
          categoryContendersId
          contenderMovieId
          contenderPersonId
          contenderSongId
        }
        ranking
        createdAt
        updatedAt
        contenderHistoryPredictionsId
        historyPredictionSetPredictionsId
        historyPredictionUserId
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
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          nextToken
        }
        awardsBody
        year
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          nextToken
        }
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
      }
      category {
        id
        name
        type
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
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
      predictions {
        items {
          id
          contender {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          ranking
          createdAt
          updatedAt
          contenderCommunityPredictionsId
          communityPredictionSetPredictionsId
        }
        nextToken
      }
      type
      createdAt
      updatedAt
      communityPredictionSetCategoryId
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        category {
          id
          name
          type
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
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
        predictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityPredictionsId
            communityPredictionSetPredictionsId
          }
          nextToken
        }
        type
        createdAt
        updatedAt
        communityPredictionSetCategoryId
      }
      nextToken
    }
  }
`;
export const getCommunityPrediction = /* GraphQL */ `
  query GetCommunityPrediction($id: ID!) {
    getCommunityPrediction(id: $id) {
      id
      contender {
        id
        category {
          id
          name
          type
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
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
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderPredictionsId
            predictionSetPredictionsId
            predictionUserId
          }
          nextToken
        }
        historyPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderHistoryPredictionsId
            historyPredictionSetPredictionsId
            historyPredictionUserId
          }
          nextToken
        }
        communityPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityPredictionsId
            communityPredictionSetPredictionsId
          }
          nextToken
        }
        communityHistoryPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityHistoryPredictionsId
            communityHistoryPredictionSetPredictionsId
          }
          nextToken
        }
        visibility
        createdAt
        updatedAt
        eventContendersId
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      ranking
      createdAt
      updatedAt
      contenderCommunityPredictionsId
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
        contender {
          id
          category {
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
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderPredictionsId
              predictionSetPredictionsId
              predictionUserId
            }
            nextToken
          }
          historyPredictions {
            items {
              id
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderHistoryPredictionsId
              historyPredictionSetPredictionsId
              historyPredictionUserId
            }
            nextToken
          }
          communityPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityPredictionsId
              communityPredictionSetPredictionsId
            }
            nextToken
          }
          communityHistoryPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityHistoryPredictionsId
              communityHistoryPredictionSetPredictionsId
            }
            nextToken
          }
          visibility
          createdAt
          updatedAt
          eventContendersId
          categoryContendersId
          contenderMovieId
          contenderPersonId
          contenderSongId
        }
        ranking
        createdAt
        updatedAt
        contenderCommunityPredictionsId
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
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          nextToken
        }
        awardsBody
        year
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          nextToken
        }
        nominationDateTime
        winDateTime
        status
        createdAt
        updatedAt
      }
      category {
        id
        name
        type
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        contenders {
          items {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
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
      predictions {
        items {
          id
          contender {
            id
            category {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            event {
              id
              categories {
                nextToken
              }
              awardsBody
              year
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
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
                ranking
                createdAt
                updatedAt
                contenderPredictionsId
                predictionSetPredictionsId
                predictionUserId
              }
              nextToken
            }
            historyPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderHistoryPredictionsId
                historyPredictionSetPredictionsId
                historyPredictionUserId
              }
              nextToken
            }
            communityPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityPredictionsId
                communityPredictionSetPredictionsId
              }
              nextToken
            }
            communityHistoryPredictions {
              items {
                id
                ranking
                createdAt
                updatedAt
                contenderCommunityHistoryPredictionsId
                communityHistoryPredictionSetPredictionsId
              }
              nextToken
            }
            visibility
            createdAt
            updatedAt
            eventContendersId
            categoryContendersId
            contenderMovieId
            contenderPersonId
            contenderSongId
          }
          ranking
          createdAt
          updatedAt
          contenderCommunityHistoryPredictionsId
          communityHistoryPredictionSetPredictionsId
        }
        nextToken
      }
      type
      createdAt
      updatedAt
      communityHistoryPredictionSetCategoryId
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
        }
        category {
          id
          name
          type
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
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
        predictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityHistoryPredictionsId
            communityHistoryPredictionSetPredictionsId
          }
          nextToken
        }
        type
        createdAt
        updatedAt
        communityHistoryPredictionSetCategoryId
      }
      nextToken
    }
  }
`;
export const getCommunityHistoryPrediction = /* GraphQL */ `
  query GetCommunityHistoryPrediction($id: ID!) {
    getCommunityHistoryPrediction(id: $id) {
      id
      contender {
        id
        category {
          id
          name
          type
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
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
        event {
          id
          categories {
            items {
              id
              name
              type
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
              contenders {
                nextToken
              }
              createdAt
              updatedAt
              eventCategoriesId
            }
            nextToken
          }
          awardsBody
          year
          contenders {
            items {
              id
              category {
                id
                name
                type
                createdAt
                updatedAt
                eventCategoriesId
              }
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            nextToken
          }
          nominationDateTime
          winDateTime
          status
          createdAt
          updatedAt
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderPredictionsId
            predictionSetPredictionsId
            predictionUserId
          }
          nextToken
        }
        historyPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderHistoryPredictionsId
            historyPredictionSetPredictionsId
            historyPredictionUserId
          }
          nextToken
        }
        communityPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityPredictionsId
            communityPredictionSetPredictionsId
          }
          nextToken
        }
        communityHistoryPredictions {
          items {
            id
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
              historyPredictions {
                nextToken
              }
              communityPredictions {
                nextToken
              }
              communityHistoryPredictions {
                nextToken
              }
              visibility
              createdAt
              updatedAt
              eventContendersId
              categoryContendersId
              contenderMovieId
              contenderPersonId
              contenderSongId
            }
            ranking
            createdAt
            updatedAt
            contenderCommunityHistoryPredictionsId
            communityHistoryPredictionSetPredictionsId
          }
          nextToken
        }
        visibility
        createdAt
        updatedAt
        eventContendersId
        categoryContendersId
        contenderMovieId
        contenderPersonId
        contenderSongId
      }
      ranking
      createdAt
      updatedAt
      contenderCommunityHistoryPredictionsId
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
        contender {
          id
          category {
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
              contenders {
                nextToken
              }
              nominationDateTime
              winDateTime
              status
              createdAt
              updatedAt
            }
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
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
          event {
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
            contenders {
              items {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              nextToken
            }
            nominationDateTime
            winDateTime
            status
            createdAt
            updatedAt
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderPredictionsId
              predictionSetPredictionsId
              predictionUserId
            }
            nextToken
          }
          historyPredictions {
            items {
              id
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
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderHistoryPredictionsId
              historyPredictionSetPredictionsId
              historyPredictionUserId
            }
            nextToken
          }
          communityPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityPredictionsId
              communityPredictionSetPredictionsId
            }
            nextToken
          }
          communityHistoryPredictions {
            items {
              id
              contender {
                id
                visibility
                createdAt
                updatedAt
                eventContendersId
                categoryContendersId
                contenderMovieId
                contenderPersonId
                contenderSongId
              }
              ranking
              createdAt
              updatedAt
              contenderCommunityHistoryPredictionsId
              communityHistoryPredictionSetPredictionsId
            }
            nextToken
          }
          visibility
          createdAt
          updatedAt
          eventContendersId
          categoryContendersId
          contenderMovieId
          contenderPersonId
          contenderSongId
        }
        ranking
        createdAt
        updatedAt
        contenderCommunityHistoryPredictionsId
        communityHistoryPredictionSetPredictionsId
      }
      nextToken
    }
  }
`;
