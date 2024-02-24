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
        name="Social"
        component={PredictionsNavigator}
        initialParams={{ initialScreen: 'EventSelect' }}
      />
      <Tab.Screen
        name="Predictions"
        component={PredictionsNavigator}
        initialParams={{ initialScreen: 'Event', disableBack: true }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={PredictionsNavigator}
        initialParams={{ initialScreen: 'Leaderboard', disableBack: true }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={PredictionsNavigator}
        initialParams={{ initialScreen: 'Profile' }}
      />
      <Tab.Screen name="Help" component={HelpNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
