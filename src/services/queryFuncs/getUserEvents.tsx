import ApiServices from '../graphql';

// returns a list of unique eventIds that the user has participated in
const getUserEvents = async (id: string): Promise<string[]> => {
  const { data } = await ApiServices.getUserEvents(id);
  // "items" is basically: { eventId:string }[]
  const events = data?.getUser?.predictionSets?.items || [];
  // remove duplicates
  const mappedEventIds = events.reduce((acc: { [eventId: string]: boolean }, event) => {
    const eventId = event?.eventId || undefined;
    if (eventId === undefined) return acc;
    if (!acc[eventId]) {
      acc[eventId] = true;
    }
    return acc;
  }, {});
  return Object.keys(mappedEventIds);
};

export default getUserEvents;
