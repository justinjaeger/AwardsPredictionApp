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
      role
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
        awardsBody
        year
        type
        expiration
        isActive
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
          type
          expiration
          isActive
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
export const updatePredictionSet = /* GraphQL */ `
  mutation UpdatePredictionSet(
    $input: UpdatePredictionSetInput!
    $condition: ModelPredictionSetConditionInput
  ) {
    updatePredictionSet(input: $input, condition: $condition) {
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
        awardsBody
        year
        type
        expiration
        isActive
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
          type
          expiration
          isActive
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
export const deletePredictionSet = /* GraphQL */ `
  mutation DeletePredictionSet(
    $input: DeletePredictionSetInput!
    $condition: ModelPredictionSetConditionInput
  ) {
    deletePredictionSet(input: $input, condition: $condition) {
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
        awardsBody
        year
        type
        expiration
        isActive
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
          type
          expiration
          isActive
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
export const createPrediction = /* GraphQL */ `
  mutation CreatePrediction(
    $input: CreatePredictionInput!
    $condition: ModelPredictionConditionInput
  ) {
    createPrediction(input: $input, condition: $condition) {
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
            type
            expiration
            isActive
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              didReceiveNominationOrWin
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
            predictionUserId
          }
          nextToken
        }
        didReceiveNominationOrWin
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
      predictionUserId
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
            type
            expiration
            isActive
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              didReceiveNominationOrWin
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
            predictionUserId
          }
          nextToken
        }
        didReceiveNominationOrWin
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
      predictionUserId
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
            type
            expiration
            isActive
            createdAt
            updatedAt
          }
          contenders {
            items {
              id
              didReceiveNominationOrWin
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
            predictionUserId
          }
          nextToken
        }
        didReceiveNominationOrWin
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
      predictionUserId
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
          name
          type
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
              didReceiveNominationOrWin
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
          name
          type
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
              didReceiveNominationOrWin
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
          name
          type
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
              didReceiveNominationOrWin
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
          category {
            id
            name
            type
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
              ranking
              createdAt
              updatedAt
              predictionSetPredictionsId
              contenderPredictionsId
              predictionUserId
            }
            nextToken
          }
          didReceiveNominationOrWin
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
          category {
            id
            name
            type
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
              ranking
              createdAt
              updatedAt
              predictionSetPredictionsId
              contenderPredictionsId
              predictionUserId
            }
            nextToken
          }
          didReceiveNominationOrWin
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
          category {
            id
            name
            type
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
              ranking
              createdAt
              updatedAt
              predictionSetPredictionsId
              contenderPredictionsId
              predictionUserId
            }
            nextToken
          }
          didReceiveNominationOrWin
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
export const createContender = /* GraphQL */ `
  mutation CreateContender(
    $input: CreateContenderInput!
    $condition: ModelContenderConditionInput
  ) {
    createContender(input: $input, condition: $condition) {
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
          type
          expiration
          isActive
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
          predictionUserId
        }
        nextToken
      }
      didReceiveNominationOrWin
      createdAt
      updatedAt
      categoryContendersId
      contenderMovieId
      contenderPersonId
      contenderSongId
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
          type
          expiration
          isActive
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
          predictionUserId
        }
        nextToken
      }
      didReceiveNominationOrWin
      createdAt
      updatedAt
      categoryContendersId
      contenderMovieId
      contenderPersonId
      contenderSongId
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
          type
          expiration
          isActive
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
          predictionUserId
        }
        nextToken
      }
      didReceiveNominationOrWin
      createdAt
      updatedAt
      categoryContendersId
      contenderMovieId
      contenderPersonId
      contenderSongId
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
export const updateSong = /* GraphQL */ `
  mutation UpdateSong(
    $input: UpdateSongInput!
    $condition: ModelSongConditionInput
  ) {
    updateSong(input: $input, condition: $condition) {
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
export const deleteSong = /* GraphQL */ `
  mutation DeleteSong(
    $input: DeleteSongInput!
    $condition: ModelSongConditionInput
  ) {
    deleteSong(input: $input, condition: $condition) {
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
