import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/Buttons/BackButton';
import ContenderDetailsScreen from '../screens/Predictions/ContenderDetailsScreen';
import { PredictionsParamList } from './types';
import Category from '../screens/Predictions/Category';
import EventSelect from '../screens/Predictions/EventSelect';
import theme from '../constants/theme';
import { getHeaderTitle, headerSettings } from '../constants';
import AddPredictions from '../screens/Predictions/AddPredictions.tsx';
import HistoryHeaderButton from '../components/Buttons/HistoryHeaderButton';
import EventPersonalCommunity from '../screens/Predictions/Event/EventPersonalCommunity';
import EventFromProfile from '../screens/Predictions/Event/EventFromProfile';
import CategoryFromProfile from '../screens/Predictions/Category/CategoryFromProfile';
import Profile from '../screens/Profile';

const { Navigator, Screen } = createStackNavigator<PredictionsParamList>();

const PredictionsNavigator = () => {
  return (
    <Navigator initialRouteName="EventSelect" headerMode="screen">
      <Screen
        name="EventSelect"
        component={EventSelect}
        options={{
          headerTitle: getHeaderTitle('Select Event'),
          cardStyle: theme.cardStyle,
          ...headerSettings,
        }}
      />
      <Screen
        name="Event"
        component={EventPersonalCommunity}
        options={{
          headerTitle: getHeaderTitle('Event Predictions'),
          headerLeft: BackButton,
          headerRight: HistoryHeaderButton,
          ...headerSettings,
        }}
      />
      <Screen
        name="EventFromProflie"
        component={EventFromProfile}
        options={{
          headerTitle: getHeaderTitle('Event Predictions'),
          headerLeft: BackButton,
          headerRight: HistoryHeaderButton,
          ...headerSettings,
        }}
      />
      <Screen
        name="Category"
        component={Category}
        options={{
          headerTitle: getHeaderTitle('Category'),
          headerLeft: BackButton,
          headerRight: HistoryHeaderButton,
          cardStyle: theme.cardStyle,
          ...headerSettings,
        }}
      />
      <Screen
        name="CategoryFromProfile"
        component={CategoryFromProfile}
        options={{
          headerTitle: getHeaderTitle('Category'),
          headerLeft: BackButton,
          headerRight: HistoryHeaderButton,
          cardStyle: theme.cardStyle,
          ...headerSettings,
        }}
      />
      <Screen
        name="ContenderDetails"
        component={ContenderDetailsScreen}
        options={{
          headerTitle: getHeaderTitle('Contender Details'),
          headerLeft: BackButton,
          cardStyle: theme.cardStyle,
          ...headerSettings,
        }}
      />
      <Screen
        name="AddPredictions"
        component={AddPredictions}
        options={{
          headerTitle: getHeaderTitle('Add / Remove Predictions'),
          headerLeft: BackButton,
          ...headerSettings,
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: getHeaderTitle('My Profile'),
          ...headerSettings,
        }}
      />
    </Navigator>
  );
};

export default PredictionsNavigator;
