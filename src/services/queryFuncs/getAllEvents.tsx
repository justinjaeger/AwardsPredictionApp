import { EventStatus } from '../../API';
import { iIndexedCategories, iIndexedEvents } from '../../types';
import ApiServices from '../graphql';

const getAllEvents = async () => {
  const { data } = await ApiServices.getAllEvents();
  const events = data?.listEvents?.items;
  if (!events) return;
  // format events data
  const indexedEvents: iIndexedEvents = {};
  events?.forEach((e) => {
    if (!e) return undefined;
    // format categories
    const indexedCategories: iIndexedCategories = {};
    const categories = e.categories?.items;
    if (!categories) return undefined;
    categories.forEach((c) => {
      if (!c) return undefined;
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
      status: e.status || EventStatus.NOMS_STAGING, // default to NOMS_STAGING
      winDateTime: e.winDateTime || undefined,
      nominationDateTime: e.nominationDateTime || undefined,
    };
  });
  return indexedEvents;
};

export default getAllEvents;
