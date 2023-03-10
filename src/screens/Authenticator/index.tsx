import React from 'react';
import { View } from 'react-native';
import COLORS from '../../constants/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GoogleOauthPage from './GoogleOauth';
import AuthRoot from './Root';

const Tab = createMaterialTopTabNavigator();

const AuthTabs = () => {
  return (
    <View
      style={{ flex: 1, width: '100%', height: '100%', backgroundColor: COLORS.primary }}
    >
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: COLORS.primary,
            borderBottomColor: 'rgba(255,255,255,0.1)',
            borderBottomWidth: 1,
          },
          labelStyle: { color: COLORS.white, fontSize: 16, textTransform: 'none' },
          indicatorStyle: { backgroundColor: COLORS.white },
          activeTintColor: COLORS.primary,
        }}
      >
        <Tab.Screen name="Gmail" component={GoogleOauthPage} />
        <Tab.Screen name="Email" component={AuthRoot} />
      </Tab.Navigator>
    </View>
  );
};

export default AuthTabs;
