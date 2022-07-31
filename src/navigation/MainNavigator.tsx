import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthenticatorNavigator from './AuthenticatorNavigator';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => (
  <Navigator
    initialRouteName="Home"
    headerMode={'none'}
    screenOptions={{
      animationTypeForReplace: 'push',
    }}
  >
    <Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    <Screen name="Authenticator" component={AuthenticatorNavigator} />
  </Navigator>
);

export default MainNavigator;
