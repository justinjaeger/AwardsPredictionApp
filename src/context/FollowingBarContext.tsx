import React, { createContext, useContext, useState } from 'react';

/**
 * Lets us get the userId and userEmail synchronously
 */

type iFollowingBarContext = {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  hideAbsolutely: boolean;
  setHideAbsolutely: React.Dispatch<React.SetStateAction<boolean>>;
};

const FollowingBarContext = createContext<iFollowingBarContext>({
  isHidden: false, // idk why but it's actually the opposite of hidden
  setIsHidden: () => {},
  hideAbsolutely: true,
  setHideAbsolutely: () => {},
});

export const FollowingBarProvider = (props: { children: React.ReactNode }) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [hideAbsolutely, setHideAbsolutely] = useState<boolean>(false);

  return (
    <FollowingBarContext.Provider
      value={{
        isHidden,
        setIsHidden,
        hideAbsolutely,
        setHideAbsolutely,
      }}
    >
      {props.children}
    </FollowingBarContext.Provider>
  );
};

export const useFollowingBar = () => useContext(FollowingBarContext);
