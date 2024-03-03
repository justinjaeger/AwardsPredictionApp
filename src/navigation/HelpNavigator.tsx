import React from 'react';
import SendMessage from '../screens/Help/SendMessage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Settings from '../screens/Help/Settings';
import COLORS from '../constants/colors';
import About from '../screens/Help/About';
import useDevice from '../util/device';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainParamList } from './types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const HelpTabs = () => {
  const { params } = useRoute<RouteProp<MainParamList, 'HelpTab'>>();
  const disableBack = params?.disableBack;

  const { top } = useSafeAreaInsets();

  const { isPad } = useDevice();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderBottomColor: 'rgba(255,255,255,0.1)',
          borderBottomWidth: 1,
          padding: isPad ? 10 : 0,
        },
        tabBarLabelStyle: {
          color: COLORS.white,
          fontSize: isPad ? 20 : 14,
          textTransform: 'none',
        },
        tabBarIndicatorStyle: { backgroundColor: COLORS.white },
        tabBarActiveTintColor: COLORS.primary,
        swipeEnabled: false,
      }}
      style={{
        paddingTop: disableBack ? top : undefined,
        backgroundColor: COLORS.primary,
      }}
    >
      <Tab.Screen name="Contact" component={SendMessage} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
};

export default HelpTabs;
