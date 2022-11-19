import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useState } from 'react';
import { CategoryType } from '../API';
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
  displayContenderInfo: (contenderId: string, personTmdbId?: number) => void;
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
  displayContenderInfo: () => {},
});

// TODO: think we can delete eventId since not using it

export const CategoryProvider = (props: { children: React.ReactNode }) => {
  const navigation = useNavigation();

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

  const displayFilm = (contenderId: string) => {
    if (!category) return;
    navigation.navigate('ContenderDetails', {
      contenderId,
      categoryType: category.type,
    });
  };

  const displayPerformance = async (contenderId: string, personTmdb: number) => {
    if (!category) return;
    navigation.navigate('ContenderDetails', {
      contenderId,
      categoryType: category.type,
      personTmdb,
    });
  };

  const displayContenderInfo = (contenderId: string, personTmdb?: number) => {
    if (!category) return;
    const cType = CategoryType[category.type];
    if (cType === CategoryType.PERFORMANCE && personTmdb) {
      displayPerformance(contenderId, personTmdb);
    } else {
      displayFilm(contenderId);
    }
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
        displayContenderInfo,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
