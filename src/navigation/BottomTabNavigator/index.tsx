import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileNavigator from '../ProfileNavigator';
import TabBar, { ITabBarProps } from './TabBar';
import DevNavigator from '../DevNavigator';
import PredictionsNavigator from '../PredictionsNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(p: ITabBarProps) => <TabBar {...p} />}>
      <Tab.Screen name="Predictions" component={PredictionsNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Dev" component={DevNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
