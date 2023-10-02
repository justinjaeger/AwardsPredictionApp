import 'react-native-gesture-handler';
import React from 'react';
// import RNBootSplash from 'react-native-bootsplash'; // splash screen (https://github.com/zoontek/react-native-bootsplash)
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { AuthProvider } from '../context/AuthContext';
import { EventProvider } from '../context/EventContext';
import { TmdbDataStoreProvider } from '../context/TmdbDataStore';
import { OpenEventsProvider } from '../context/OpenEventsProvider';

// onReady={() => RNBootSplash.hide()} (could add to NavigationContainer)
const Navigation = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgba(0,0,0,0.6)',
      border: 'transparent',
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <TmdbDataStoreProvider>
        <AuthProvider>
          <OpenEventsProvider>
            <EventProvider>
              <MainNavigator />
            </EventProvider>
          </OpenEventsProvider>
        </AuthProvider>
      </TmdbDataStoreProvider>
    </NavigationContainer>
  );
};

export default Navigation;
