export const formatDateTime = (date: Date) => {
  const d = new Date(date);
  const t = d.toLocaleTimeString();
  const time = t.slice(0, t.length - 9) + t.slice(t.length - 2);
  return d.getMonth() + 1 + '/' + d.getDate() + ' ' + time;
};
