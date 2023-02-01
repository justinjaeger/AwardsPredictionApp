import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/Buttons/BackButton';
import { getHeaderTitle, headerSettings } from '../constants';
import ManageEvents from '../screens/Admin/ManageEvents.tsx';
import Admin from '../screens/Admin';
import ManageStudios from '../screens/Admin/ManageStudios';
import ManageContenders from '../screens/Admin/ManageContenders';

const { Navigator, Screen } = createStackNavigator();

const AdminNavigator = () => (
  <Navigator
    initialRouteName="Proflie"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
    }}
  >
    <Screen
      name="Admin"
      component={Admin}
      options={{ headerTitle: getHeaderTitle('Admin Console'), ...headerSettings }}
    />
    <Screen
      name="ManageStudios"
      component={ManageStudios}
      options={{
        headerTitle: getHeaderTitle('Manage Studios'),
        headerLeft: BackButton,
        ...headerSettings,
      }}
    />
    <Screen
      name="ManageEvents"
      component={ManageEvents}
      options={{
        headerTitle: getHeaderTitle('Manage Events'),
        headerLeft: BackButton,
        ...headerSettings,
      }}
    />
    <Screen
      name="ManageContenders"
      component={ManageContenders}
      options={{
        headerTitle: getHeaderTitle('Manage Contenders'),
        headerLeft: BackButton,
        ...headerSettings,
      }}
    />
  </Navigator>
);

export default AdminNavigator;
