import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar, { ITabBarProps } from './TabBar';
import PredictionsNavigator from '../PredictionsNavigator';
import { BottomTabParamList } from '../types';
import HelpNavigator from '../HelpNavigator';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TB = (p: ITabBarProps) => <TabBar {...p} />;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={TB}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Predictions"
    >
      <Tab.Screen
        name="Predictions"
        component={PredictionsNavigator}
        initialParams={{ initialScreen: 'Event' }}
      />
      <Tab.Screen
        name="Social"
        component={PredictionsNavigator}
        initialParams={{ initialScreen: 'Social' }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={PredictionsNavigator}
        initialParams={{ initialScreen: 'Leaderboard' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={PredictionsNavigator}
        initialParams={{ initialScreen: 'Profile' }}
      />
      <Tab.Screen
        name="HelpTab"
        component={HelpNavigator}
        initialParams={{ disableBack: true }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
