import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthenticatorNavigator from './AuthenticatorNavigator';
import WebView from '../screens/WebView';
import { StatusBar } from 'react-native';
import AuthLoadingModal from '../components/AuthLoadingModal';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => (
  <>
    <AuthLoadingModal />
    <StatusBar barStyle={'light-content'} />
    <Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}
    >
      <Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Screen name="AuthenticatorNavigator" component={AuthenticatorNavigator} />
      <Screen name="WebView" component={WebView} />
    </Navigator>
  </>
);

export default MainNavigator;
