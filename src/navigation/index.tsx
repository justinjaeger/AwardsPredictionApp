import 'react-native-gesture-handler';
import React from 'react';
import RNBootSplash from 'react-native-bootsplash'; // splash screen (https://github.com/zoontek/react-native-bootsplash)
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';

const Navigation = () => {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
