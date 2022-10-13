import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import {
  CreateUserMutation,
  DeleteUserMutation,
  GetUserQuery,
  ListUsersQuery,
  ModelUserFilterInput,
  UpdateUserMutation,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { handleError, iApiResponse } from '../utils';
import { UserRole } from '../../models';

export const getAllUsers = async (): Promise<iApiResponse<ListUsersQuery>> => {
  try {
    const { data, errors } = await API.graphql<GraphQLQuery<ListUsersQuery>>({
      query: queries.listUsers,
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    if (!data.listUsers) {
      throw new Error('listUsers property not returned in getAllUsers response');
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting all users', err);
  }
};

export const getUser = async (id: string): Promise<iApiResponse<GetUserQuery>> => {
  try {
    const { data, errors } = await API.graphql<GraphQLQuery<GetUserQuery>>({
      query: queries.getUser,
      variables: { id },
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting user by id', err);
  }
};

// Use this to enforce uniqueness
export const getUserByEmail = async (
  email: string,
): Promise<iApiResponse<ListUsersQuery>> => {
  try {
    const { data, errors } = await API.graphql<GraphQLQuery<ListUsersQuery>>({
      query: queries.listUsers,
      variables: { email },
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    if (!data.listUsers) {
      throw new Error('listUsers property not returned in response');
    }
    if (data.listUsers?.items.length === 0) {
      throw new Error('No user found with this email');
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by email', err);
  }
};

// create a new user after confirming email
export const createUser = async (
  email: string,
  role?: UserRole,
): Promise<iApiResponse<CreateUserMutation>> => {
  try {
    // Enforce uniqueness!!
    const { data: maybeUsers } = await getUserByEmail(email);
    if (!maybeUsers?.listUsers) {
      return { status: 'error' };
    }
    if (maybeUsers.listUsers.items.length > 0) {
      throw new Error('A user with this email already exists');
    }
    // Create user
    const { data, errors } = await API.graphql<GraphQLQuery<CreateUserMutation>>({
      query: mutations.createUser,
      variables: { input: { email, role: role || UserRole.USER } },
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating user', err);
  }
};

// verify that username is unique, then update
export const updateUsername = async (
  id: string,
  username: string,
): Promise<iApiResponse<UpdateUserMutation>> => {
  try {
    // First, validate that username is not already taken
    const { data: listUsersQuery } = await getUsersByUsername(username);
    const maybeUsers = listUsersQuery?.listUsers?.items;
    if (!maybeUsers) {
      throw new Error('An error occured fetching users with this username');
    }
    if (maybeUsers.length !== 0) {
      throw new Error('This username is already taken');
    }
    // If not taken, create new username
    const { data, errors } = await API.graphql<GraphQLQuery<UpdateUserMutation>>({
      query: mutations.updateUser,
      variables: { input: { id, username } },
    });
    if (data) {
      return { status: 'success', data };
    }
    throw new Error(JSON.stringify(errors));
  } catch (err) {
    return handleError('error updating username', err);
  }
};

export const getUsersByUsername = async (
  username: string,
): Promise<iApiResponse<ListUsersQuery>> => {
  try {
    const filter: ModelUserFilterInput = { username: { eq: username } };
    const { data, errors } = await API.graphql<GraphQLQuery<ListUsersQuery>>({
      query: queries.listUsers,
      variables: { filter },
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    if (!data.listUsers) {
      throw new Error('listUsers property not returned in response');
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting users by username', err);
  }
};

// NOTE: Only for mock purposes. Should never really DELETE a user
export const deleteUser = async (
  id: string,
): Promise<iApiResponse<DeleteUserMutation>> => {
  try {
    const { data, errors } = await API.graphql<GraphQLQuery<DeleteUserMutation>>({
      query: queries.listUsers,
      variables: { id },
    });
    if (!data?.deleteUser) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting user', err);
  }
};
