import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategorySelect from '../screens/GlobalPredictions/CategorySelect';
import BackButton from '../components/Buttons/BackButton';
import EventSelect from '../screens/GlobalPredictions/EventSelect';
import ViewPredictions from '../screens/PersonalPredictions/ViewPredictions';
import AddContenders from '../screens/PersonalPredictions/AddContenders';
import CreateContender from '../screens/CreateContender';

const { Navigator, Screen } = createStackNavigator();

/**
 * TODO: the current Login component is actually the protected auth route.
 * If the user is not logged in, they'll see the auth screen.
 * If they are logged in, they shouldn't.
 */

const PersonalPredictionsNavigator = () => (
  <Navigator
    initialRouteName="EventSelect"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
    }}
  >
    <Screen
      name="EventSelect"
      component={EventSelect}
      options={{
        headerTitle: 'Events (Personal)',
      }}
    />
    <Screen
      name="CategorySelect"
      component={CategorySelect}
      options={{
        headerTitle: 'Categories',
        headerLeft: BackButton,
      }}
    />
    <Screen
      name="Contenders"
      component={ViewPredictions}
      options={{
        headerTitle: 'Contenders',
        headerLeft: BackButton,
      }}
    />
    <Screen
      name="AddContenders"
      component={AddContenders}
      options={{
        headerTitle: 'Add Contenders',
        headerLeft: BackButton,
      }}
    />
    <Screen
      name="CreateContender"
      component={CreateContender}
      options={{
        headerTitle: 'Add Contender',
        headerLeft: BackButton,
      }}
    />
  </Navigator>
);

export default PersonalPredictionsNavigator;
