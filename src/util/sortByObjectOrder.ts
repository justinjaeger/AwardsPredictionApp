import { CategoryName, EventModel, iCategoryPrediction } from '../models';
import { ORDERED_CATEGORIES } from '../constants/categories';
import { getCategoryIsHidden } from './getCategoryIsHidden';
import { iCategoryListItem } from '../screens/Predictions/Event/CategoryListItem';

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

export const getOrderedPredictionSetCategories = (
  event: EventModel,
  unorderedCategories?: Record<CategoryName, iCategoryPrediction>,
): Array<iCategoryListItem> => {
  const allCategoriesInOrder = getCategoriesFromEvent(event);
  return allCategoriesInOrder.map((catName) => {
    const valuesForGivenKey = unorderedCategories
      ? (unorderedCategories[catName] as iCategoryPrediction | undefined)
      : undefined;
    return [catName, valuesForGivenKey?.predictions || []];
  }, []);
};

// gets all categories from event and returns them in an ordered list
export const getCategoriesFromEvent = (event: EventModel): Array<CategoryName> => {
  const allCategoriesInEvent = Object.keys(event.categories);
  const allNonHiddenCategoriesInEvent = allCategoriesInEvent.filter(
    (category) => !getCategoryIsHidden(event, category as CategoryName),
  );
  return ORDERED_CATEGORIES.reduce((acc: Array<CategoryName>, categoryName) => {
    if (allNonHiddenCategoriesInEvent.includes(categoryName)) {
      acc.push(categoryName);
    }
    return acc;
  }, []);
};

export default sortByObjectOrder;
