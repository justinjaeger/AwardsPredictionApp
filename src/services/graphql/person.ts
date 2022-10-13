import {
  GetPersonQuery,
  GetPersonQueryVariables,
  ListPeopleQuery,
  ListPeopleQueryVariables,
  CreatePersonMutation,
  CreatePersonMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
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

/**
 * enforce tmdb being unique
 */
export const getPeopleByTmdb = async (
  tmdbId: number,
): Promise<iApiResponse<ListPeopleQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<ListPeopleQuery, ListPeopleQueryVariables>(
      queries.listPeople,
      { filter: { tmdbId: { eq: tmdbId } } },
    );
    if (!data?.listPeople) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting people by tmdb', err);
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
 * check to see if movie is already stored (identified by tmdbId)
 */
export const getOrCreatePerson = async (
  tmdbId: number,
): Promise<iApiResponse<GetPersonQuery>> => {
  try {
    // get movies with tmdbId
    const { data: maybePeople } = await getPeopleByTmdb(tmdbId);
    if (!maybePeople?.listPeople) {
      return { status: 'error' };
    }
    let personId = maybePeople.listPeople.items[0]?.id || undefined;
    // if no movie exists with tmdbId, create one
    if (!personId) {
      const { data: newMovie } = await createPerson(tmdbId);
      const pId = newMovie?.createPerson?.id;
      if (!pId) {
        return { status: 'error' };
      }
      personId = pId;
    }
    // finally, with existing or created movieId, get the movie
    const { data } = await getPerson(personId);
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting all events', err);
  }
};
