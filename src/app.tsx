import 'react-native-gesture-handler';
import React from 'react';
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Navigation from './navigation';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './context/UserContext';
import { CategoryProvider } from './context/CategoryContext';
// import useInitialURL from './hooks/useInitialUrl';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

const App = () => {
  //   useInitialURL(); // For getting deep links when app is not open

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...theme }}>
        <UserProvider>
          <CategoryProvider>
            <SafeAreaProvider>
              <Navigation />
            </SafeAreaProvider>
          </CategoryProvider>
        </UserProvider>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};

export default App;
