import 'react-native-gesture-handler';
import React from 'react';
// import RNBootSplash from 'react-native-bootsplash'; // splash screen (https://github.com/zoontek/react-native-bootsplash)
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { UserProvider } from '../context/UserContext';
import { CategoryProvider } from '../context/CategoryContext';
import { AsyncStorePrefetchProvider } from '../context/AsyncStorePrefetch';
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
      <AsyncStorePrefetchProvider>
        <UserProvider>
          <OpenEventsProvider>
            <CategoryProvider>
              <MainNavigator />
            </CategoryProvider>
          </OpenEventsProvider>
        </UserProvider>
      </AsyncStorePrefetchProvider>
    </NavigationContainer>
  );
};

export default Navigation;
