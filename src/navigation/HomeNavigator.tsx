import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventSelect from '../screens/Home/EventSelect';
import CategorySelect from '../screens/Home/CategorySelect';
import { HomeParamList } from './types';
import Contenders from '../screens/Home/Contenders';
import BackButton from '../components/Buttons/BackButton';

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
        headerTitle: 'Events',
      }}
    />
    <Screen
      name="CategorySelect"
      component={CategorySelect}
      options={{
        headerTitle: 'Categories',
        headerLeft: BackButton,
      }}
    />
    <Screen
      name="Contenders"
      component={Contenders}
      options={{
        headerTitle: 'Contenders',
        headerLeft: BackButton,
      }}
    />
  </Navigator>
);

export default HomeNavigator;
