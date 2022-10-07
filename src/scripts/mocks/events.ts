import { DataStore } from 'aws-amplify';
import { getAwardsBodyCategories, iCategoryData } from '../../constants/categories';
import { AwardsBody, EventType, Event, Category, CategoryName } from '../../models';

const EVENTS = [
  { awardsBody: AwardsBody.ACADEMY_AWARDS, year: 2023, type: EventType.NOMINATION }, // expect isActive to have a value of "x"
  //   { awardsBody: AwardsBody.GOLDEN_GLOBES, year: 2023, type: EventType.NOMINATION },
];

const getPotentialDuplicateEvents = async (newEvent: any) => {
  return await DataStore.query(
    Event,
    (e) =>
      e.awardsBody('eq', newEvent.awardsBody) &&
      e.year('eq', newEvent.year) &&
      e.type('eq', newEvent.type),
  );
};

export const createMockEvents = () => {
  EVENTS.forEach(async (event) => {
    const maybeEvents = await getPotentialDuplicateEvents(event);
    if (maybeEvents.length !== 0) {
      console.log('event already exists');
    }
    const newEvent = await DataStore.save(new Event(event));
    console.log('created event', newEvent);
    // create categories on event
    const category = getAwardsBodyCategories(event.awardsBody, event.year);
    const categoryList = Object.entries(category) as [
      CategoryName,
      iCategoryData | undefined,
    ][];
    categoryList.forEach(async ([catName, catData]) => {
      if (catData) {
        const newCat = await DataStore.save(
          new Category({
            name: catName,
            event: newEvent,
            type: catData.type,
          }),
        );
        console.log('created new category', newCat);
      }
    });
  });
};

export const deleteMockEvents = () => {
  EVENTS.forEach(async (event) => {
    const maybeEvents = await getPotentialDuplicateEvents(event);
    if (maybeEvents.length > 0) {
      const res = await DataStore.delete(Event, maybeEvents[0].id);
      console.log('deleted event', res);
    } else {
      console.log('event does not exist');
    }
  });
};
