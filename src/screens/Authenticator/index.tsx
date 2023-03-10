import React from 'react';
import { View } from 'react-native';
import COLORS from '../../constants/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GoogleOauthPage from './GoogleOauth';
import AuthRoot from './Root';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/Buttons/BackButton';

const Tab = createMaterialTopTabNavigator();

const AuthTabs = () => {
  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, width: '100%', height: '100%', backgroundColor: COLORS.primary }}
    >
      <View style={{ width: 50, marginLeft: 10 }}>
        <BackButton />
      </View>
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
    </SafeAreaView>
  );
};

export default AuthTabs;
