import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import {
  CreateUserInput,
  CreateUserMutation,
  GetUserQuery,
  ListUsersQuery,
  UpdateUserMutation,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { handleError, iApiResponse } from '../utils';

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
    return handleError('error getting user by email', err);
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
  input: CreateUserInput,
): Promise<iApiResponse<CreateUserMutation>> => {
  try {
    const { data, errors } = await API.graphql<GraphQLQuery<CreateUserMutation>>({
      query: mutations.createUser,
      variables: { input },
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
    const filter = { username: { eq: username } };
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
