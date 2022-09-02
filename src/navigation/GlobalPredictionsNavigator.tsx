import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventSelect from '../screens/GlobalPredictions/EventSelect';
import CategorySelect from '../screens/GlobalPredictions/CategorySelect';
import { HomeParamList } from './types';
import BackButton from '../components/Buttons/BackButton';
import CreateContender from '../screens/CreateContender';
import Contenders from '../screens/Category/Contenders';
import ContenderDetailsScreen from '../screens/Category/ContenderDetailsScreen';

const { Navigator, Screen } = createStackNavigator<HomeParamList>();

const GlobalPredictionsNavigator = () => (
  <Navigator initialRouteName="EventSelect" headerMode="screen">
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
    <Screen
      name="CreateContender"
      component={CreateContender}
      options={{
        headerTitle: 'Add Contender',
        headerLeft: BackButton,
      }}
    />
    <Screen
      name="ContenderDetails"
      component={ContenderDetailsScreen}
      options={{
        headerTitle: '',
        headerLeft: BackButton,
      }}
    />
  </Navigator>
);

export default GlobalPredictionsNavigator;
