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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie {
    onCreateMovie {
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
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie {
    onUpdateMovie {
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
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie {
    onDeleteMovie {
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
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong {
    onUpdateSong {
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
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong {
    onDeleteSong {
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
export const onCreatePredictionSet = /* GraphQL */ `
  subscription OnCreatePredictionSet {
    onCreatePredictionSet {
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
export const onUpdatePredictionSet = /* GraphQL */ `
  subscription OnUpdatePredictionSet {
    onUpdatePredictionSet {
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
export const onDeletePredictionSet = /* GraphQL */ `
  subscription OnDeletePredictionSet {
    onDeletePredictionSet {
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
export const onCreatePrediction = /* GraphQL */ `
  subscription OnCreatePrediction {
    onCreatePrediction {
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
export const onUpdatePrediction = /* GraphQL */ `
  subscription OnUpdatePrediction {
    onUpdatePrediction {
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
export const onDeletePrediction = /* GraphQL */ `
  subscription OnDeletePrediction {
    onDeletePrediction {
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
export const onCreateHistoryPredictionSet = /* GraphQL */ `
  subscription OnCreateHistoryPredictionSet {
    onCreateHistoryPredictionSet {
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
export const onUpdateHistoryPredictionSet = /* GraphQL */ `
  subscription OnUpdateHistoryPredictionSet {
    onUpdateHistoryPredictionSet {
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
export const onDeleteHistoryPredictionSet = /* GraphQL */ `
  subscription OnDeleteHistoryPredictionSet {
    onDeleteHistoryPredictionSet {
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
export const onCreateHistoryPrediction = /* GraphQL */ `
  subscription OnCreateHistoryPrediction {
    onCreateHistoryPrediction {
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
export const onUpdateHistoryPrediction = /* GraphQL */ `
  subscription OnUpdateHistoryPrediction {
    onUpdateHistoryPrediction {
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
export const onDeleteHistoryPrediction = /* GraphQL */ `
  subscription OnDeleteHistoryPrediction {
    onDeleteHistoryPrediction {
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
export const onCreateCommunityPredictionSet = /* GraphQL */ `
  subscription OnCreateCommunityPredictionSet {
    onCreateCommunityPredictionSet {
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
export const onUpdateCommunityPredictionSet = /* GraphQL */ `
  subscription OnUpdateCommunityPredictionSet {
    onUpdateCommunityPredictionSet {
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
export const onDeleteCommunityPredictionSet = /* GraphQL */ `
  subscription OnDeleteCommunityPredictionSet {
    onDeleteCommunityPredictionSet {
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
export const onCreateCommunityPrediction = /* GraphQL */ `
  subscription OnCreateCommunityPrediction {
    onCreateCommunityPrediction {
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
export const onUpdateCommunityPrediction = /* GraphQL */ `
  subscription OnUpdateCommunityPrediction {
    onUpdateCommunityPrediction {
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
export const onDeleteCommunityPrediction = /* GraphQL */ `
  subscription OnDeleteCommunityPrediction {
    onDeleteCommunityPrediction {
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
export const onCreateCommunityHistoryPredictionSet = /* GraphQL */ `
  subscription OnCreateCommunityHistoryPredictionSet {
    onCreateCommunityHistoryPredictionSet {
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
export const onUpdateCommunityHistoryPredictionSet = /* GraphQL */ `
  subscription OnUpdateCommunityHistoryPredictionSet {
    onUpdateCommunityHistoryPredictionSet {
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
export const onDeleteCommunityHistoryPredictionSet = /* GraphQL */ `
  subscription OnDeleteCommunityHistoryPredictionSet {
    onDeleteCommunityHistoryPredictionSet {
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
export const onCreateCommunityHistoryPrediction = /* GraphQL */ `
  subscription OnCreateCommunityHistoryPrediction {
    onCreateCommunityHistoryPrediction {
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
export const onUpdateCommunityHistoryPrediction = /* GraphQL */ `
  subscription OnUpdateCommunityHistoryPrediction {
    onUpdateCommunityHistoryPrediction {
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
export const onDeleteCommunityHistoryPrediction = /* GraphQL */ `
  subscription OnDeleteCommunityHistoryPrediction {
    onDeleteCommunityHistoryPrediction {
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
