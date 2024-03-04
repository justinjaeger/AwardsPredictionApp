import React, { createContext, useContext, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SharedValue, useSharedValue, withTiming } from 'react-native-reanimated';

/**
 * Context for referencing the current tab, event, category, and user (who's predix we're seeing)
 */

type iPersonalCommunityTab = 'personal' | 'community';

type iPersonalCommunityTabContext = {
  personalCommunityTab: iPersonalCommunityTab;
  setPersonalCommunityTab: (d: iPersonalCommunityTab, disableAnimation?: boolean) => void;
  tabsPosX: SharedValue<number>;
};

const PersonalCommunityTabContext = createContext<iPersonalCommunityTabContext>({
  personalCommunityTab: 'personal',
  setPersonalCommunityTab: () => {},
  tabsPosX: { value: 0 } as SharedValue<number>,
});

export const PersonalCommunityTabProvider = (props: { children: React.ReactNode }) => {
  const tabsPosX = useSharedValue(0);
  const { width } = useWindowDimensions();

  const [personalCommunityTab, _setPersonalCommunityTab] =
    useState<iPersonalCommunityTab>('personal');

  const scrollToX = (v: number, disableAnimation?: boolean) => {
    tabsPosX.value = disableAnimation ? v : withTiming(-v, { duration: 250 });
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
        tabsPosX,
      }}
    >
      {props.children}
    </PersonalCommunityTabContext.Provider>
  );
};

export const usePersonalCommunityTab = () => useContext(PersonalCommunityTabContext);
