import React, { createContext, useContext, useState } from 'react';

/**
 * Lets us get the userId and userEmail synchronously
 */

export type iEventDisplayState = 'default' | 'collapsed';
export type iCategoryDisplayState = 'list' | 'list-collapsed' | 'grid';

type iDisplayStateContext = {
  eventDisplayState: iEventDisplayState;
  categoryDisplayState: iCategoryDisplayState;
  toggleEventDisplay: () => void;
  toggleCategoriesDisplay: () => void;
};

const DisplayStateContext = createContext<iDisplayStateContext>({
  eventDisplayState: 'default',
  categoryDisplayState: 'list',
  toggleEventDisplay: () => {},
  toggleCategoriesDisplay: () => {},
});

export const DisplayProvider = (props: { children: React.ReactNode }) => {
  const [eventDisplayState, setEventDisplayState] = useState<iEventDisplayState>(
    'default',
  );
  const [categoryDisplayState, setCategoryDisplayState] = useState<iCategoryDisplayState>(
    'list',
  );

  const toggleEventDisplay = () => {
    switch (eventDisplayState) {
      case 'default':
        setEventDisplayState('collapsed');
        break;
      case 'collapsed':
        setEventDisplayState('default');
        break;
    }
  };

  const toggleCategoriesDisplay = () => {
    switch (categoryDisplayState) {
      case 'list':
        setCategoryDisplayState('list-collapsed');
        break;
      case 'list-collapsed':
        setCategoryDisplayState('grid');
        break;
      case 'grid':
        setCategoryDisplayState('list');
        break;
    }
  };

  return (
    <DisplayStateContext.Provider
      value={{
        eventDisplayState,
        categoryDisplayState,
        toggleEventDisplay,
        toggleCategoriesDisplay,
      }}
    >
      {props.children}
    </DisplayStateContext.Provider>
  );
};

export const useDisplayState = () => useContext(DisplayStateContext);
