import { handleError, iApiResponse } from '../utils';
import { DataStore } from 'aws-amplify';
import { Person } from '../../models';

/**
 * enforce tmdb being unique
 * check to see if person is already stored (identified by tmdbId)
 */
export const getOrCreatePerson = async (
  tmdbId: number,
): Promise<iApiResponse<Person>> => {
  try {
    const maybePeople = await DataStore.query(Person, (p) => p.tmdbId('eq', tmdbId));
    let person = maybePeople.length > 0 ? maybePeople[0] : undefined;
    if (!person) {
      person = await DataStore.save(new Person({ tmdbId }));
    }
    return { status: 'success', data: person };
  } catch (err) {
    return handleError('error fetching person by tmdbId', err);
  }
};

export const getPersonById = async (
  id: string,
): Promise<iApiResponse<Person | undefined>> => {
  try {
    const maybePeople = await DataStore.query(Person, (p) => p.id('eq', id));
    const person = maybePeople.length > 0 ? maybePeople[0] : undefined;
    return { status: 'success', data: person };
  } catch (err) {
    return handleError('error fetching person by tmdbId', err);
  }
};
