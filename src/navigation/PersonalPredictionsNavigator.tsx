import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/Buttons/BackButton';
import CreateContender from '../screens/Predictions/Personal/CreateContender';
import EditPredictions from '../screens/Predictions/Personal/EditPredictions';
import { PersonalParamList } from './types';
import AddPredictions from '../screens/Predictions/Personal/AddPredictions.tsx';
import ContenderDetailsScreen from '../screens/Predictions/ContenderDetailsScreen';

const { Navigator, Screen } = createStackNavigator<PersonalParamList>();

/**
 * TODO: the current Login component is actually the protected auth route.
 * If the user is not logged in, they'll see the auth screen.
 * If they are logged in, they shouldn't.
 */

const PersonalPredictionsNavigator = () => (
  <Navigator
    initialRouteName="EditPredictions"
    headerMode={'screen'}
    screenOptions={{
      animationTypeForReplace: 'push',
    }}
  >
    <Screen
      name="EditPredictions"
      component={EditPredictions}
      options={{
        headerTitle: 'Edit Predictions',
        headerLeft: BackButton,
      }}
    />
    <Screen
      name="AddPredictions"
      component={AddPredictions}
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
    <Screen
      name="ContenderDetails"
      component={ContenderDetailsScreen}
      options={{
        headerTitle: 'Contender Details',
        headerLeft: BackButton,
      }}
    />
  </Navigator>
);

export default PersonalPredictionsNavigator;
