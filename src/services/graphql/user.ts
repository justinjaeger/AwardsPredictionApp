import {
  CreateUserMutation,
  CreateUserMutationVariables,
  GetUserQueryVariables,
  ListUsersQuery,
  ListUsersQueryVariables,
  SearchableUserFilterInput,
  SearchUsersQueryVariables,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UserByEmailQuery,
  UserByEmailQueryVariables,
  UserByOauthIdQuery,
  UserByOauthIdQueryVariables,
  UserByUsernameQuery,
  UserByUsernameQueryVariables,
  UserRole,
} from '../../API';
import { PAGINATED_USER_RECOMMENDATION_LIMIT } from '../../constants';
import * as mutations from '../../graphql/mutations';
import * as customQueries from '../../graphqlCustom/queries';
import { GetUserQuery, SearchUsersQuery } from '../../graphqlCustom/types';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

/**
 * UNIQUE USER QUERIES
 */

export const getUserById = async (id: string): Promise<iApiResponse<GetUserQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<GetUserQuery, GetUserQueryVariables>(
      customQueries.getUserBasic,
      { id },
    );
    if (!data?.getUser) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting user - try logging out', err);
  }
};

export const getUserByEmail = async (
  email: string,
): Promise<iApiResponse<UserByEmailQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UserByEmailQuery,
      UserByEmailQueryVariables
    >(customQueries.userByEmailBasic, { email });
    if (!data?.userByEmail) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by email', err);
  }
};

export const getUserByOauthId = async (
  oauthId: string,
): Promise<iApiResponse<UserByOauthIdQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UserByOauthIdQuery,
      UserByOauthIdQueryVariables
    >(customQueries.userByOauthIdBasic, { oauthId });
    if (!data?.userByOauthId) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by email', err);
  }
};

export const getUserByUsername = async (
  username: string,
): Promise<iApiResponse<UserByUsernameQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UserByUsernameQuery,
      UserByUsernameQueryVariables
    >(customQueries.userByUsernameBasic, { username });
    if (!data?.userByUsername) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by email', err);
  }
};

/**
 * GET USER WITH SOMETHING ELSE
 */

// returns user with eventIds they're predicting (via getting their predictionSets)
export const getUserEvents = async (id: string): Promise<iApiResponse<GetUserQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<GetUserQuery, GetUserQueryVariables>(
      customQueries.getUserWithPredictedEventIds,
      { id },
    );
    if (!data?.getUser) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: data };
  } catch (err) {
    return handleError('error getting user events', err);
  }
};

// Compatile with signed in and signed out users
type GetUserQueryVariablesCustom = GetUserQueryVariables & { authUserId: string };
export const getUserProfile = async (
  id: string,
  authUserId: string | undefined,
): Promise<iApiResponse<GetUserQuery>> => {
  try {
    if (authUserId) {
      const { data, errors } = await GraphqlAPI<
        GetUserQuery,
        GetUserQueryVariablesCustom
      >(customQueries.getUserProfileQuery, { id, authUserId });
      if (!data?.getUser) {
        throw new Error(JSON.stringify(errors));
      }
      return { status: 'success', data: data };
    } else {
      const { data, errors } = await GraphqlAPI<GetUserQuery, GetUserQueryVariables>(
        customQueries.getUserProfileQuerySignedOut,
        { id },
      );
      if (!data?.getUser) {
        throw new Error(JSON.stringify(errors));
      }
      return { status: 'success', data: data };
    }
  } catch (err) {
    return handleError('error getting user profile', err);
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

/**
 * FOR RECOMMENDATIONS
 */

export const getUsersPaginated = async (
  paginatedLimit?: number,
): Promise<iApiResponse<ListUsersQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<ListUsersQuery, ListUsersQueryVariables>(
      customQueries.listUsersPaginated,
      {
        limit: paginatedLimit || PAGINATED_USER_RECOMMENDATION_LIMIT,
      },
    );
    if (!data?.listUsers) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting all users', err);
  }
};

