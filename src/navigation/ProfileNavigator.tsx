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

const { Navigator, Screen } = createStackNavigator();

const ProfileNavigator = () => (
  <Navigator
    initialRouteName="Proflie"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
    }}
  >
    <Screen
      name="Proflie"
      component={Profile}
      options={{
        headerTitle: getHeaderTitle('My Profile'),
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
  </Navigator>
);

export default ProfileNavigator;
