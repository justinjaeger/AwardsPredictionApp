import {
  ListEventsQuery,
  CreateEventMutation,
  GetEventQuery,
  DeleteEventMutation,
  AwardsBody,
  EventType,
  ListEventsQueryVariables,
  GetEventQueryVariables,
  CreateEventMutationVariables,
  DeleteEventMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';
import { deleteCategory, getCategoriesByEvent } from './category';

export const getAllEvents = async (): Promise<iApiResponse<ListEventsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<ListEventsQuery, ListEventsQueryVariables>(
      queries.listEvents,
    );
    if (!data?.listEvents) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting all events', err);
  }
};

export const getEventById = async (id: string): Promise<iApiResponse<GetEventQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<GetEventQuery, GetEventQueryVariables>(
      queries.getEvent,
      { id },
    );
    if (!data?.getEvent) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    console.error('ERR', err);
    return handleError('error getting event by id', err);
  }
};

export const getUniqueEvents = async (
  awardsBody: AwardsBody,
  year: number,
  type: EventType,
): Promise<iApiResponse<ListEventsQuery>> => {
  try {
    // enforce uniqueness - don't allow duplicate events to be created
    const { data, errors } = await GraphqlAPI<ListEventsQuery, ListEventsQueryVariables>(
      queries.listEvents,
      {
        filter: {
          awardsBody: { eq: awardsBody },
          year: { eq: year },
          type: { eq: type },
        },
      },
    );
    if (!data?.listEvents) {
      throw new Error(JSON.stringify(errors));
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
    const { data, errors } = await GraphqlAPI<
      CreateEventMutation,
      CreateEventMutationVariables
    >(
      mutations.createEvent,
      // NOTE: check if obeys @default setting in schema.graphql for isActive field, which is x by default
      { input: { awardsBody, year, type } },
    );
    if (!data?.createEvent) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error creating event', err);
  }
};

// NOTE: We never want to actually delete an event -- this is just for mock purposes
// ALSO: should be atomic
export const deleteEvent = async (
  id: string,
): Promise<iApiResponse<DeleteEventMutation>> => {
  try {
    const { data: categories } = await getCategoriesByEvent(id);
    const cats = categories?.listCategories?.items;
    if (!cats) {
      throw new Error('no categories found on this event, aborting deletion');
    }
    // Delete all categories associated with event
    await Promise.all(
      cats.map((c) => {
        if (!c) return null;
        return deleteCategory(c.id);
      }),
    );
    // Then delete the event
    const { data, errors } = await GraphqlAPI<
      DeleteEventMutation,
      DeleteEventMutationVariables
    >(mutations.deleteEvent, { input: { id } });
    if (!data?.deleteEvent) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error deleting event', err);
  }
};
