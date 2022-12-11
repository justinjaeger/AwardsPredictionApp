import ApiServices from '.';
import {
  ListEventsQuery,
  CreateEventMutation,
  DeleteEventMutation,
  AwardsBody,
  ListEventsQueryVariables,
  CreateEventMutationVariables,
  DeleteEventMutationVariables,
  UpdateEventMutation,
  UpdateEventMutationVariables,
  EventStatus,
  UpdateEventInput,
  CategoryName,
} from '../../API';
import { getAwardsBodyCategories, iCategoryData } from '../../constants/categories';
import * as mutations from '../../graphql/mutations';
import * as customQueries from '../../graphqlCustom/queries';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';
import { deleteCategory, getCategoriesByEvent } from './category';

export const getAllEvents = async (): Promise<iApiResponse<ListEventsQuery>> => {
  try {
    const { data, errors } = await GraphqlAPI<ListEventsQuery, ListEventsQueryVariables>(
      customQueries.listEvents,
    );
    if (!data?.listEvents) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting all events', err);
  }
};

export const getUniqueEvents = async (
  awardsBody: AwardsBody,
  year: number,
): Promise<iApiResponse<ListEventsQuery>> => {
  try {
    // enforce uniqueness - don't allow duplicate events to be created
    const { data, errors } = await GraphqlAPI<ListEventsQuery, ListEventsQueryVariables>(
      customQueries.listEvents,
      {
        filter: {
          awardsBody: { eq: awardsBody },
          year: { eq: year },
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

// Creates events AND categories on event
// TODO: Make atomic, so that if one category fails to create, the whole event is not created
export const createEvent = async (
  awardsBody: AwardsBody,
  year: number,
): Promise<iApiResponse<CreateEventMutation>> => {
  try {
    // enforce uniqueness - don't allow duplicate events to be created
    const { data: d } = await getUniqueEvents(awardsBody, year);
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
      {
        input: {
          awardsBody,
          year,
          status: EventStatus.NOMS_STAGING, // important that this is the default
        },
      },
    );
    if (!data?.createEvent) {
      throw new Error(JSON.stringify(errors));
    }
    const eventId = data.createEvent.id;
    // create categories on event
    const category = getAwardsBodyCategories(awardsBody, year);
    const categoryList = Object.entries(category) as [
      CategoryName,
      iCategoryData | undefined,
    ][];
    categoryList.forEach(async ([catName, catData]) => {
      if (catData) {
        await ApiServices.createCategory(catName, catData.type, eventId);
      }
    });
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

export const updateEvent = async (
  eventId: string,
  params: {
    awardsBody?: AwardsBody;
    year?: number;
    status?: EventStatus;
    nominationDateTime?: string | null;
    winDateTime?: string | null;
  },
): Promise<iApiResponse<UpdateEventMutation>> => {
  const { awardsBody, year, status, nominationDateTime, winDateTime } = params;
  // create input object with only the fields that are being updated
  const input: UpdateEventInput = { id: eventId };
  if (awardsBody) input.awardsBody = awardsBody;
  if (year) input.year = year;
  if (status) input.status = status;
  if (nominationDateTime !== undefined) input.nominationDateTime = nominationDateTime;
  if (winDateTime !== undefined) input.winDateTime = winDateTime;
  try {
    // Update event
    const { data, errors } = await GraphqlAPI<
      UpdateEventMutation,
      UpdateEventMutationVariables
    >(mutations.updateEvent, { input });
    if (!data?.updateEvent) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success' };
  } catch (err) {
    return handleError('error creating event', err);
  }
};
