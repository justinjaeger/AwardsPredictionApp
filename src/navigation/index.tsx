import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { AuthProvider } from '../context/AuthContext';
import { EventProvider } from '../context/EventContext';
import { TmdbDataStoreProvider } from '../context/TmdbDataStore';

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
          <EventProvider>
            <MainNavigator />
          </EventProvider>
        </AuthProvider>
      </TmdbDataStoreProvider>
    </NavigationContainer>
  );
};

export default Navigation;
