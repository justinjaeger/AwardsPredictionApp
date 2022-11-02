import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import ApiServices from '../../services/graphql';
import { getAllEvents } from '../reducers/predictions';
import { iIndexedCategories, iIndexedEvents } from '../types';

export const thunkGetAllEvents = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => async (dispatch) => {
  // call the api
  const { data } = await ApiServices.getAllEvents();
  const events = data?.listEvents?.items;
  if (!events) return;
  // format events data
  const indexedEvents: iIndexedEvents = {};
  events?.forEach((e) => {
    if (!e) return;
    // format categories
    const indexedCategories: iIndexedCategories = {};
    const categories = e.categories?.items;
    if (!categories) return;
    categories.forEach((c) => {
      if (!c) return;
      indexedCategories[c.id] = {
        id: c.id,
        type: c.type,
        name: c.name,
      };
    });
    indexedEvents[e.id] = {
      id: e.id,
      categories: indexedCategories,
      awardsBody: e.awardsBody,
      year: e.year,
      type: e.type,
      expiration: e.expiration || '',
      isActive: e.isActive || undefined,
    };
  });
  // dispatch event to update store
  dispatch(
    getAllEvents({
      events: indexedEvents,
    }),
  );
};
