import React, { createContext, useContext, useState } from 'react';

type IAuthContext = {
  email: string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const AuthContext = createContext<IAuthContext>({
  email: undefined,
  setEmail: () => {},
});

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthenticator = () => useContext(AuthContext);