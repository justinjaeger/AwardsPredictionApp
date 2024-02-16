import React, { createContext, useContext, useState } from 'react';

/**
 * Context for referencing the current tab, event, category, and user (who's predix we're seeing)
 */

type iHeaderDropdownOption = {
  text: string;
  value: any;
  onPress: () => void;
  isSelected?: boolean;
};

export type iHeaderDropdownPosition = {
  top: number;
  right?: number;
  left?: number;
};

type iHeaderDropdownContext = {
  showDropdown: boolean;
  dropdownOptions: iHeaderDropdownOption[];
  position: iHeaderDropdownPosition;
  openDropdown: (
    options: iHeaderDropdownOption[],
    position: iHeaderDropdownPosition,
  ) => void;
  closeDropdown: () => void;
};

const HeaderDropdownContext = createContext<iHeaderDropdownContext>({
  showDropdown: false,
  dropdownOptions: [],
  position: { top: 0 },
  openDropdown: () => {},
  closeDropdown: () => {},
});

export const HeaderDropdownProvider = (props: { children: React.ReactNode }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [dropdownOptions, setDropdownOptions] = useState<iHeaderDropdownOption[]>([]);
  const [position, setPosition] = useState<{
    top: number;
    right?: number;
    left?: number;
  }>({
    top: 0,
  });

  const openDropdown = (
    options: iHeaderDropdownOption[],
    position: iHeaderDropdownPosition,
  ) => {
    setDropdownOptions(options);
    setPosition(position);
    setShowDropdown(true);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
    setPosition({ top: 0 });
    setDropdownOptions([]);
  };

  return (
    <HeaderDropdownContext.Provider
      value={{
        showDropdown,
        dropdownOptions,
        position,
        openDropdown,
        closeDropdown,
      }}
    >
      {props.children}
    </HeaderDropdownContext.Provider>
  );
};

export const useHeaderDropdown = () => useContext(HeaderDropdownContext);
