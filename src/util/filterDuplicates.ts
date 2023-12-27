/**
 * For arr of objects, pass keyExtractor prop
 */
export const filterDuplicates = <T>(arr: T[], keyExtractor?: (d: T) => string) => {
  if (keyExtractor) {
    const map = new Map<string, T>();
    arr.forEach((item) => {
      const key = keyExtractor(item);
      if (!map.has(key)) {
        map.set(key, item);
      }
    });
    return Array.from(map.values());
  } else {
    return [...new Set(arr)];
  }
};
