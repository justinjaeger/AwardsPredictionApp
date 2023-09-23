import { Person } from '../../../types/api';
import api from '../api';

// Gets person data (info updated on timer from TMDb)
export const getPersons = async (personIds: string[]) => {
  return await api.post<Record<string, Person>, string[]>('persons', personIds);
};
