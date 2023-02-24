import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileNavigator from '../ProfileNavigator';
import TabBar, { ITabBarProps } from './TabBar';
import PredictionsNavigator from '../PredictionsNavigator';
import AdminNavigator from '../AdminNavigator';
import { useAuth } from '../../context/UserContext';
import { UserRole } from '../../API';
import FriendNavigator from '../FriendNavigator';
import { BottomTabParamList } from '../types';
import HelpNavigator from '../HelpNavigator';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const { userRole } = useAuth();

  return (
    <Tab.Navigator tabBar={(p: ITabBarProps) => <TabBar {...p} />}>
      <Tab.Screen name="Predictions" component={PredictionsNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Friend" component={FriendNavigator} />
      <Tab.Screen name="Help" component={HelpNavigator} />
      {userRole && userRole === UserRole.ADMIN ? (
        <Tab.Screen name="Admin" component={AdminNavigator} />
      ) : null}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
