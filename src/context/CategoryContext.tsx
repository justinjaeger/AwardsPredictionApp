import React, { createContext, useContext, useState } from 'react';
import { iCategory, iEvent } from '../store/types';

/**
 * Context that wraps the "read only" screens shared by global and personal
 */

type iPersonalCommunityTab = 'personal' | 'community';

type iCategoryContext = {
  eventId: string | undefined;
  setEventId: (id: string) => void;
  event: iEvent | undefined;
  setEvent: (event: iEvent) => Promise<void>;
  category: iCategory | undefined;
  setCategory: (category: iCategory) => Promise<void>;
  personalCommunityTab: iPersonalCommunityTab;
  setPersonalCommunityTab: (d: iPersonalCommunityTab) => void;
};

const CategoryContext = createContext<iCategoryContext>({
  eventId: undefined,
  setEventId: () => {},
  event: undefined,
  setEvent: () => new Promise(() => {}),
  category: undefined,
  setCategory: () => new Promise(() => {}),
  personalCommunityTab: 'community',
  setPersonalCommunityTab: () => {},
});

export const CategoryProvider = (props: { children: React.ReactNode }) => {
  const [eventId, _setEventId] = useState<string>();
  const [event, _setEvent] = useState<iEvent>();
  const [category, _setCategory] = useState<iCategory>();
  const [personalCommunityTab, setPersonalCommunityTab] = useState<iPersonalCommunityTab>(
    'community',
  );

  const setEventId = (eventId: string) => {
    _setEventId(eventId);
  };

  const setEvent = async (event: iEvent) => {
    _setEvent(event);
  };

  const setCategory = async (cateogry: iCategory) => {
    _setCategory(cateogry);
  };

  return (
    <CategoryContext.Provider
      value={{
        event,
        setEvent,
        category,
        setCategory,
        personalCommunityTab,
        setPersonalCommunityTab,
        eventId,
        setEventId,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
