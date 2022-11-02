import React, { createContext, useContext, useState } from 'react';
import { GetCategoryQuery, GetEventQuery } from '../API';
import ApiServices from '../services/graphql';

/**
 * Context that wraps the "read only" screens shared by global and personal
 */

type iPersonalCommunityTab = 'personal' | 'community';

type iCategoryContext = {
  eventId: string | undefined;
  setEventId: (id: string) => void;
  event: GetEventQuery | undefined;
  setEvent: (id: string) => Promise<void>;
  category: GetCategoryQuery | undefined;
  setCategory: (id: string) => Promise<void>;
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
  const [event, _setEvent] = useState<GetEventQuery>();
  const [category, _setCategory] = useState<GetCategoryQuery>();
  const [personalCommunityTab, setPersonalCommunityTab] = useState<iPersonalCommunityTab>(
    'community',
  );

  //   console.error('pct', personalCommunityTab);
  const setEventId = (eventId: string) => {
    _setEventId(eventId);
  };

  const setEvent = async (eventId: string) => {
    console.error('setEvent', eventId);
    const { data } = await ApiServices.getEventById(eventId);
    _setEvent(data);
  };

  const setCategory = async (categoryId: string) => {
    const { data } = await ApiServices.getCategoryById(categoryId);
    _setCategory(data);
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
