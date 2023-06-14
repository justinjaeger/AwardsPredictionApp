import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Authenticator from '../screens/Authenticator';

const { Navigator, Screen } = createStackNavigator();

const AuthenticatorNavigator = () => {
  return (
    <Navigator
      initialRouteName="Authenticator"
      screenOptions={{
        animationTypeForReplace: 'push',
      }}
    >
      <Screen
        name="Authenticator"
        component={Authenticator}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
};

export default AuthenticatorNavigator;
