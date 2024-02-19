import React from 'react';
import { View } from 'react-native';
import COLORS from '../../constants/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OauthPage from './Oauth';
import EmailPage from './Email';
import BackButton from '../../components/Buttons/BackButton';
import SafeAreaViewFixed from '../../components/SafeAreaViewFixed';

const Tab = createMaterialTopTabNavigator();

const AuthTabs = () => {
  return (
    <SafeAreaViewFixed
      edges={['top']}
      style={{ flex: 1, width: '100%', height: '100%', backgroundColor: COLORS.primary }}
    >
      <View style={{ width: 50, marginLeft: 10 }}>
        <BackButton />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: COLORS.primary,
            borderBottomColor: 'rgba(255,255,255,0.1)',
            borderBottomWidth: 1,
          },
          tabBarLabelStyle: { color: COLORS.white, fontSize: 16, textTransform: 'none' },
          tabBarIndicatorStyle: { backgroundColor: COLORS.white },
          tabBarActiveTintColor: COLORS.primary,
        }}
      >
        <Tab.Screen name="Social" component={OauthPage} />
        <Tab.Screen name="Email" component={EmailPage} />
      </Tab.Navigator>
    </SafeAreaViewFixed>
  );
};

export default AuthTabs;
