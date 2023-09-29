import React, { createContext, useContext, useState } from 'react';
import { useAsyncEffect } from '../util/hooks';
import MongoApi from '../services/api/requests';
import { AwardsBody, CategoryName, EventModel, WithId, iCategory } from '../types/api';

type iOpenEventsContext = {
  openEvents: WithId<EventModel>[];
  getEvent: (awardsBody: AwardsBody, year: number) => WithId<EventModel> | undefined;
  getCategory: (
    awardsBody: AwardsBody,
    year: number,
    categoryName: CategoryName,
  ) => iCategory | undefined;
  getCategoryByEventId: (
    eventId: string,
    categoryName: CategoryName,
  ) => iCategory | undefined;
};

const OpenEventsContext = createContext<iOpenEventsContext>({
  openEvents: [],
  getEvent: () => undefined,
  getCategory: () => undefined,
  getCategoryByEventId: () => undefined,
});

/**
 * This top-level provider fetches all open events for ease of access throughout app
 */

export const OpenEventsProvider = (props: { children: React.ReactNode }) => {
  const [openEvents, setOpenEvents] = useState<WithId<EventModel>[]>([]);

  useAsyncEffect(async () => {
    // we want events from this calendar year AND NEXT
    const { data: events } = await MongoApi.getEvents({ isOpen: true });
    if (events) {
      setOpenEvents(events);
    }
  }, []);

  const getEvent = (awardsBody: AwardsBody, year: number) => {
    return openEvents.find(
      (event) => event.awardsBody === awardsBody && event.year === year,
    );
  };

  const getCategory = (
    awardsBody: AwardsBody,
    year: number,
    categoryName: CategoryName,
  ) => {
    const event = getEvent(awardsBody, year);
    if (!event) return undefined;
    return event.categories[categoryName];
  };

  const getCategoryByEventId = (eventId: string, categoryName: CategoryName) => {
    const event = openEvents.find((event) => event._id === eventId);
    if (!event) return undefined;
    return event.categories[categoryName];
  };

  return (
    <OpenEventsContext.Provider
      value={{ openEvents, getEvent, getCategory, getCategoryByEventId }}
    >
      {props.children}
    </OpenEventsContext.Provider>
  );
};

export const useOpenEvents = () => useContext(OpenEventsContext);
