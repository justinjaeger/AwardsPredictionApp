import { Accolade } from '../../../types/api';
import api from '../api';

export const getEventAccolades = async (eventId: string) => {
  return (await api.get<Accolade>(`accolades/${eventId}`)).data?.accolades ?? {};
};
