import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/Buttons/BackButton';
import { CategoryProvider } from '../context/CategoryContext';
import ContenderDetailsScreen from '../screens/Predictions/ContenderDetailsScreen';
import { PredictionsParamList } from './types';
import Category from '../screens/Predictions/Category';
import EventSelect from '../screens/Predictions/EventSelect';
import EventPredictions from '../screens/Predictions/EventPredictions';
import ProfileNavigator from './ProfileNavigator';
import theme from '../constants/theme';
import { getHeaderTitle, headerSettings } from '../constants';
import CreateContender from '../screens/Predictions/CreateContender';
import AddPredictions from '../screens/Predictions/AddPredictions.tsx';

const { Navigator, Screen } = createStackNavigator<PredictionsParamList>();

const PredictionsNavigator = () => {
  return (
    <Navigator initialRouteName="EventSelect" headerMode="screen">
      <Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          headerTitle: 'Profile',
          headerTitleStyle: {
            color: 'white',
          },
        }}
      />
      <Screen
        name="EventSelect"
        component={EventSelect}
        options={{
          headerTitle: getHeaderTitle('Event Select'),
          cardStyle: theme.cardStyle,
          ...headerSettings,
        }}
      />
      <Screen
        name="EventPredictions"
        component={EventPredictions}
        options={{
          headerTitle: getHeaderTitle('Event Predictions'),
          headerLeft: BackButton,
          ...headerSettings,
        }}
      />
      <Screen
        name="Category"
        component={Category}
        options={{
          headerTitle: getHeaderTitle('Category'),
          headerLeft: BackButton,
          cardStyle: theme.cardStyle,
          ...headerSettings,
        }}
      />
      <Screen
        name="ContenderDetails"
        component={ContenderDetailsScreen}
        options={{
          headerTitle: getHeaderTitle('Contender Details'),
          headerLeft: BackButton,
          cardStyle: theme.cardStyle,
          ...headerSettings,
        }}
      />
      <Screen
        name="AddPredictions"
        component={AddPredictions}
        options={{
          headerTitle: getHeaderTitle('Add Predictions'),
          headerLeft: BackButton,
          ...headerSettings,
        }}
      />
      <Screen
        name="CreateContender"
        component={CreateContender}
        options={{
          headerTitle: getHeaderTitle('Add Contender'),
          headerLeft: BackButton,
          ...headerSettings,
        }}
      />
    </Navigator>
  );
};

const PredictionsNavigatorWrapper = () => {
  return (
    <CategoryProvider>
      <PredictionsNavigator />
    </CategoryProvider>
  );
};

export default PredictionsNavigatorWrapper;
