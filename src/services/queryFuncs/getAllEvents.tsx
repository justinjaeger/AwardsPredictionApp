import { iIndexedCategories, iIndexedEvents } from '../../types';
import ApiServices from '../graphql';

const getAllEvents = async () => {
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
  return indexedEvents;
};

export default getAllEvents;
