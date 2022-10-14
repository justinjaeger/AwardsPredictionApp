import _ from 'lodash';

export const removeFromArray = <T>(arr: T[], itemToRemove: T) => {
  return _.clone(arr).reduce((acc: T[], item) => {
    const isEqual = _.isEqual(item, itemToRemove);
    if (isEqual) {
      acc.push(item);
    }
    return acc;
  }, []);
};
