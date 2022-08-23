import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventSelect from '../screens/Home/EventSelect';
import CategorySelect from '../screens/Home/CategorySelect';
import { HomeParamList } from './types';

const { Navigator, Screen } = createStackNavigator<HomeParamList>();

const HomeNavigator = () => (
  <Navigator
    initialRouteName="EventSelect"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
    }}
  >
    <Screen
      name="EventSelect"
      component={EventSelect}
      options={{
        headerTitle: 'Home',
      }}
    />
    <Screen
      name="CategorySelect"
      component={CategorySelect}
      options={{
        headerTitle: 'Home',
      }}
    />
  </Navigator>
);

export default HomeNavigator;
