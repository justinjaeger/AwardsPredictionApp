export const formatPercentage = (num: number, round?: boolean) =>
  parseFloat((num * 100).toString())
    .toFixed(round ? 0 : 2)
    .toString() + '%';

export const formatDecimalAsPercentage = (num: number, round?: boolean) =>
  parseFloat(num.toString()).toFixed(round ? 0 : 2);

/**
 * ex: 0.6666666 -> 66.67
 * NOTE: Must be the same as "formatPercentage" on the backend
 */
export const formatLowDecimalAsPercentage = (decimal: number) => {
  return Math.round(decimal * 100 * 100) / 100;
};
