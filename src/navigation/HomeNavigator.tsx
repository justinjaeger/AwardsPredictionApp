import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator
    initialRouteName="Home"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
    }}
  >
    <Screen
      name="Home"
      component={Home}
      options={{
        headerTitle: 'Home',
      }}
    />
  </Navigator>
);

export default HomeNavigator;
