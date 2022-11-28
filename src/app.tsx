import 'react-native-gesture-handler';
import React from 'react';
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Navigation from './navigation';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './context/UserContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...theme }}>
          <UserProvider>
            <Navigation />
          </UserProvider>
        </ApplicationProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
