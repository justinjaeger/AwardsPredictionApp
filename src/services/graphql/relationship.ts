import {
  CreateUserMutation,
  CreateUserMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  ListRelationshipsQuery,
  ListRelationshipsQueryVariables,
  ListUsersQuery,
  ListUsersQueryVariables,
  ModelUserFilterInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UserRole,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

// export const searchFriends = async (
//   search: string,
// ): Promise<iApiResponse<ListRelationshipsQuery>> => {
//   try {
//     const { data, errors } = await GraphqlAPI<
//       ListRelationshipsQuery,
//       ListRelationshipsQueryVariables
//     >(customQueries.listRelationships, { filter: {} });
//     if (!data?.listRelationships) {
//       throw new Error(JSON.stringify(errors));
//     }
//     return { status: 'success', data: data };
//   } catch (err) {
//     return handleError('error getting user by id', err);
//   }
// };
