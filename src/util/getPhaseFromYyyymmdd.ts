import { EventModel, Phase } from '../models';

const dateToYyyymmdd = (d: Date | string): number => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year * 10000 + month * 100 + day;
};

export const getPhaseFromYyyymmdd = (
  yyyymmdd: number,
  event: EventModel,
): Phase | undefined => {
  const shortlistYyyymmdd =
    event.shortlistDateTime && dateToYyyymmdd(new Date(event.shortlistDateTime));
  const nomDateTime = event.nomDateTime && dateToYyyymmdd(new Date(event.nomDateTime));
  const winDateTime = event.winDateTime && dateToYyyymmdd(new Date(event.winDateTime));

  if (shortlistYyyymmdd && yyyymmdd <= shortlistYyyymmdd) {
    return Phase.SHORTLIST;
  }
  if (nomDateTime && yyyymmdd <= nomDateTime) {
    return Phase.NOMINATION;
  }
  if (winDateTime && yyyymmdd <= winDateTime) {
    return Phase.WINNER;
  }
  return undefined;
};
