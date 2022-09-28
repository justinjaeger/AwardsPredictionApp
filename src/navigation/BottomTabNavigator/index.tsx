import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PersonalPredictionsNavigator from '../PersonalPredictionsNavigator';
import ProfileNavigator from '../ProfileNavigator';
import { useAuth } from '../../store';
import TabBar, { ITabBarProps } from './TabBar';
import GlobalPredictionsNavigator from '../GlobalPredictionsNavigator';
import DevNavigator from '../DevNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Tab.Navigator tabBar={(p: ITabBarProps) => <TabBar {...p} />}>
      <Tab.Screen name="GlobalPredictions" component={GlobalPredictionsNavigator} />
      {isLoggedIn ? (
        <Tab.Screen name="PersonalPredictions" component={PersonalPredictionsNavigator} />
      ) : null}
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Dev" component={DevNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
