import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthenticatorNavigator from './AuthenticatorNavigator';
import WebView from '../screens/WebView';
import { StatusBar } from 'react-native';
import AuthLoadingModal from '../components/AuthLoadingModal';
import HelpNavigator from './HelpNavigator';
import { getHeaderTitle } from '../constants';
import { BackButtonForNavigator } from '../components/HeaderComponents/BackButton';
import { useHeaderSettings } from '../hooks/useHeaderSettings';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => {
  const { dark } = useHeaderSettings();

  return (
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
        <Screen
          name="Help"
          component={HelpNavigator}
          options={{
            headerShown: true,
            headerTitle: getHeaderTitle(''),
            headerLeft: BackButtonForNavigator,
            ...dark,
          }}
        />
      </Navigator>
    </>
  );
};

export default MainNavigator;
