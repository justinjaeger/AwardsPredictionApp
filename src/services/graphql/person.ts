import {
  GetPersonQuery,
  GetPersonQueryVariables,
  CreatePersonMutation,
  CreatePersonMutationVariables,
  PersonByTmdbIdQueryVariables,
  PersonByTmdbIdQuery,
  ListPeopleQuery,
  ListPeopleQueryVariables,
  DeletePersonMutation,
  DeletePersonMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as customMutations from '../../graphqlCustom/mutations';
import * as queries from '../../graphql/queries';
import * as customQueries from '../../graphqlCustom/queries';
import {
  GraphqlAPIProtected,
  GraphqlAPIPublic,
  handleError,
  iApiResponse,
} from '../utils';

export const getPerson = async (id: string): Promise<iApiResponse<GetPersonQuery>> => {
  try {
    const { data, errors } = await GraphqlAPIPublic<
      GetPersonQuery,
      GetPersonQueryVariables
    >(queries.getPerson, { id });
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
    const { data, errors } = await GraphqlAPIPublic<
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
    const { data, errors } = await GraphqlAPIPublic<
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

/**
 * FOR SCRIPTS ONLY
 */

export const listEveryPerson = async (): Promise<iApiResponse<ListPeopleQuery>> => {
  try {
    const { data, errors } = await GraphqlAPIPublic<
      ListPeopleQuery,
      ListPeopleQueryVariables
    >(customQueries.listEveryPerson);
    if (!data?.listPeople) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting people by tmdb', err);
  }
};

export const deletePersonById = async (
  id: string,
): Promise<iApiResponse<DeletePersonMutation>> => {
  try {
    const { data, errors } = await GraphqlAPIProtected<
      DeletePersonMutation,
      DeletePersonMutationVariables
    >(customMutations.deletePerson, { input: { id } });
    if (!data?.deletePerson) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting movie by id', err);
  }
};
