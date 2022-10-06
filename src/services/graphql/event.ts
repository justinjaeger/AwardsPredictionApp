import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { ListEventsQuery } from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { handleError, iApiResponse } from '../utils';
import { Event } from '../../models';

export const getAllEvents = async (): Promise<iApiResponse<Event[]>> => {
  try {
    const res = await API.graphql<GraphQLQuery<ListEventsQuery>>({
      query: queries.listEvents,
    });
    if (!res.data) {
      throw new Error(JSON.stringify(res.errors));
    }
    if (!res.data.listEvents) {
      throw new Error('listEvents property not returned in getAllEvents response');
    }
    const data = res.data.listEvents.items as Event[]; // Make sure this makes sense
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting user by email', err);
  }
};
