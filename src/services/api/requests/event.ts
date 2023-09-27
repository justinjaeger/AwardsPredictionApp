import { EventModel, WithId } from '../../../types/api';
import api from '../api';

export const getEvents = async ({
  yearOfEvent,
  awardsBody,
}: {
  yearOfEvent?: number;
  awardsBody?: string;
}) => {
  let queryString = '?';
  if (yearOfEvent) {
    queryString += `maxYear=${yearOfEvent}&minYear=${yearOfEvent}`;
  }
  if (awardsBody) {
    if (queryString !== '?') {
      queryString += '&';
    }
    queryString += `awardsBody=${awardsBody}`;
  }

  return await api.get<WithId<EventModel>[]>(
    `events${queryString === '?' ? '' : queryString}`,
  );
};
