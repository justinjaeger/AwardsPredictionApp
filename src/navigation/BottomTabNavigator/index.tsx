import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileNavigator from '../ProfileNavigator';
import TabBar, { ITabBarProps } from './TabBar';
import PredictionsNavigator from '../PredictionsNavigator';
import AdminNavigator from '../AdminNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(p: ITabBarProps) => <TabBar {...p} />}>
      <Tab.Screen name="Predictions" component={PredictionsNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Admin" component={AdminNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
