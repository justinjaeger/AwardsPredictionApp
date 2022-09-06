import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dev from '../screens/Dev';

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
  </Navigator>
);

export default DevNavigator;
