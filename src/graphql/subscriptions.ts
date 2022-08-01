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
      admin
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
      admin
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
      admin
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRelations = /* GraphQL */ `
  subscription OnCreateRelations {
    onCreateRelations {
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
export const onUpdateRelations = /* GraphQL */ `
  subscription OnUpdateRelations {
    onUpdateRelations {
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
export const onDeleteRelations = /* GraphQL */ `
  subscription OnDeleteRelations {
    onDeleteRelations {
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
