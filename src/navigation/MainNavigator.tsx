import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import Authenticator from '../screens/Authenticator';

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
    <Screen name="Authenticator" component={Authenticator} />
  </Navigator>
);

export default MainNavigator;
