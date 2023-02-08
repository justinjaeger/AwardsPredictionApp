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
      predictionSets {
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
      predictionSets {
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
      predictionSets {
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
export const onCreateRelationship = /* GraphQL */ `
  subscription OnCreateRelationship {
    onCreateRelationship {
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
export const onUpdateRelationship = /* GraphQL */ `
  subscription OnUpdateRelationship {
    onUpdateRelationship {
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
export const onDeleteRelationship = /* GraphQL */ `
  subscription OnDeleteRelationship {
    onDeleteRelationship {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateContender = /* GraphQL */ `
  subscription OnCreateContender {
    onCreateContender {
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
export const onUpdateContender = /* GraphQL */ `
  subscription OnUpdateContender {
    onUpdateContender {
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
export const onDeleteContender = /* GraphQL */ `
  subscription OnDeleteContender {
    onDeleteContender {
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
export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie {
    onCreateMovie {
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
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie {
    onUpdateMovie {
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
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie {
    onDeleteMovie {
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
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong {
    onUpdateSong {
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
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong {
    onDeleteSong {
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
export const onCreatePrediction = /* GraphQL */ `
  subscription OnCreatePrediction {
    onCreatePrediction {
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
      ranking
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePrediction = /* GraphQL */ `
  subscription OnUpdatePrediction {
    onUpdatePrediction {
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
      ranking
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePrediction = /* GraphQL */ `
  subscription OnDeletePrediction {
    onDeletePrediction {
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
      ranking
      createdAt
      updatedAt
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
export const onCreateHistoryPrediction = /* GraphQL */ `
  subscription OnCreateHistoryPrediction {
    onCreateHistoryPrediction {
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
export const onUpdateHistoryPrediction = /* GraphQL */ `
  subscription OnUpdateHistoryPrediction {
    onUpdateHistoryPrediction {
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
export const onDeleteHistoryPrediction = /* GraphQL */ `
  subscription OnDeleteHistoryPrediction {
    onDeleteHistoryPrediction {
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
export const onCreateCommunityPrediction = /* GraphQL */ `
  subscription OnCreateCommunityPrediction {
    onCreateCommunityPrediction {
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
      ranking
      indexedRankings
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCommunityPrediction = /* GraphQL */ `
  subscription OnUpdateCommunityPrediction {
    onUpdateCommunityPrediction {
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
      ranking
      indexedRankings
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCommunityPrediction = /* GraphQL */ `
  subscription OnDeleteCommunityPrediction {
    onDeleteCommunityPrediction {
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
      ranking
      indexedRankings
      createdAt
      updatedAt
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
export const onCreateCommunityHistoryPrediction = /* GraphQL */ `
  subscription OnCreateCommunityHistoryPrediction {
    onCreateCommunityHistoryPrediction {
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
export const onUpdateCommunityHistoryPrediction = /* GraphQL */ `
  subscription OnUpdateCommunityHistoryPrediction {
    onUpdateCommunityHistoryPrediction {
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
export const onDeleteCommunityHistoryPrediction = /* GraphQL */ `
  subscription OnDeleteCommunityHistoryPrediction {
    onDeleteCommunityHistoryPrediction {
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
