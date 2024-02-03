import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getHeaderTitle } from '../constants';
import Admin from '../screens/Admin';
import { useHeaderSettings } from '../hooks/useHeaderSettings';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../models';

const { Navigator, Screen } = createStackNavigator();

const AdminNavigator = () => {
  const { userRole } = useAuth();
  const { medium } = useHeaderSettings();

  // for safety
  if (!(userRole && userRole === UserRole.ADMIN)) {
    return null;
  }

  return (
    <Navigator
      initialRouteName="Proflie"
      screenOptions={{
        headerMode: 'screen',
        animationTypeForReplace: 'push',
      }}
    >
      <Screen
        name="Admin"
        component={Admin}
        options={{ headerTitle: getHeaderTitle('Admin Console'), ...medium }}
      />
    </Navigator>
  );
};

export default AdminNavigator;
