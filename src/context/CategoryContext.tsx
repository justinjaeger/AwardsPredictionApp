import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './UserContext';
import { CategoryName, EventModel } from '../types/api';

/**
 * Context that wraps the "read only" screens shared by global and personal
 */

type iPersonalCommunityTab = 'personal' | 'community';

type CategoryNameContext = {
  event: EventModel | undefined;
  setEvent: (event: EventModel) => void;
  category: CategoryName | undefined;
  setCategory: (category: CategoryName) => void;
  personalCommunityTab: iPersonalCommunityTab;
  setPersonalCommunityTab: (d: iPersonalCommunityTab) => void;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  reset: () => void;
};

const CategoryContext = createContext<CategoryNameContext>({
  event: undefined,
  setEvent: () => {},
  category: undefined,
  setCategory: () => {},
  personalCommunityTab: 'personal',
  setPersonalCommunityTab: () => {},
  isEditing: false,
  setIsEditing: () => {},
  reset: () => {},
});

export const CategoryProvider = (props: { children: React.ReactNode }) => {
  const { userId } = useAuth();

  const [event, setEvent] = useState<EventModel>();
  const [category, setCategory] = useState<CategoryName>();
  const [personalCommunityTab, setPersonalCommunityTab] = useState<iPersonalCommunityTab>(
    userId === undefined ? 'community' : 'personal',
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // if user is logged out, show community predictions by default
  useEffect(() => {
    setPersonalCommunityTab(userId === undefined ? 'community' : 'personal');
  }, [userId === undefined]);

  const reset = () => {
    setPersonalCommunityTab('personal');
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
        isEditing,
        setIsEditing,
        reset,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
