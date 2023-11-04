import { EventModel, WithId } from '../../../types/api';
import api from '../api';

export const getEvents = async ({
  maxYear,
  minYear,
  awardsBody,
  isOpen,
}: {
  maxYear?: number;
  minYear?: number;
  awardsBody?: string;
  isOpen?: boolean;
}) => {
  let queryString = '?';
  if (maxYear) {
    queryString += `maxYear=${maxYear}`;
  }
  if (minYear) {
    if (queryString !== '?') {
      queryString += '&';
    }
    queryString += `minYear=${minYear}`;
  }
  if (awardsBody) {
    if (queryString !== '?') {
      queryString += '&';
    }
    queryString += `awardsBody=${awardsBody}`;
  }
  if (isOpen) {
    if (queryString !== '?') {
      queryString += '&';
    }
    queryString += `isOpen=${isOpen}`;
  }

  return await api.get<WithId<EventModel>[]>(
    `events${queryString === '?' ? '' : queryString}`,
  );
};
