import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dev from '../screens/Dev';
import ManageStudios from '../screens/Dev/ManageStudios';
import BackButton from '../components/Buttons/BackButton';

const { Navigator, Screen } = createStackNavigator();

const DevNavigator = () => (
  <Navigator
    initialRouteName="Proflie"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
    }}
  >
    <Screen name="Dev" component={Dev} options={{ headerTitle: 'Dev Console' }} />
    <Screen
      name="ManageStudios"
      component={ManageStudios}
      options={{ headerTitle: 'Manage Studios', headerLeft: BackButton }}
    />
  </Navigator>
);

export default DevNavigator;
