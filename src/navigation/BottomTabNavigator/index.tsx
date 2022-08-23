import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from '../HomeNavigator';
import MyPredictionsNavigator from '../MyPredictionsNavigator';
import ProfileNavigator from '../ProfileNavigator';
import Dev from '../../screens/Dev';
import { useAuth } from '../../store';
import TabBar, { ITabBarProps } from './TabBar';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Tab.Navigator tabBar={(p: ITabBarProps) => <TabBar {...p} />}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      {isLoggedIn ? (
        <Tab.Screen name="MyPredictions" component={MyPredictionsNavigator} />
      ) : null}
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Dev" component={Dev} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
