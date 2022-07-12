import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash'; // what is this?
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';

const Navigation = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const init = async () => {};

    // Bootsplash: https://github.com/zoontek/react-native-bootsplash
    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
