import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/Buttons/BackButton';
import CreateContender from '../screens/Predictions/Personal/CreateContender';
import EditPredictions from '../screens/Predictions/Personal/EditPredictions';
import { PersonalParamList } from './types';
import AddPredictions from '../screens/Predictions/Personal/AddPredictions.tsx';
import ContenderDetailsScreen from '../screens/Predictions/ContenderDetailsScreen';
import { headerSettings } from '../constants';

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
        ...headerSettings,
      }}
    />
    <Screen
      name="AddPredictions"
      component={AddPredictions}
      options={{
        headerTitle: 'Add Predictions',
        headerLeft: BackButton,
        ...headerSettings,
      }}
    />
    <Screen
      name="CreateContender"
      component={CreateContender}
      options={{
        headerTitle: 'Add Contender',
        headerLeft: BackButton,
        ...headerSettings,
      }}
    />
    <Screen
      name="ContenderDetails"
      component={ContenderDetailsScreen}
      options={{
        headerTitle: 'Contender Details',
        headerLeft: BackButton,
        ...headerSettings,
      }}
    />
  </Navigator>
);

export default PersonalPredictionsNavigator;
