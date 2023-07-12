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
export const sendEmail = /* GraphQL */ `
  mutation SendEmail($msg: String) {
    sendEmail(msg: $msg)
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
            phase
            lockTime
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
            phase
            lockTime
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
            phase
            lockTime
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
            phase
            lockTime
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
export const updateToken = /* GraphQL */ `
  mutation UpdateToken(
    $input: UpdateTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    updateToken(input: $input, condition: $condition) {
      id
      token
      userId
      createdAt
      updatedAt
    }
  }
`;
export const deleteToken = /* GraphQL */ `
  mutation DeleteToken(
    $input: DeleteTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    deleteToken(input: $input, condition: $condition) {
      id
      token
      userId
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
          phase
          lockTime
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
            phase
            lockTime
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
            phase
            lockTime
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
          phase
          lockTime
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
            phase
            lockTime
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
            phase
            lockTime
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
          phase
          lockTime
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
            phase
            lockTime
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
            phase
            lockTime
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
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
      phase
      lockTime
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
            phase
            lockTime
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
            phase
            lockTime
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
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
      phase
      lockTime
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
            phase
            lockTime
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
            phase
            lockTime
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
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
      phase
      lockTime
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
            phase
            lockTime
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
            phase
            lockTime
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
        phase
        lockTime
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
            phase
            lockTime
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
        phase
        lockTime
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
            phase
            lockTime
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
          category {
            id
            eventId
            name
            type
            phase
            lockTime
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
          category {
            id
            eventId
            name
            type
            phase
            lockTime
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
export const createPredictionSetV2 = /* GraphQL */ `
  mutation CreatePredictionSetV2(
    $input: CreatePredictionSetV2Input!
    $condition: ModelPredictionSetV2ConditionInput
  ) {
    createPredictionSetV2(input: $input, condition: $condition) {
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
        phase
        lockTime
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
      phase
      eventId
      event {
        id
        categories {
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      comment
      createdAt
      updatedAt
    }
  }
`;
export const updatePredictionSetV2 = /* GraphQL */ `
  mutation UpdatePredictionSetV2(
    $input: UpdatePredictionSetV2Input!
    $condition: ModelPredictionSetV2ConditionInput
  ) {
    updatePredictionSetV2(input: $input, condition: $condition) {
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
        phase
        lockTime
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
      phase
      eventId
      event {
        id
        categories {
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      comment
      createdAt
      updatedAt
    }
  }
`;
export const deletePredictionSetV2 = /* GraphQL */ `
  mutation DeletePredictionSetV2(
    $input: DeletePredictionSetV2Input!
    $condition: ModelPredictionSetV2ConditionInput
  ) {
    deletePredictionSetV2(input: $input, condition: $condition) {
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
        phase
        lockTime
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
      phase
      eventId
      event {
        id
        categories {
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      comment
      createdAt
      updatedAt
    }
  }
`;
export const createPredictionV2 = /* GraphQL */ `
  mutation CreatePredictionV2(
    $input: CreatePredictionV2Input!
    $condition: ModelPredictionV2ConditionInput
  ) {
    createPredictionV2(input: $input, condition: $condition) {
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
          phase
          lockTime
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
      ranking
      createdAt
      updatedAt
    }
  }
`;
export const updatePredictionV2 = /* GraphQL */ `
  mutation UpdatePredictionV2(
    $input: UpdatePredictionV2Input!
    $condition: ModelPredictionV2ConditionInput
  ) {
    updatePredictionV2(input: $input, condition: $condition) {
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
          phase
          lockTime
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
      ranking
      createdAt
      updatedAt
    }
  }
`;
export const deletePredictionV2 = /* GraphQL */ `
  mutation DeletePredictionV2(
    $input: DeletePredictionV2Input!
    $condition: ModelPredictionV2ConditionInput
  ) {
    deletePredictionV2(input: $input, condition: $condition) {
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
          phase
          lockTime
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
      ranking
      createdAt
      updatedAt
    }
  }
`;
export const createCommunityPredictionSetV2 = /* GraphQL */ `
  mutation CreateCommunityPredictionSetV2(
    $input: CreateCommunityPredictionSetV2Input!
    $condition: ModelCommunityPredictionSetV2ConditionInput
  ) {
    createCommunityPredictionSetV2(input: $input, condition: $condition) {
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
        phase
        lockTime
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
            phase
            lockTime
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
          phase
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      phase
      comment
      createdAt
      updatedAt
    }
  }
`;
export const updateCommunityPredictionSetV2 = /* GraphQL */ `
  mutation UpdateCommunityPredictionSetV2(
    $input: UpdateCommunityPredictionSetV2Input!
    $condition: ModelCommunityPredictionSetV2ConditionInput
  ) {
    updateCommunityPredictionSetV2(input: $input, condition: $condition) {
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
        phase
        lockTime
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
            phase
            lockTime
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
          phase
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      phase
      comment
      createdAt
      updatedAt
    }
  }
`;
export const deleteCommunityPredictionSetV2 = /* GraphQL */ `
  mutation DeleteCommunityPredictionSetV2(
    $input: DeleteCommunityPredictionSetV2Input!
    $condition: ModelCommunityPredictionSetV2ConditionInput
  ) {
    deleteCommunityPredictionSetV2(input: $input, condition: $condition) {
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
        phase
        lockTime
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
            phase
            lockTime
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
          phase
          ranking
          createdAt
          updatedAt
        }
        nextToken
      }
      phase
      comment
      createdAt
      updatedAt
    }
  }
`;
export const createCommunityPredictionV2 = /* GraphQL */ `
  mutation CreateCommunityPredictionV2(
    $input: CreateCommunityPredictionV2Input!
    $condition: ModelCommunityPredictionV2ConditionInput
  ) {
    createCommunityPredictionV2(input: $input, condition: $condition) {
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
          phase
          lockTime
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
      phase
      ranking
      createdAt
      updatedAt
    }
  }
`;
export const updateCommunityPredictionV2 = /* GraphQL */ `
  mutation UpdateCommunityPredictionV2(
    $input: UpdateCommunityPredictionV2Input!
    $condition: ModelCommunityPredictionV2ConditionInput
  ) {
    updateCommunityPredictionV2(input: $input, condition: $condition) {
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
          phase
          lockTime
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
      phase
      ranking
      createdAt
      updatedAt
    }
  }
`;
export const deleteCommunityPredictionV2 = /* GraphQL */ `
  mutation DeleteCommunityPredictionV2(
    $input: DeleteCommunityPredictionV2Input!
    $condition: ModelCommunityPredictionV2ConditionInput
  ) {
    deleteCommunityPredictionV2(input: $input, condition: $condition) {
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
          phase
          lockTime
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
      phase
      ranking
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
            phase
            lockTime
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
        phase
        lockTime
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
            phase
            lockTime
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
        phase
        lockTime
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
            phase
            lockTime
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
        phase
        lockTime
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
          phase
          lockTime
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
          phase
          lockTime
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
          phase
          lockTime
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
            phase
            lockTime
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
        phase
        lockTime
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
            phase
            lockTime
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
            phase
            lockTime
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
        phase
        lockTime
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
            phase
            lockTime
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
            phase
            lockTime
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
        phase
        lockTime
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
            phase
            lockTime
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
          phase
          lockTime
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
        phase
        lockTime
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
          phase
          lockTime
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
        phase
        lockTime
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
          phase
          lockTime
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
        phase
        lockTime
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
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
        phase
        lockTime
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
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
        phase
        lockTime
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
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
        phase
        lockTime
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
          phase
          lockTime
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
          phase
          lockTime
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
          phase
          lockTime
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
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
        phase
        lockTime
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
            phase
            lockTime
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
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
        phase
        lockTime
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
            phase
            lockTime
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
          items {
            id
            eventId
            name
            type
            phase
            lockTime
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
        phase
        lockTime
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
            phase
            lockTime
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
          phase
          lockTime
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
        phase
        lockTime
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
          phase
          lockTime
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
        phase
        lockTime
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
          phase
          lockTime
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
        phase
        lockTime
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
            phase
            lockTime
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
            phase
            lockTime
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
export const createToken = /* GraphQL */ `
  mutation CreateToken(
    $input: CreateTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    createToken(input: $input, condition: $condition) {
      id
      token
      userId
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
        phase
        lockTime
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
            phase
            lockTime
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
          category {
            id
            eventId
            name
            type
            phase
            lockTime
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
