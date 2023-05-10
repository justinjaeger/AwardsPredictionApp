import React, { createContext, useContext, useEffect, useState } from 'react';
import { CategoryIsShortlisted, CategoryName, CategoryType } from '../API';
import ApiServices from '../services/graphql';
import { iCategory, iEvent } from '../types';
import { useAuth } from './UserContext';

/**
 * Context that wraps the "read only" screens shared by global and personal
 */

type iPersonalCommunityTab = 'personal' | 'community';

type iCategoryContext = {
  event: iEvent | undefined;
  setEvent: (event: iEvent) => void;
  eventCategories: iCategory[];
  setEventCategories: (categories: iCategory[]) => void;
  category: iCategory | undefined;
  setCategory: (category: iCategory) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  personalCommunityTab: iPersonalCommunityTab;
  setPersonalCommunityTab: (d: iPersonalCommunityTab) => void;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  reset: () => void;
};

const CategoryContext = createContext<iCategoryContext>({
  event: undefined,
  setEvent: () => {},
  category: undefined,
  setCategory: () => {},
  eventCategories: [],
  setEventCategories: () => {},
  date: undefined,
  setDate: () => {},
  personalCommunityTab: 'personal',
  setPersonalCommunityTab: () => {},
  isEditing: false,
  setIsEditing: () => {},
  reset: () => {},
});

// TODO: think we can delete eventId since not using it

export const CategoryProvider = (props: { children: React.ReactNode }) => {
  const { userId } = useAuth();

  const [event, _setEvent] = useState<iEvent>();
  const [eventCategories, _setEventCategories] = useState<iCategory[]>([]);
  const [category, _setCategory] = useState<iCategory>();
  const [personalCommunityTab, setPersonalCommunityTab] = useState<iPersonalCommunityTab>(
    userId === undefined ? 'community' : 'personal',
  );
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isEditing, _setIsEditing] = useState<boolean>(false);

  // if user is logged out, show community predictions by default
  useEffect(() => {
    setPersonalCommunityTab(userId === undefined ? 'community' : 'personal');
  }, [userId === undefined]);

  // WHEN WE SET AN EVENT automatically get the categories from it also
  const setEvent = (event: iEvent) => {
    _setEvent(event);
    ApiServices.getEventById(event.id).then((e) => {
      const categories = e.data?.getEvent?.categories?.items || [];
      const formattedCategories: iCategory[] = categories.map((cat) => ({
        id: cat?.id || '',
        name: cat?.name || CategoryName.PICTURE,
        type: cat?.type || CategoryType.FILM,
        isShortlisted: cat?.isShortlisted || CategoryIsShortlisted.FALSE,
      }));
      _setEventCategories(formattedCategories);
    });
  };

  const setCategory = (cateogry: iCategory) => {
    _setCategory(cateogry);
  };

  const setIsEditing = (isEditing: boolean) => {
    _setIsEditing(isEditing);
  };

  const setEventCategories = (categories: iCategory[]) => {
    _setEventCategories(categories);
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
        eventCategories,
        setEventCategories,
        personalCommunityTab,
        setPersonalCommunityTab,
        date,
        setDate,
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
