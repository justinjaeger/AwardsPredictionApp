import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getHeaderTitle } from '../constants';
import SendMessage from '../screens/Help/SendMessage';
import { useHeaderSettings } from '../hooks/useHeaderSettings';

const { Navigator, Screen } = createStackNavigator();

const HelpNavigator = () => {
  const { medium } = useHeaderSettings();

  return (
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
        options={{ headerTitle: getHeaderTitle('Contact'), ...medium }}
      />
    </Navigator>
  );
};

export default HelpNavigator;
