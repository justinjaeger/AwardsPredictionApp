export const formatPercentage = (num: number, round?: boolean) =>
  parseFloat((num * 100).toString())
    .toFixed(round ? 0 : 2)
    .toString() + '%';

export const formatDecimalAsPercentage = (num: number, round?: boolean) =>
  parseFloat(num.toString()).toFixed(round ? 0 : 2);
