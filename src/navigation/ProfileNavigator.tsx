import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import ChangeUsername from '../screens/Profile/ChangeUsername';
import BackButton from '../components/Buttons/BackButton';
import { getHeaderTitle, headerSettings } from '../constants';
import HistoryHeaderButton from '../components/Buttons/HistoryHeaderButton';
import theme from '../constants/theme';
import EventFromProfile from '../screens/Predictions/Event/EventFromProfile';
import CategoryFromProfile from '../screens/Predictions/Category/CategoryFromProfile';
import { BottomTabParamList, ProfileParamList } from './types';
import Followers from '../screens/Profile/Followers';
import { RouteProp, useRoute } from '@react-navigation/native';

const { Navigator, Screen } = createStackNavigator<ProfileParamList>();

const ProfileNavigator = () => {
  const route = useRoute<RouteProp<BottomTabParamList, 'Profile'>>();
  return (
    <Navigator
      initialRouteName="Profile"
      headerMode={'screen'}
      screenOptions={{
        animationTypeForReplace: 'push',
      }}
    >
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: getHeaderTitle('Profile'),
          ...headerSettings,
        }}
        initialParams={route.params}
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
        name="Event"
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
        name="Followers"
        component={Followers}
        options={{
          headerTitle: getHeaderTitle('Followers'),
          headerLeft: BackButton,
          ...headerSettings,
        }}
      />
    </Navigator>
  );
};

export default ProfileNavigator;
