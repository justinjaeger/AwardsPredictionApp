export const formatYyyymmdd = (yyyymmdd: number): string => {
  const date = new Date();
  date.setFullYear(yyyymmdd / 10000);
  date.setMonth((yyyymmdd % 10000) / 100 - 1);
  date.setDate(yyyymmdd % 100);
  const year = date.getFullYear();
  // format month like "Jan"
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
};
