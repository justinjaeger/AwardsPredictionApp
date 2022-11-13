import _ from 'lodash';

export const removeFromArray = <T>(arr: T[], itemToRemove: T) => {
  const clonedArray = _.clone(arr);
  return clonedArray.reduce((acc: T[], item) => {
    const isEqual = _.isEqual(item, itemToRemove);
    if (!isEqual) {
      acc.push(item);
    }
    return acc;
  }, []);
};
