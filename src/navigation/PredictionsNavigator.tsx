import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/Buttons/BackButton';
import ContenderDetailsScreen from '../screens/Predictions/ContenderDetailsScreen';
import { BottomTabParamList, PredictionsParamList } from './types';
import Category from '../screens/Predictions/Category';
import EventSelect from '../screens/Predictions/EventSelect';
import theme from '../constants/theme';
import { getHeaderTitle } from '../constants';
import AddPredictions from '../screens/Predictions/AddPredictions.tsx';
import HistoryHeaderButton from '../components/Buttons/HistoryHeaderButton';
import EventPersonalCommunity from '../screens/Predictions/Event/EventPersonalCommunity';
import EventFromProfile from '../screens/Predictions/Event/EventFromProfile';
import CategoryFromProfile from '../screens/Predictions/Category/CategoryFromProfile';
import Profile from '../screens/Profile';
import UpdateProfileInfo from '../screens/Profile/UpdateProfileInfo';
import SearchFriends from '../screens/SearchFriends';
import { RouteProp, useRoute } from '@react-navigation/native';
import Followers from '../screens/Profile/Followers';
import { ProfilePredictionProvider } from '../context/ProfilePredictionContext';
import { useHeaderSettings } from '../hooks/useHeaderSettings';

const { Navigator, Screen } = createStackNavigator<PredictionsParamList>();

const PredictionsNavigator = () => {
  const {
    params: { initialScreen },
  } = useRoute<RouteProp<BottomTabParamList, 'Profile'>>();
  const { medium, large } = useHeaderSettings();

  return (
    <Navigator initialRouteName={initialScreen || 'EventSelect'} headerMode="screen">
      <Screen
        name="EventSelect"
        component={EventSelect}
        options={{
          headerShown: false,
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
          ...large,
        }}
      />
      <Screen
        name="EventFromProfile"
        component={EventFromProfile}
        options={{
          headerTitle: getHeaderTitle('Event Predictions'),
          headerLeft: BackButton,
          headerRight: HistoryHeaderButton,
          ...large,
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
          ...large,
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
          ...large,
        }}
      />
      <Screen
        name="AddPredictions"
        component={AddPredictions}
        options={{
          headerTitle: getHeaderTitle('Add / Remove Predictions'),
          headerLeft: BackButton,
          ...medium,
        }}
      />
      {/* Profile Screens */}
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: '',
          ...medium,
        }}
      />
      <Screen
        name="UpdateProfileInfo"
        component={UpdateProfileInfo}
        options={{
          headerTitle: getHeaderTitle('Enter Username'),
          headerLeft: BackButton,
          ...medium,
        }}
      />
      <Screen
        name="Followers"
        component={Followers}
        options={{
          headerLeft: BackButton,
          headerTitle: getHeaderTitle('Followers'),
          ...medium,
        }}
      />
      {/* Friend Screens */}
      <Screen
        name="SearchFriends"
        component={SearchFriends}
        options={{
          headerShown: false,
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
          ...medium,
        }}
      />
    </Navigator>
  );
};

const WithProvider = () => (
  <ProfilePredictionProvider>
    <PredictionsNavigator />
  </ProfilePredictionProvider>
);

export default WithProvider;
