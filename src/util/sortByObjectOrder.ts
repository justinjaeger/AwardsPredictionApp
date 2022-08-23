/**
 * Sorts an array based on the insert order of an object (with keys of type Enum)
 * @param objectWithOrderedKeys should be an object where keys are of an Enum type
 * @param arrayToSort
 * @param arrayOfMappedKeys should be the result of calling .map() on arrayToSort
 */
const sortByObjectOrder = <T extends string, U>(
  objectWithOrderedKeys: { [key in T]: any },
  arrayToSort: U[],
  arrayOfMappedKeys: T[],
) => {
  const iterableKeys = (Object.keys(objectWithOrderedKeys) as T[]).filter(
    (key) => objectWithOrderedKeys[key] !== undefined, // filter makes sure no undefined values are returned
  );
  if (arrayOfMappedKeys.length !== arrayToSort.length) {
    console.error('invalid params in sortByObjectOrder');
    return arrayToSort;
  }
  return iterableKeys.reduce((acc: U[], key) => {
    const filteredEvents = arrayToSort.filter((item, i) => {
      const itemToCompare = arrayOfMappedKeys[i];
      return itemToCompare === key;
    });
    return [...acc, ...filteredEvents];
  }, []);
};

export default sortByObjectOrder;
