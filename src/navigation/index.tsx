import 'react-native-gesture-handler';
import React from 'react';
import RNBootSplash from 'react-native-bootsplash'; // splash screen (https://github.com/zoontek/react-native-bootsplash)
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';

// TODO:
// I want the authentication to be something you can check anywhere in the app (basically a context)
// means I'd have to store it in redux whether they're signed in or not
// cause I want them to be able to navigate the app like they're logged in but it just doesn't show you some features
// basically they'd need to click a button that's liek "yes sign me in" then we navigate them to signin

const Navigation = () => {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
