import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/Buttons/BackButton';
import ContenderDetailsScreen from '../screens/Predictions/ContenderDetailsScreen';
import { BottomTabParamList, PredictionsParamList } from './types';
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
import ChangeUsername from '../screens/Profile/ChangeUsername';
import SearchFriends from '../screens/SearchFriends';
import { RouteProp, useRoute } from '@react-navigation/native';
import Followers from '../screens/Profile/Followers';

const { Navigator, Screen } = createStackNavigator<PredictionsParamList>();

const PredictionsNavigator = () => {
  const {
    params: { initialScreen },
  } = useRoute<RouteProp<BottomTabParamList, 'Profile'>>();

  return (
    <Navigator initialRouteName={initialScreen || 'EventSelect'} headerMode="screen">
      <Screen
        name="EventSelect"
        component={EventSelect}
        options={{
          headerTitle: getHeaderTitle('Select Event'),
          cardStyle: theme.cardStyle,
          ...headerSettings,
        }}
      />
      {/* Prediction Screens */}
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
        name="AddPredictions"
        component={AddPredictions}
        options={{
          headerTitle: getHeaderTitle('Add / Remove Predictions'),
          headerLeft: BackButton,
          ...headerSettings,
        }}
      />
      {/* Profile Screens */}
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: getHeaderTitle('Profile'),
          headerLeft: BackButton,
          ...headerSettings,
        }}
      />
      <Screen
        name="ChangeUsername"
        component={ChangeUsername}
        options={{
          headerTitle: getHeaderTitle('Enter Username'),
          headerLeft: BackButton,
          ...headerSettings,
        }}
      />
      <Screen
        name="Followers"
        component={Followers}
        options={{
          headerTitle: getHeaderTitle('Followers'),
          headerLeft: BackButton,
          ...headerSettings,
        }}
      />
      {/* Friend Screens */}
      <Screen
        name="SearchFriends"
        component={SearchFriends}
        options={{
          headerLeft: BackButton,
          headerTitle: getHeaderTitle('Follow Users'),
          ...headerSettings,
        }}
      />
      {/* Unused Screen */}
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
    </Navigator>
  );
};

export default PredictionsNavigator;
