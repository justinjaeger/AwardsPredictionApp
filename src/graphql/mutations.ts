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
      admin
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
      admin
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
      admin
      createdAt
      updatedAt
    }
  }
`;
export const createRelations = /* GraphQL */ `
  mutation CreateRelations(
    $input: CreateRelationsInput!
    $condition: ModelRelationsConditionInput
  ) {
    createRelations(input: $input, condition: $condition) {
      id
      follower {
        id
        email
        username
        name
        bio
        image
        admin
        createdAt
        updatedAt
      }
      following {
        id
        email
        username
        name
        bio
        image
        admin
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateRelations = /* GraphQL */ `
  mutation UpdateRelations(
    $input: UpdateRelationsInput!
    $condition: ModelRelationsConditionInput
  ) {
    updateRelations(input: $input, condition: $condition) {
      id
      follower {
        id
        email
        username
        name
        bio
        image
        admin
        createdAt
        updatedAt
      }
      following {
        id
        email
        username
        name
        bio
        image
        admin
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteRelations = /* GraphQL */ `
  mutation DeleteRelations(
    $input: DeleteRelationsInput!
    $condition: ModelRelationsConditionInput
  ) {
    deleteRelations(input: $input, condition: $condition) {
      id
      follower {
        id
        email
        username
        name
        bio
        image
        admin
        createdAt
        updatedAt
      }
      following {
        id
        email
        username
        name
        bio
        image
        admin
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
