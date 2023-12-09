import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

/**
 * Context for referencing the current tab, event, category, and user (who's predix we're seeing)
 */

type iPersonalCommunityTab = 'personal' | 'community';

type iPersonalCommunityTabContext = {
  personalCommunityTab: iPersonalCommunityTab;
  setPersonalCommunityTab: (d: iPersonalCommunityTab) => void;
};

const PersonalCommunityTabContext = createContext<iPersonalCommunityTabContext>({
  personalCommunityTab: 'personal',
  setPersonalCommunityTab: () => {},
});

export const PersonalCommunityTabProvider = (props: { children: React.ReactNode }) => {
  const { userId: authUserId } = useAuth();

  // it's strange but we have to use setPersonalCommunityTab manually when we navigate
  const [personalCommunityTab, setPersonalCommunityTab] = useState<iPersonalCommunityTab>(
    authUserId === undefined ? 'community' : 'personal',
  );

  return (
    <PersonalCommunityTabContext.Provider
      value={{
        personalCommunityTab,
        setPersonalCommunityTab,
      }}
    >
      {props.children}
    </PersonalCommunityTabContext.Provider>
  );
};

export const usePersonalCommunityTab = () => useContext(PersonalCommunityTabContext);
