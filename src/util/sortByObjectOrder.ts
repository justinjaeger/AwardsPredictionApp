import _ from 'lodash';
import { CategoryName, EventModel, WithId, iCategoryPrediction } from '../types/api';
import { AWARDS_BODY_TO_STRING } from '../constants/awardsBodies';
import { ORDERED_CATEGORIES } from '../constants/categories';
import { getCategoryIsHidden } from './getCategoryIsHidden';

/**
 * Sorts an array based on the insert order of an object (with keys of type Enum)
 * @param orderedKeys should be an object where keys are of an Enum type
 * @param unorderedKeys should be the result of calling .map() on arrayToSort
 * @param arrayToSort
 */
const sortByObjectOrder = <T extends string, U>(
  sortedKeys: T[],
  unorderedKeysToValues: Record<T, U>,
): Map<string, U> => {
  return sortedKeys.reduce((acc: Map<string, U>, key) => {
    const valuesForGivenKey = unorderedKeysToValues[key];
    if (!valuesForGivenKey) return acc;
    acc.set(key, valuesForGivenKey);
    return acc;
  }, new Map());
};

export const getOrderedEvents = (unorderedEvents: WithId<EventModel>[]) => {
  const orderedAwardsBodyKeys = _.keys(AWARDS_BODY_TO_STRING);
  const orderedEvents = unorderedEvents.sort((e1, e2) => {
    const i1 = orderedAwardsBodyKeys.indexOf(e1.awardsBody);
    const i2 = orderedAwardsBodyKeys.indexOf(e2.awardsBody);
    if (i1 > i2) return 1;
    if (i2 < i1) return -1;
    return 0;
  });
  return orderedEvents;
};

export const getOrderedCategories = (
  event: EventModel,
  unorderedCategories: Record<CategoryName, iCategoryPrediction>,
): Array<[CategoryName, iCategoryPrediction | undefined]> => {
  const allCategoriesInEvent = Object.keys(event.categories);
  const allNonHiddenCategoriesInEvent = allCategoriesInEvent.filter(
    (category) => !getCategoryIsHidden(event, category as CategoryName),
  );
  return ORDERED_CATEGORIES.reduce(
    (acc: Array<[CategoryName, iCategoryPrediction | undefined]>, key) => {
      const valuesForGivenKey = unorderedCategories[key] as
        | iCategoryPrediction
        | undefined;
      // if it's included in allNonHiddenCategoriesInEvent
      // then we want to include it in the list
      if (allNonHiddenCategoriesInEvent.includes(key)) {
        acc.push([key, valuesForGivenKey]);
      }
      return acc;
    },
    [],
  );
};

export default sortByObjectOrder;
