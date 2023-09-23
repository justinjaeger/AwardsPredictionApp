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
    if (yearOfEvent) {
      queryString += `&awardsBody=${awardsBody}`;
    } else {
      queryString += `awardsBody=${awardsBody}`;
    }
  }

  return await api.get<WithId<EventModel[]>>(
    `events${queryString === '?' ? '' : queryString}`,
  );
};
