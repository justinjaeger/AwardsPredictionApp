import {
  GetPersonQuery,
  GetPersonQueryVariables,
  CreatePersonMutation,
  CreatePersonMutationVariables,
  PersonByTmdbIdQueryVariables,
  PersonByTmdbIdQuery,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

export const getPerson = async (id: string): Promise<iApiResponse<GetPersonQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<GetPersonQuery, GetPersonQueryVariables>(
      queries.getPerson,
      { id },
    );
    if (!data?.getPerson) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting person by id', err);
  }
};

const getPeopleByTmdb = async (
  tmdbId: number,
): Promise<iApiResponse<PersonByTmdbIdQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      PersonByTmdbIdQuery,
      PersonByTmdbIdQueryVariables
    >(customQueries.personByTmdbId, { tmdbId });
    if (!data?.personByTmdbId) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting movie by tmdb', err);
  }
};

export const createPerson = async (
  tmdbId: number,
): Promise<iApiResponse<CreatePersonMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      CreatePersonMutation,
      CreatePersonMutationVariables
    >(mutations.createPerson, { input: { tmdbId } });
    if (!data?.createPerson) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating person', err);
  }
};

/**
 * enforce tmdb being unique
 * check to see if person is already stored (identified by tmdbId)
 */
export const getOrCreatePerson = async (
  tmdbId: number,
): Promise<iApiResponse<string>> => {
  try {
    // get people by tmdbId
    const { data: maybePeople } = await getPeopleByTmdb(tmdbId);
    if (!maybePeople?.personByTmdbId) {
      return { status: 'error' };
    }
    let personId = maybePeople.personByTmdbId.items[0]?.id || undefined;
    // if no person exists with tmdbId, create one
    if (!personId) {
      const { data: newPerson } = await createPerson(tmdbId);
      const pId = newPerson?.createPerson?.id;
      if (!pId) {
        return { status: 'error' };
      }
      personId = pId;
    }
    return { status: 'success', data: personId };
  } catch (err) {
    return handleError('error getting or creating person', err);
  }
};
