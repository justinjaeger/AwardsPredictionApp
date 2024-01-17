export const yyyymmddToDate = (_yyyymmdd: number) => {
  const yyyymmdd = _yyyymmdd.toString();
  const year = yyyymmdd.slice(0, 4);
  const month = yyyymmdd.slice(4, 6);
  const day = yyyymmdd.slice(6, 8);
  return new Date(`${year}-${month}-${day}`);
};