// it does return users we are following but we get info that can indicate if we follow them
export const getUsersPaginatedNotFollowing = async (
  authUserId: string,
  paginatedLimit?: number,
): Promise<iApiResponse<ListUsersQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      ListUsersQuery,
      ListUsersQueryVariables & { authUserId: string }
    >(customQueries.listUsersPaginatedWithIsFollowing, {
      limit: paginatedLimit || PAGINATED_USER_RECOMMENDATION_LIMIT,
      authUserId,
    });
    if (!data?.listUsers) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting all users not following', err);
  }
};

/**
 * CREATE/UPDATE USER
 */

// create a new user after confirming email
export const createUser = async (
  email: string,
  role?: UserRole,
  name?: string,
  oauthId?: string,
): Promise<iApiResponse<CreateUserMutation>> => {
  try {
    // Enforce uniqueness!!
    const { data: maybeUsers } = await getUserByEmail(email);
    if (!maybeUsers?.userByEmail) {
      return { status: 'error' };
    }
    if (maybeUsers.userByEmail.items.length > 0) {
      throw new Error('A user with this email already exists');
    }
    // Create user
    const { data, errors } = await GraphqlAPI<
      CreateUserMutation,
      CreateUserMutationVariables
    >(mutations.createUser, {
      input: {
        email,
        role: role || UserRole.USER,
        name: name || null,
        oauthId: oauthId || null,
      },
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
  bio: string | undefined,
): Promise<iApiResponse<UpdateUserMutation>> => {
  try {
    // First, validate that username is not already taken
    if (username !== undefined) {
      const { data: listUsersQuery } = await getUserByUsername(username);
      const maybeUsers = listUsersQuery?.userByUsername?.items;
      if (!maybeUsers) {
        throw new Error('An error occured fetching users with this username');
      }
      if (maybeUsers.length !== 0) {
        return {
          status: 'error',
          message: 'This username is already taken',
        };
      }
    }
    const input: UpdateUserInput = { id };
    if (username !== undefined) input.username = username;
    if (name !== undefined) input.name = name;
    if (bio !== undefined) input.bio = bio;
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

export const updateProfileImage = async (
  id: string,
  imageKey: string,
): Promise<iApiResponse<UpdateUserMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      UpdateUserMutation,
      UpdateUserMutationVariables
    >(mutations.updateUser, { input: { id, image: imageKey } });
    if (data) {
      return { status: 'success', data };
    }
    throw new Error(JSON.stringify(errors));
  } catch (err) {
    return handleError('error updating username', err);
  }
};

/**
 * SEARCHABLE
 * TODO: Can we replace these somehow? We can use "name" and "username" as sortKeyFields on the user, then do beginsWith filters
 */

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

/**
 * FOR DELETION SCRIPT
 */

export const getEveryUser = async (): Promise<iApiResponse<ListUsersQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<ListUsersQuery, ListUsersQueryVariables>(
      customQueries.listAllUsers,
    );
    if (!data?.listUsers) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting all users', err);
  }
};

/**
 * FOR TESTING (NOT USED)
 */

// Not really used
export const createTestUser = async (
  name: string,
  username: string,
  email: string,
): Promise<iApiResponse<CreateUserMutation>> => {
  try {
    // Enforce email uniqueness
    const { data: maybeUsers } = await getUserByEmail(email);
    if (!maybeUsers?.userByEmail) {
      return { status: 'error' };
    }
    if (maybeUsers.userByEmail.items.length > 0) {
      throw new Error('A user with this email already exists');
    }
    // Enforce username uniqueness
    const { data: listUsersQuery } = await getUserByUsername(username);
    const maybeUs = listUsersQuery?.userByUsername?.items;
    if (!maybeUs) {
      throw new Error('An error occured fetching users with this username');
    }
    if (maybeUs.length !== 0) {
      return {
        status: 'error',
        message: 'This username is already taken',
      };
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
