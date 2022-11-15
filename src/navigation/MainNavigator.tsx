import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthenticatorNavigator from './AuthenticatorNavigator';
import { MainParamList } from './types';
import WebView from '../screens/WebView';
// import { StatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { Navigator, Screen } = createStackNavigator<MainParamList>();

const MainNavigator = () => (
  <>
    <StatusBar style={'light'} />
    <Navigator
      initialRouteName="BottomTabNavigator"
      headerMode={'none'}
      screenOptions={{
        animationTypeForReplace: 'push',
      }}
    >
      <Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Screen name="Authenticator" component={AuthenticatorNavigator} />
      <Screen name="WebView" component={WebView} />
    </Navigator>
  </>
);

export default MainNavigator;
