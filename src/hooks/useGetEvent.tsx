import useQueryGetAllEvents from './queries/useQueryGetAllEvents';

export const useGetEvent = (eventId: string) => {
  const { data: events } = useQueryGetAllEvents();
  const event = events?.find((e) => e._id === eventId);
  return event;
};
