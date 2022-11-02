import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import ChangeUsername from '../screens/Profile/ChangeUsername';
import BackButton from '../components/Buttons/BackButton';

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
      options={{ headerTitle: 'My Profile', headerLeft: BackButton }}
    />
    <Screen
      name="ChangeUsername"
      component={ChangeUsername}
      options={{ headerTitle: 'Create Username', headerLeft: BackButton }}
    />
  </Navigator>
);

export default ProfileNavigator;
