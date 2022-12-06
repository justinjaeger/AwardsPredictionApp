import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import ChangeUsername from '../screens/Profile/ChangeUsername';
import BackButton from '../components/Buttons/BackButton';
import { headerSettings } from '../constants';

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
      options={{ headerTitle: 'My Profile', headerLeft: BackButton, ...headerSettings }}
    />
    <Screen
      name="ChangeUsername"
      component={ChangeUsername}
      options={{
        headerTitle: 'Create Username',
        headerLeft: BackButton,
        ...headerSettings,
      }}
    />
  </Navigator>
);

export default ProfileNavigator;
