import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { CategoryName, EventModel, WithId } from '../types/api';

/**
 * Context that wraps the "read only" screens shared by community and personal
 */

type iPersonalCommunityTab = 'personal' | 'community';

type iEventContext = {
  event: WithId<EventModel> | undefined;
  setEvent: (event: WithId<EventModel>) => void;
  category: CategoryName | undefined;
  setCategory: (category: CategoryName) => void;
  personalCommunityTab: iPersonalCommunityTab;
  setPersonalCommunityTab: (d: iPersonalCommunityTab) => void;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
};

const EventContext = createContext<iEventContext>({
  event: undefined,
  setEvent: () => {},
  category: undefined,
  setCategory: () => {},
  personalCommunityTab: 'personal',
  setPersonalCommunityTab: () => {},
  isEditing: false,
  setIsEditing: () => {},
});

export const EventProvider = (props: { children: React.ReactNode }) => {
  const { userId } = useAuth();

  const [event, setEvent] = useState<WithId<EventModel>>();
  const [category, setCategory] = useState<CategoryName>();
  const [personalCommunityTab, setPersonalCommunityTab] = useState<iPersonalCommunityTab>(
    userId === undefined ? 'community' : 'personal',
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <EventContext.Provider
      value={{
        event,
        setEvent,
        category,
        setCategory,
        personalCommunityTab,
        setPersonalCommunityTab,
        isEditing,
        setIsEditing,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
