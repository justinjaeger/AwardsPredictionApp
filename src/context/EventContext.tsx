import React, { createContext, useContext, useRef, useState } from 'react';
import { Animated, useWindowDimensions } from 'react-native';

/**
 * Context for referencing the current tab, event, category, and user (who's predix we're seeing)
 */

type iPersonalCommunityTab = 'personal' | 'community';

type iPersonalCommunityTabContext = {
  personalCommunityTab: iPersonalCommunityTab;
  setPersonalCommunityTab: (d: iPersonalCommunityTab, disableAnimation?: boolean) => void;
  scrollPosX: Animated.Value;
};

const PersonalCommunityTabContext = createContext<iPersonalCommunityTabContext>({
  personalCommunityTab: 'personal',
  setPersonalCommunityTab: () => {},
  scrollPosX: new Animated.Value(0),
});

export const PersonalCommunityTabProvider = (props: { children: React.ReactNode }) => {
  const scrollPosX = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  const [personalCommunityTab, _setPersonalCommunityTab] =
    useState<iPersonalCommunityTab>('personal');

  const scrollToX = (v: number, disableAnimation?: boolean) => {
    Animated.timing(scrollPosX, {
      toValue: -v,
      duration: disableAnimation ? 0 : 250,
      useNativeDriver: true,
    }).start();
  };

  const setPersonalCommunityTab = (
    tab: iPersonalCommunityTab,
    disableAnimation?: boolean,
  ) => {
    _setPersonalCommunityTab(tab);
    scrollToX(tab === 'personal' ? 0 : width, disableAnimation);
  };

  return (
    <PersonalCommunityTabContext.Provider
      value={{
        personalCommunityTab,
        setPersonalCommunityTab,
        scrollPosX,
      }}
    >
      {props.children}
    </PersonalCommunityTabContext.Provider>
  );
};

export const usePersonalCommunityTab = () => useContext(PersonalCommunityTabContext);
