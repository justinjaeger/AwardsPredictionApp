import { ContenderVisibility } from '../API';
import { iPrediction } from '../types';

/**
 * Filters out contenders marked "hidden"
 */
export const filterHiddenContenders = (predictions: iPrediction[]) => {
  return predictions.filter(
    (prediction) => prediction.visibility !== ContenderVisibility.VISIBLE,
  );
};
