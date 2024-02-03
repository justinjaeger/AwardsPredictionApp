import { Accolade } from '../../../models';
import api from '../api';

export const getEventAccolades = async ({ eventId }: { eventId: string }) => {
  return (await api.get<Accolade>(`accolades/${eventId}`)).data?.accolades ?? {};
};
