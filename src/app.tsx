import 'react-native-gesture-handler';
import React from 'react';
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Navigation from './navigation';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CategoryProvider } from './context/CategoryContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_AUTH_CLIENT_ID } from './config';

const queryClient = new QueryClient();

// https://github.com/react-native-google-signin/google-signin/blob/master/docs/ios-guide.md
GoogleSignin.configure({
  //   scopes: ['https://www.googleapis.com/auth/userinfo.email'], // default is email and profile so shouldn't need this
  iosClientId: GOOGLE_AUTH_CLIENT_ID, // only for iOS
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...theme }}>
        <CategoryProvider>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </CategoryProvider>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};

export default App;
