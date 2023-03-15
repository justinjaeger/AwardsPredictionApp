import React, { createContext, useContext, useState } from 'react';

/**
 * Lets us get the userId and userEmail synchronously
 */

type iFollowingBarContext = {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const FollowingBarContext = createContext<iFollowingBarContext>({
  isHidden: false,
  setIsHidden: () => {},
});

export const FollowingBarProvider = (props: { children: React.ReactNode }) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  return (
    <FollowingBarContext.Provider
      value={{
        isHidden,
        setIsHidden,
      }}
    >
      {props.children}
    </FollowingBarContext.Provider>
  );
};

export const useFollowingBar = () => useContext(FollowingBarContext);
