export const formatPercentage = (num: number, round?: boolean) =>
  parseFloat((num * 100).toString())
    .toFixed(round ? 0 : 2)
    .toString() + '%';
