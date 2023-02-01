import React, { createContext, useContext, useState } from 'react';
import { iCategory, iEvent } from '../types';

/**
 * Context that wraps the "read only" screens shared by global and personal
 */

type iPersonalCommunityTab = 'personal' | 'community';

type iCategoryContext = {
  event: iEvent | undefined;
  setEvent: (event: iEvent) => Promise<void>;
  category: iCategory | undefined;
  setCategory: (category: iCategory) => Promise<void>;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  personalCommunityTab: iPersonalCommunityTab;
  setPersonalCommunityTab: (d: iPersonalCommunityTab) => void;
  reset: () => void;
};

const CategoryContext = createContext<iCategoryContext>({
  event: undefined,
  setEvent: () => new Promise(() => {}),
  category: undefined,
  setCategory: () => new Promise(() => {}),
  date: undefined,
  setDate: () => {},
  personalCommunityTab: 'personal',
  setPersonalCommunityTab: () => {},
  reset: () => {},
});

// TODO: think we can delete eventId since not using it

export const CategoryProvider = (props: { children: React.ReactNode }) => {
  const [event, _setEvent] = useState<iEvent>();
  const [category, _setCategory] = useState<iCategory>();
  const [personalCommunityTab, setPersonalCommunityTab] = useState<iPersonalCommunityTab>(
    'personal',
  );
  const [date, setDate] = useState<Date | undefined>(undefined);

  const setEvent = async (event: iEvent) => {
    _setEvent(event);
  };

  const setCategory = async (cateogry: iCategory) => {
    _setCategory(cateogry);
  };

  const reset = () => {
    setPersonalCommunityTab('personal');
    setDate(undefined);
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
        date,
        setDate,
        reset,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
