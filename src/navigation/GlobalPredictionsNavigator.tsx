import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategorySelect from '../screens/GlobalPredictions/CategorySelect';
import { GlobalParamList } from './types';
import BackButton from '../components/Buttons/BackButton';
import Contenders from '../screens/Category/Contenders';
import ContenderDetailsScreen from '../screens/Category/ContenderDetailsScreen';
import EventSelect from '../screens/GlobalPredictions/EventSelect';

const { Navigator, Screen } = createStackNavigator<GlobalParamList>();

const GlobalPredictionsNavigator = () => (
  <Navigator initialRouteName="EventSelect" headerMode="screen">
    <Screen
      name="EventSelect"
      component={EventSelect}
      options={{
        headerTitle: 'Events (Global)',
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
