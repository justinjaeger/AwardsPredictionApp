import React from 'react';
import SendMessage from '../screens/Help/SendMessage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Settings from '../screens/Help/Settings';
import COLORS from '../constants/colors';
import About from '../screens/Help/About';
import SafeAreaViewFixed from '../components/SafeAreaViewFixed';
import useDevice from '../util/device';

const Tab = createMaterialTopTabNavigator();

const HelpTabs = () => {
  const { isPad } = useDevice();
  return (
    <SafeAreaViewFixed
      edges={['top']}
      style={{ flex: 1, backgroundColor: COLORS.primary }}
    >
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
        }}
      >
        <Tab.Screen name="Contact" component={SendMessage} />
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </SafeAreaViewFixed>
  );
};

export default HelpTabs;
