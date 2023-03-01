import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getHeaderTitle, headerSettings } from '../constants';
import SendMessage from '../screens/Help/SendMessage';

const { Navigator, Screen } = createStackNavigator();

const HelpNavigator = () => (
  <Navigator
    initialRouteName="SendMessage"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
    }}
  >
    <Screen
      name="SendMessage"
      component={SendMessage}
      options={{ headerTitle: getHeaderTitle('Contact'), ...headerSettings }}
    />
  </Navigator>
);

export default HelpNavigator;
