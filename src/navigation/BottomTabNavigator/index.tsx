import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar, { ITabBarProps } from './TabBar';
import PredictionsNavigator from '../PredictionsNavigator';
import AdminNavigator from '../AdminNavigator';
import { useAuth } from '../../context/AuthContext';
import { BottomTabParamList } from '../types';
import HelpNavigator from '../HelpNavigator';
import { FollowingBarProvider } from '../../context/FollowingBarContext';
import { DisplayProvider } from '../../context/DisplayStateContext';
import { UserRole } from '../../types/api';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TB = (p: ITabBarProps) => <TabBar {...p} />;

const BottomTabNavigator = () => {
  const { userRole } = useAuth();

  return (
    <Tab.Navigator
      tabBar={TB}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Predictions"
        component={PredictionsNavigator}
        initialParams={{ initialScreen: 'EventSelect' }}
      />
      <Tab.Screen
        name="Profile"
        component={PredictionsNavigator}
        initialParams={{ initialScreen: 'Profile' }}
      />
      <Tab.Screen
        name="Friend"
        component={PredictionsNavigator}
        initialParams={{ initialScreen: 'SearchFriends' }}
      />
      <Tab.Screen name="Help" component={HelpNavigator} />
      {userRole && userRole === UserRole.ADMIN ? (
        <Tab.Screen name="Admin" component={AdminNavigator} />
      ) : null}
    </Tab.Navigator>
  );
};

const WithContext = () => (
  <FollowingBarProvider>
    <DisplayProvider>
      <BottomTabNavigator />
    </DisplayProvider>
  </FollowingBarProvider>
);

export default WithContext;
