import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import {
  CreateUserMutation,
  CreateUserMutationVariables,
  ListUsersQuery,
  ListUsersQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { handleError, iApiServiceReturn } from '.';

// create a new user after confirming email
export const createUser = async (
  variables: CreateUserMutationVariables,
): Promise<iApiServiceReturn<CreateUserMutation>> => {
  try {
    const res = await API.graphql<GraphQLQuery<CreateUserMutation>>(
      graphqlOperation(mutations.createUser, variables),
    );
    if (!res.data) {
      throw new Error(JSON.stringify(res.errors));
    }
    return { status: 'success', data: res.data };
  } catch (err) {
    return handleError('error creating user', err);
  }
};

export const getUsersByFilter = async (
  variables: ListUsersQueryVariables,
): Promise<iApiServiceReturn<User[]>> => {
  try {
    const res = await API.graphql<GraphQLQuery<ListUsersQuery>>(
      graphqlOperation(queries.listUsers, variables),
    );
    if (res.data) {
      const users = res.data.listUsers?.items;
      if (users) {
        return { status: 'success', data: users as User[] };
      }
    }
    throw new Error(JSON.stringify(res.errors));
  } catch (err) {
    return handleError('error retrieving username', err);
  }
};

// update username (only call after verifying that it's unique)
export const updateUsername = async (
  variables: UpdateUserMutationVariables,
): Promise<iApiServiceReturn<User>> => {
  try {
    const res = await API.graphql<GraphQLQuery<UpdateUserMutation>>(
      graphqlOperation(mutations.updateUser, variables),
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
