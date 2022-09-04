import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dev from '../screens/Dev';
import ApproveSongs from '../screens/Dev/ApproveSongs';
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
      name="ApproveSongs"
      component={ApproveSongs}
      options={{ headerTitle: 'Approve Songs', headerLeft: BackButton }}
    />
  </Navigator>
);

export default DevNavigator;
