/**
 * Limit a number within a range
 */
export const getNumberWithinRange = (
  num: number,
  { min, max }: { min: number; max: number },
) => {
  return Math.max(min, Math.min(max, num));
};
