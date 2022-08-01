/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  email: string,
  username: string,
  name?: string | null,
  bio?: string | null,
  image?: string | null,
  admin: UserRole,
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}


export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  name?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  image?: ModelStringInput | null,
  admin?: ModelUserRoleInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelUserRoleInput = {
  eq?: UserRole | null,
  ne?: UserRole | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  username: string,
  name?: string | null,
  bio?: string | null,
  image?: string | null,
  admin: UserRole,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  username?: string | null,
  name?: string | null,
  bio?: string | null,
  image?: string | null,
  admin?: UserRole | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateRelationsInput = {
  id?: string | null,
};

export type ModelRelationsConditionInput = {
  and?: Array< ModelRelationsConditionInput | null > | null,
  or?: Array< ModelRelationsConditionInput | null > | null,
  not?: ModelRelationsConditionInput | null,
};

export type Relations = {
  __typename: "Relations",
  id: string,
  follower?:  Array<User | null > | null,
  following?:  Array<User | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRelationsInput = {
  id: string,
};

export type DeleteRelationsInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  name?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  image?: ModelStringInput | null,
  admin?: ModelUserRoleInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelRelationsFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelRelationsFilterInput | null > | null,
  or?: Array< ModelRelationsFilterInput | null > | null,
  not?: ModelRelationsFilterInput | null,
};

export type ModelRelationsConnection = {
  __typename: "ModelRelationsConnection",
  items:  Array<Relations | null >,
  nextToken?: string | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    admin: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    admin: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    admin: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRelationsMutationVariables = {
  input: CreateRelationsInput,
  condition?: ModelRelationsConditionInput | null,
};

export type CreateRelationsMutation = {
  createRelations?:  {
    __typename: "Relations",
    id: string,
    follower?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    following?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRelationsMutationVariables = {
  input: UpdateRelationsInput,
  condition?: ModelRelationsConditionInput | null,
};

export type UpdateRelationsMutation = {
  updateRelations?:  {
    __typename: "Relations",
    id: string,
    follower?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    following?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRelationsMutationVariables = {
  input: DeleteRelationsInput,
  condition?: ModelRelationsConditionInput | null,
};

export type DeleteRelationsMutation = {
  deleteRelations?:  {
    __typename: "Relations",
    id: string,
    follower?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    following?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    admin: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRelationsQueryVariables = {
  id: string,
};

export type GetRelationsQuery = {
  getRelations?:  {
    __typename: "Relations",
    id: string,
    follower?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    following?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRelationsQueryVariables = {
  filter?: ModelRelationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRelationsQuery = {
  listRelations?:  {
    __typename: "ModelRelationsConnection",
    items:  Array< {
      __typename: "Relations",
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    admin: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    admin: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    admin: UserRole,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRelationsSubscription = {
  onCreateRelations?:  {
    __typename: "Relations",
    id: string,
    follower?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    following?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRelationsSubscription = {
  onUpdateRelations?:  {
    __typename: "Relations",
    id: string,
    follower?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    following?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRelationsSubscription = {
  onDeleteRelations?:  {
    __typename: "Relations",
    id: string,
    follower?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    following?:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      admin: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
