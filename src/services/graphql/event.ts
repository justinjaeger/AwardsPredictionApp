import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { ListEventsQuery, CreateEventMutation, GetEventQuery } from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { handleError, iApiResponse } from '../utils';
import { AwardsBody, EventType } from '../../models';

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
    return handleError('error getting events', err);
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

export const createEvent = async (
  awardsBody: AwardsBody,
  year: number,
  type: EventType,
): Promise<iApiResponse<CreateEventMutation>> => {
  try {
    const { data, errors } = await API.graphql<GraphQLQuery<CreateEventMutation>>({
      query: mutations.createEvent,
      // NOTE: check if obeys @default setting in schema.graphql for isActive field, which is x by default
      variables: { input: { awardsBody, year, type } },
    });
    if (!data) {
      throw new Error(JSON.stringify(errors));
    }
    if (!data.createEvent) {
      throw new Error('listEvents property not returned in getAllEvents response');
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating event', err);
  }
};
