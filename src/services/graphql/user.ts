import { API, graphqlOperation } from 'aws-amplify';
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
import { User } from '../../models';

export const getAllUsers = async (): Promise<iApiResponse<User[]>> => {
  try {
    const res = await API.graphql<GraphQLQuery<ListUsersQuery>>(
      graphqlOperation(queries.listUsers),
    );
    if (!res.data) {
      throw new Error(JSON.stringify(res.errors));
    }
    if (!res.data.listUsers) {
      throw new Error('listUsers property not returned in getAllUsers response');
    }
    const data = res.data.listUsers.items as User[]; // Make sure this makes sense
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by email', err);
  }
};

export const getUserById = async (id: string): Promise<iApiResponse<User>> => {
  try {
    const res = await API.graphql<GraphQLQuery<GetUserQuery>>(
      graphqlOperation(queries.getUser, { id }),
    );
    if (!res.data) {
      throw new Error(JSON.stringify(res.errors));
    }
    const data = res.data.getUser as User; // Make sure this makes sense
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by id', err);
  }
};

export const getUserByEmail = async (email: string): Promise<iApiResponse<User>> => {
  try {
    const res = await API.graphql<GraphQLQuery<ListUsersQuery>>(
      graphqlOperation(queries.listUsers, { email }),
    );
    if (!res.data) {
      throw new Error(JSON.stringify(res.errors));
    }
    if (!res.data.listUsers) {
      throw new Error('listUsers property not returned in response');
    }
    if (res.data.listUsers?.items.length === 0) {
      throw new Error('No user found with this email');
    }
    const data = res.data.listUsers.items[0] as User; // Make sure this makes sense
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by email', err);
  }
};

// create a new user after confirming email
export const createUser = async (input: CreateUserInput): Promise<iApiResponse<User>> => {
  try {
    const res = await API.graphql<GraphQLQuery<CreateUserMutation>>(
      graphqlOperation(mutations.createUser, { input }),
    );
    console.error('res', res);
    if (!res.data) {
      throw new Error(JSON.stringify(res.errors));
    }
    const data = res.data.createUser as User; // Make sure this makes sense
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating user', err);
  }
};

// verify that username is unique, then update
export const updateUsername = async (
  id: string,
  username: string,
): Promise<iApiResponse<User>> => {
  try {
    // First, validate that username is not already taken
    const { data: maybeUsers } = await getUsersByUsername(username);
    if (!maybeUsers) {
      throw new Error('An error occured fetching users with this username');
    }
    if (maybeUsers.length !== 0) {
      throw new Error('This username is already taken');
    }
    // If not taken, create new username
    const res = await API.graphql<GraphQLQuery<UpdateUserMutation>>(
      graphqlOperation(mutations.updateUser, { input: { id, username } }),
    );
    if (res.data) {
      const user = res.data.updateUser;
      if (user) {
        return { status: 'success', data: user as User };
      }
    }
    throw new Error(JSON.stringify(res.errors));
  } catch (err) {
    return handleError('error updating username', err);
  }
};

export const getUsersByUsername = async (
  username: string,
): Promise<iApiResponse<User[]>> => {
  try {
    const res = await API.graphql<GraphQLQuery<ListUsersQuery>>(
      graphqlOperation(queries.listUsers, { username }),
    );
    if (!res.data) {
      throw new Error(JSON.stringify(res.errors));
    }
    if (!res.data.listUsers) {
      throw new Error('listUsers property not returned in response');
    }
    return { status: 'success', data: res.data.listUsers.items as User[] };
  } catch (err) {
    return handleError('error getting users by username', err);
  }
};
