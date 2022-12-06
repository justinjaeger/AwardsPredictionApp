import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dev from '../screens/Dev';
import ManageStudios from '../screens/Dev/ManageStudios';
import BackButton from '../components/Buttons/BackButton';
import { headerSettings } from '../constants';

const { Navigator, Screen } = createStackNavigator();

const DevNavigator = () => (
  <Navigator
    initialRouteName="Proflie"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
    }}
  >
    <Screen
      name="Dev"
      component={Dev}
      options={{ headerTitle: 'Dev Console', ...headerSettings }}
    />
    <Screen
      name="ManageStudios"
      component={ManageStudios}
      options={{
        headerTitle: 'Manage Studios',
        headerLeft: BackButton,
        ...headerSettings,
      }}
    />
  </Navigator>
);

export default DevNavigator;
