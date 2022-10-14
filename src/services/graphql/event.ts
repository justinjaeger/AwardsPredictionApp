import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import {
  ListEventsQuery,
  CreateEventMutation,
  GetEventQuery,
  DeleteEventMutation,
  ModelEventFilterInput,
  AwardsBody,
  EventType,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { handleError, iApiResponse } from '../utils';

export const getAllEvents = async (): Promise<iApiResponse<ListEventsQuery>> => {
  try {
    const { data, errors } = await API.graphql<GraphQLQuery<ListEventsQuery>>({
      query: queries.listEvents,
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    if (!data.listEvents) {
      throw new Error('listEvents property not returned in getAllEvents response');
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting all events', err);
  }
};

export const getEvent = async (id: string): Promise<iApiResponse<GetEventQuery>> => {
  try {
    const { data, errors } = await API.graphql<GraphQLQuery<GetEventQuery>>({
      query: queries.getEvent,
      variables: { id },
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    if (!data.getEvent) {
      throw new Error('getEvent property not returned in getAllEvents response');
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting event', err);
  }
};

export const getUniqueEvents = async (
  awardsBody: AwardsBody,
  year: number,
  type: EventType,
): Promise<iApiResponse<ListEventsQuery>> => {
  try {
    const filter: ModelEventFilterInput = {
      awardsBody: { eq: awardsBody },
      year: { eq: year },
      type: { eq: type },
    };
    // enforce uniqueness - don't allow duplicate events to be created
    const { data, errors } = await API.graphql<GraphQLQuery<ListEventsQuery>>({
      query: queries.listEvents,
      variables: { filter },
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    if (!data.listEvents) {
      throw new Error('listEvents property not returned in getEvents response');
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting events', err);
  }
};

export const createEvent = async (
  awardsBody: AwardsBody,
  year: number,
  type: EventType,
): Promise<iApiResponse<CreateEventMutation>> => {
  try {
    // enforce uniqueness - don't allow duplicate events to be created
    const { data: d } = await getUniqueEvents(awardsBody, year, type);
    if (!d) return { status: 'error' };
    if (d.listEvents?.items.length !== 0) {
      return { status: 'error', message: 'This event has already been created' };
    }

    // Create event
    const { data, errors } = await API.graphql<GraphQLQuery<CreateEventMutation>>({
      query: mutations.createEvent,
      // NOTE: check if obeys @default setting in schema.graphql for isActive field, which is x by default
      variables: { input: { awardsBody, year, type } },
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    if (!data.createEvent) {
      throw new Error('createEvent property not returned in getAllEvents response');
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating event', err);
  }
};

// NOTE: We never want to actually delete an event -- this is just for mock purposes
export const deleteEvent = async (
  id: string,
): Promise<iApiResponse<DeleteEventMutation>> => {
  try {
    const { data, errors } = await API.graphql<GraphQLQuery<DeleteEventMutation>>({
      query: mutations.deleteEvent,
      // NOTE: check if obeys @default setting in schema.graphql for isActive field, which is x by default
      variables: { input: { id } },
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    if (!data.deleteEvent) {
      throw new Error('deleteEvent property not returned in deleteEvent response');
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting event', err);
  }
};
