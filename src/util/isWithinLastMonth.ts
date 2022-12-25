/**
 * Return true if date string is within last month
 */
export const isWithinLastMonth = (lastUpdated: string) => {
  const lastUpdatedDate = new Date(lastUpdated);
  const now = new Date();
  const diff = now.getTime() - lastUpdatedDate.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays <= 30;
};
