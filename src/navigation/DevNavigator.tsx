import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dev from '../screens/Dev';
import ManageStudios from '../screens/Dev/ManageStudios';
import BackButton from '../components/Buttons/BackButton';
import { getHeaderTitle, headerSettings } from '../constants';
import ManageEvents from '../screens/Dev/ManageEvents.tsx';

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
      options={{ headerTitle: getHeaderTitle('Dev Console'), ...headerSettings }}
    />
    <Screen
      name="ManageStudios"
      component={ManageStudios}
      options={{
        headerTitle: getHeaderTitle('Manage Studios'),
        headerLeft: BackButton,
        ...headerSettings,
      }}
    />
    <Screen
      name="ManageEvents"
      component={ManageEvents}
      options={{
        headerTitle: getHeaderTitle('Manage Events'),
        headerLeft: BackButton,
        ...headerSettings,
      }}
    />
  </Navigator>
);

export default DevNavigator;
