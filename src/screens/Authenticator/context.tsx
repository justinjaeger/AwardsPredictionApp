import React, { createContext, useContext, useState } from 'react';

type IAuthContext = {
  email: string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  password: string | undefined;
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>;
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const AuthContext = createContext<IAuthContext>({
  email: undefined,
  setEmail: () => {},
  password: undefined,
  setPassword: () => {},
  username: undefined,
  setUsername: () => {},
});

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        username,
        setUsername,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthenticator = () => useContext(AuthContext);
