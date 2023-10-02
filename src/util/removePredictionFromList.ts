import _ from 'lodash';
import { iPrediction } from '../types/api';

export const removePredictionFromList = (
  arr: iPrediction[],
  itemToRemove: iPrediction,
) => {
  const clonedArray = _.clone(arr);
  return clonedArray.reduce((acc: iPrediction[], item) => {
    const isEqual = item.contenderId === itemToRemove.contenderId;
    if (!isEqual) {
      acc.push(item);
    }
    return acc;
  }, []);
};
