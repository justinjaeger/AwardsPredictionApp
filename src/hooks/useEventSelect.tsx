import { useEffect, useState } from 'react';
import { AwardsBody, EventModel, WithId } from '../models';
import { useRouteParams } from './useRouteParams';
import useQueryGetAllEvents from './queries/useQueryGetAllEvents';

export const useEventSelect = () => {
  const { event: initialEvent, yyyymmdd: initialYyyymmdd } = useRouteParams();
  const { data: events, defaultEvent } = useQueryGetAllEvents();

  const [yyyymmdd, setYyyymmdd] = useState<number | undefined>(initialYyyymmdd);
  const [year, _setYear] = useState<number | undefined>(
    initialEvent?.year ?? defaultEvent?.year,
  );
  const [event, setEvent] = useState<WithId<EventModel> | undefined>(
    initialEvent ?? defaultEvent,
  );
  const setYear = (year: number) => {
    _setYear(year);
    const eventsWithNewYear = events?.filter((e) => e.year === year);
    const eventWithNewYearAndSameAwardsBody = eventsWithNewYear?.find(
      (e) => e.awardsBody === event?.awardsBody,
    );
    if (eventWithNewYearAndSameAwardsBody) {
      setEvent(eventWithNewYearAndSameAwardsBody);
      return;
    }
    const defaultEvent =
      eventsWithNewYear?.find((e) => e.awardsBody === AwardsBody.ACADEMY_AWARDS) ||
      eventsWithNewYear?.[0];
    if (defaultEvent) {
      setEvent(defaultEvent);
    }
  };

  // sets event as most recent academy awards if none is selected
  useEffect(() => {
    if (!event && defaultEvent) {
      setEvent(defaultEvent);
      setYear(defaultEvent.year);
    }
  }, [defaultEvent]);

  return { yyyymmdd, setYyyymmdd, year, setYear, event, setEvent };
};
