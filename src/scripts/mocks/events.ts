import { getAwardsBodyCategories, iCategoryData } from '../../constants/categories';
import { AwardsBody, EventType, CategoryName } from '../../models';
import ApiServices from '../../services/graphql';

const EVENTS = [
  { awardsBody: AwardsBody.ACADEMY_AWARDS, year: 2023, type: EventType.NOMINATION }, // expect isActive to have a value of "x"
  //   { awardsBody: AwardsBody.GOLDEN_GLOBES, year: 2023, type: EventType.NOMINATION },
];

export const createMockEvents = () => {
  EVENTS.forEach(async (event) => {
    const { data: e } = await ApiServices.createEvent(
      event.awardsBody,
      event.year,
      event.type,
    );
    if (!e) return;
    console.log('created event', e);
    const eventId = e?.createEvent?.id;
    if (!eventId) {
      return console.error('error creating event in createMockEvents');
    }
    // create categories on event
    const category = getAwardsBodyCategories(event.awardsBody, event.year);
    const categoryList = Object.entries(category) as [
      CategoryName,
      iCategoryData | undefined,
    ][];
    categoryList.forEach(async ([catName, catData]) => {
      if (catData) {
        const newCat = await ApiServices.createCategory(catName, catData.type, eventId);
        console.log('created new category', newCat);
      }
    });
  });
};

export const deleteMockEvents = () => {
  EVENTS.forEach(async (event) => {
    const { data: maybeEvents } = await ApiServices.getUniqueEvents(
      event.awardsBody,
      event.year,
      event.type,
    );
    if (!maybeEvents || !maybeEvents.listEvents) {
      return console.error('error in deleteMockEvents');
    }
    if (maybeEvents.listEvents.items.length > 0) {
      // should only be one event found in the response, but do forEach to be safe
      maybeEvents.listEvents.items.forEach(async (event) => {
        if (!event) return;
        const res = await ApiServices.deleteEvent(event.id);
        console.log('deleted event', res);
      });
    } else {
      console.log('event does not exist');
    }
  });
};
