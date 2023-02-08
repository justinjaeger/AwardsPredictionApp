import {
  CreateUserMutation,
  CreateUserMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQueryVariables,
  ListUsersQueryVariables,
  ModelUserFilterInput,
  SearchableUserFilterInput,
  SearchUsersQueryVariables,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UserRole,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import {
  GetUserQuery,
  ListUsersQuery,
  SearchUsersQuery,
} from '../../graphqlCustom/types';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

export const getAllUsers = async (): Promise<iApiResponse<ListUsersQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<ListUsersQuery, ListUsersQueryVariables>(
      queries.listUsers,
    );
    if (!data?.listUsers) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting all users', err);
  }
};

export const getUser = async (id: string): Promise<iApiResponse<GetUserQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<GetUserQuery, GetUserQueryVariables>(
      customQueries.getUser,
      { id },
    );
    if (!data?.getUser) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting user by id', err);
  }
};

export const getUserWithRecentPredictions = async (
  id: string,
): Promise<iApiResponse<GetUserQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<GetUserQuery, GetUserQueryVariables>(
      customQueries.getUserWithRecentPredictions,
      { id },
    );
    if (!data?.getUser) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting user by id', err);
  }
};

export const getUserWithRelationships = async (
  id: string,
): Promise<iApiResponse<GetUserQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<GetUserQuery, GetUserQueryVariables>(
      customQueries.getUserWithRelationshipsQuery,
      { id },
    );
    if (!data?.getUser) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting user with relationships', err);
  }
};

// Use this to enforce uniqueness
export const getUserByEmail = async (
  email: string,
): Promise<iApiResponse<ListUsersQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<ListUsersQuery, ListUsersQueryVariables>(
      queries.listUsers,
      { filter: { email: { eq: email } } },
    );
    if (!data?.listUsers) {
      throw new Error(JSON.stringify(errors));
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
    const { data, errors } = await GraphqlAPI<
      CreateUserMutation,
      CreateUserMutationVariables
    >(mutations.createUser, { input: { email, role: role || UserRole.USER } });
    if (!data?.createUser) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating user', err);
  }
};

export const createTestUser = async (
  name: string,
  username: string,
  email: string,
): Promise<iApiResponse<CreateUserMutation>> => {
  try {
    // Enforce email uniqueness
    const { data: maybeUsers } = await getUserByEmail(email);
    if (!maybeUsers?.listUsers) {
      return { status: 'error' };
    }
    if (maybeUsers.listUsers.items.length > 0) {
      throw new Error('A user with this email already exists');
    }
    // Enforce username uniqueness
    const { data: listUsersQuery } = await getUsersByUsername(username);
    const maybeUs = listUsersQuery?.listUsers?.items;
    if (!maybeUs) {
      throw new Error('An error occured fetching users with this username');
    }
    if (maybeUs.length !== 0) {
      throw new Error('This username is already taken');
    }
    // Create user
    const { data, errors } = await GraphqlAPI<
      CreateUserMutation,
      CreateUserMutationVariables
    >(mutations.createUser, {
      input: { email, username, name, role: UserRole.USER },
    });
    if (!data?.createUser) {
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
  username: string | undefined,
  name: string | undefined,
): Promise<iApiResponse<UpdateUserMutation>> => {
  try {
    // First, validate that username is not already taken
    if (username) {
      const { data: listUsersQuery } = await getUsersByUsername(username);
      const maybeUsers = listUsersQuery?.listUsers?.items;
      if (!maybeUsers) {
        throw new Error('An error occured fetching users with this username');
      }
      if (maybeUsers.length !== 0) {
        throw new Error('This username is already taken');
      }
    }
    const input: UpdateUserInput = { id };
    if (username) input.username = username;
    if (name) input.name = name;
    // If not taken, create new username
    const { data, errors } = await GraphqlAPI<
      UpdateUserMutation,
      UpdateUserMutationVariables
    >(mutations.updateUser, { input });
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
    const { data, errors } = await GraphqlAPI<ListUsersQuery, ListUsersQueryVariables>(
      queries.listUsers,
      { filter },
    );
    if (!data?.listUsers) {
      throw new Error(JSON.stringify(errors));
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
    const { data, errors } = await GraphqlAPI<
      DeleteUserMutation,
      DeleteUserMutationVariables
    >(mutations.deleteUser, { input: { id } });
    if (!data?.deleteUser) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting user', err);
  }
};

export const searchUsersSignedOut = async (
  search: string,
): Promise<iApiResponse<SearchUsersQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      SearchUsersQuery,
      SearchUsersQueryVariables
    >(customQueries.searchUsersSignedOutQuery, {
      filter: {
        or: [
          { name: { matchPhrasePrefix: search } },
          { username: { matchPhrasePrefix: search } },
        ],
      },
      limit: 10,
    });
    if (!data?.searchUsers) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error searching users signed out', err);
  }
};

type SearchUsersQueryVariablesCustom = SearchUsersQueryVariables & {
  searchingUserId: string;
};
export const searchUsersSignedIn = async (
  search: string,
  searchingUserId: string,
): Promise<iApiResponse<SearchUsersQuery>> => {
  try {
    // have to separate words because the search doesn't like spaces
    const words = search.split(' ');
    const or = words.reduce((acc: SearchableUserFilterInput[], word) => {
      acc.push({ name: { wildcard: word + '*' } });
      acc.push({ username: { wildcard: word + '*' } });
      return acc;
    }, []);
    const { data, errors } = await GraphqlAPI<
      SearchUsersQuery,
      SearchUsersQueryVariablesCustom
    >(customQueries.searchUsersSignedInQuery, {
      filter: {
        or,
      },
      limit: 10,
      searchingUserId: searchingUserId || 'undefined',
    });
    if (!data?.searchUsers) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error searching users signed in', err);
  }
};
