import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Authenticator from '../screens/Authenticator';
import BackButton from '../components/Buttons/BackButton';

const { Navigator, Screen } = createStackNavigator();

const AuthenticatorNavigator = () => (
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
      }}
    />
  </Navigator>
);

export default AuthenticatorNavigator;
