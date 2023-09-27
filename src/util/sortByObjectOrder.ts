import _ from 'lodash';
import { getAwardsBodyCategories } from '../constants/categories';
import { AwardsBody, CategoryName, iCategoryPrediction } from '../types/api';

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

export const getOrderedPredictions = (
  awardsBody: AwardsBody,
  year: number,
  unorderedCategories: Record<CategoryName, iCategoryPrediction>,
) => {
  const awardsBodyCategories = getAwardsBodyCategories(awardsBody, year);
  const orderedCategoryKeys = _.keys(awardsBodyCategories) as CategoryName[];
  return orderedCategoryKeys.reduce(
    (acc: Map<CategoryName, iCategoryPrediction>, key) => {
      const valuesForGivenKey = unorderedCategories[key];
      if (!valuesForGivenKey) return acc;
      acc.set(key, valuesForGivenKey);
      return acc;
    },
    new Map(),
  );
};

export default sortByObjectOrder;
