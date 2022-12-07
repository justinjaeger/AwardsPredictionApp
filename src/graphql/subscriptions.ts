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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
          predictionSetPredictionsId
          historyPredictionSetPredictionsId
          contenderPredictionsId
          predictionUserId
        }
        nextToken
      }
      createdAt
      updatedAt
      predictionSetUserId
      predictionSetEventId
      predictionSetCategoryId
    }
  }
`;
export const onUpdatePredictionSet = /* GraphQL */ `
  subscription OnUpdatePredictionSet {
    onUpdatePredictionSet {
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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
          predictionSetPredictionsId
          historyPredictionSetPredictionsId
          contenderPredictionsId
          predictionUserId
        }
        nextToken
      }
      createdAt
      updatedAt
      predictionSetUserId
      predictionSetEventId
      predictionSetCategoryId
    }
  }
`;
export const onDeletePredictionSet = /* GraphQL */ `
  subscription OnDeletePredictionSet {
    onDeletePredictionSet {
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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
          predictionSetPredictionsId
          historyPredictionSetPredictionsId
          contenderPredictionsId
          predictionUserId
        }
        nextToken
      }
      createdAt
      updatedAt
      predictionSetUserId
      predictionSetEventId
      predictionSetCategoryId
    }
  }
`;
export const onCreateHistoryPredictionSet = /* GraphQL */ `
  subscription OnCreateHistoryPredictionSet {
    onCreateHistoryPredictionSet {
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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
          predictionSetPredictionsId
          historyPredictionSetPredictionsId
          contenderPredictionsId
          predictionUserId
        }
        nextToken
      }
      createdAt
      updatedAt
      historyPredictionSetUserId
      historyPredictionSetEventId
      historyPredictionSetCategoryId
    }
  }
`;
export const onUpdateHistoryPredictionSet = /* GraphQL */ `
  subscription OnUpdateHistoryPredictionSet {
    onUpdateHistoryPredictionSet {
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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
          predictionSetPredictionsId
          historyPredictionSetPredictionsId
          contenderPredictionsId
          predictionUserId
        }
        nextToken
      }
      createdAt
      updatedAt
      historyPredictionSetUserId
      historyPredictionSetEventId
      historyPredictionSetCategoryId
    }
  }
`;
export const onDeleteHistoryPredictionSet = /* GraphQL */ `
  subscription OnDeleteHistoryPredictionSet {
    onDeleteHistoryPredictionSet {
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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
          predictionSetPredictionsId
          historyPredictionSetPredictionsId
          contenderPredictionsId
          predictionUserId
        }
        nextToken
      }
      createdAt
      updatedAt
      historyPredictionSetUserId
      historyPredictionSetEventId
      historyPredictionSetCategoryId
    }
  }
`;
export const onCreatePrediction = /* GraphQL */ `
  subscription OnCreatePrediction {
    onCreatePrediction {
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
                didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
            predictionSetPredictionsId
            historyPredictionSetPredictionsId
            contenderPredictionsId
            predictionUserId
          }
          nextToken
        }
        didReceiveNominationOrWin
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
      predictionSetPredictionsId
      historyPredictionSetPredictionsId
      contenderPredictionsId
      predictionUserId
    }
  }
`;
export const onUpdatePrediction = /* GraphQL */ `
  subscription OnUpdatePrediction {
    onUpdatePrediction {
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
                didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
            predictionSetPredictionsId
            historyPredictionSetPredictionsId
            contenderPredictionsId
            predictionUserId
          }
          nextToken
        }
        didReceiveNominationOrWin
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
      predictionSetPredictionsId
      historyPredictionSetPredictionsId
      contenderPredictionsId
      predictionUserId
    }
  }
`;
export const onDeletePrediction = /* GraphQL */ `
  subscription OnDeletePrediction {
    onDeletePrediction {
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
                didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
            predictionSetPredictionsId
            historyPredictionSetPredictionsId
            contenderPredictionsId
            predictionUserId
          }
          nextToken
        }
        didReceiveNominationOrWin
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
      predictionSetPredictionsId
      historyPredictionSetPredictionsId
      contenderPredictionsId
      predictionUserId
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
                didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
              predictionSetPredictionsId
              historyPredictionSetPredictionsId
              contenderPredictionsId
              predictionUserId
            }
            nextToken
          }
          didReceiveNominationOrWin
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
                didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
              predictionSetPredictionsId
              historyPredictionSetPredictionsId
              contenderPredictionsId
              predictionUserId
            }
            nextToken
          }
          didReceiveNominationOrWin
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
                didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
              predictionSetPredictionsId
              historyPredictionSetPredictionsId
              contenderPredictionsId
              predictionUserId
            }
            nextToken
          }
          didReceiveNominationOrWin
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
              predictionSetPredictionsId
              historyPredictionSetPredictionsId
              contenderPredictionsId
              predictionUserId
            }
            nextToken
          }
          didReceiveNominationOrWin
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
              predictionSetPredictionsId
              historyPredictionSetPredictionsId
              contenderPredictionsId
              predictionUserId
            }
            nextToken
          }
          didReceiveNominationOrWin
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
              predictionSetPredictionsId
              historyPredictionSetPredictionsId
              contenderPredictionsId
              predictionUserId
            }
            nextToken
          }
          didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
          predictionSetPredictionsId
          historyPredictionSetPredictionsId
          contenderPredictionsId
          predictionUserId
        }
        nextToken
      }
      didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
          predictionSetPredictionsId
          historyPredictionSetPredictionsId
          contenderPredictionsId
          predictionUserId
        }
        nextToken
      }
      didReceiveNominationOrWin
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
              didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
                predictionSetPredictionsId
                historyPredictionSetPredictionsId
                contenderPredictionsId
                predictionUserId
              }
              nextToken
            }
            didReceiveNominationOrWin
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
          predictionSetPredictionsId
          historyPredictionSetPredictionsId
          contenderPredictionsId
          predictionUserId
        }
        nextToken
      }
      didReceiveNominationOrWin
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
