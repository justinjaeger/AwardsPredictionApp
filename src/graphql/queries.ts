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
      admin
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRelations = /* GraphQL */ `
  query GetRelations($id: ID!) {
    getRelations(id: $id) {
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
export const listRelations = /* GraphQL */ `
  query ListRelations(
    $filter: ModelRelationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRelations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
