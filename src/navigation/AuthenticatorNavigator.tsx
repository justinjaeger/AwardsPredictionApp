import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Authenticator from '../screens/Authenticator';
import BackButton from '../components/Buttons/BackButton';
import { useHeaderSettings } from '../hooks/useHeaderSettings';

const { Navigator, Screen } = createStackNavigator();

const AuthenticatorNavigator = () => {
  const { medium } = useHeaderSettings();
  return (
    <Navigator
      initialRouteName="Authenticator"
      headerMode={'screen'}
      screenOptions={{
        animationTypeForReplace: 'push',
      }}
    >
      <Screen
        name="Authenticator"
        component={Authenticator}
        options={{
          headerLeft: BackButton,
          ...medium,
        }}
      />
    </Navigator>
  );
};

export default AuthenticatorNavigator;
