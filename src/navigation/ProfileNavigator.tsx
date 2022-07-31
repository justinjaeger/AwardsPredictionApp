import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';

const { Navigator, Screen } = createStackNavigator();

const ProfileNavigator = () => (
  <Navigator
    initialRouteName="Home"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
    }}
  >
    <Screen name="Proflie" component={Profile} options={{ headerTitle: 'My Profile' }} />
  </Navigator>
);

export default ProfileNavigator;
