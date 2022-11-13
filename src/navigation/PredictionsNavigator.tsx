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
import PersonalPredictionsNavigator from './PersonalPredictionsNavigator';
import theme from '../constants/theme';

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
        }}
      />
      <Screen
        name="EventSelect"
        component={EventSelect}
        options={{
          headerTitle: 'Events (Global)',
          cardStyle: theme.cardStyle,
        }}
      />
      <Screen
        name="EventPredictions"
        component={EventPredictions}
        options={{
          headerTitle: 'Event',
          headerLeft: BackButton,
          cardStyle: theme.cardStyle,
        }}
      />
      <Screen
        name="Category"
        component={Category}
        options={{
          headerTitle: 'Category',
          headerLeft: BackButton,
          cardStyle: theme.cardStyle,
        }}
      />
      <Screen
        name="ContenderDetails"
        component={ContenderDetailsScreen}
        options={{
          headerTitle: 'Contender Details',
          headerLeft: BackButton,
          cardStyle: theme.cardStyle,
        }}
      />
      <Screen
        name="PersonalPredictions"
        component={PersonalPredictionsNavigator}
        options={{
          headerTitle: 'Personal Predictions',
          headerShown: false,
          headerLeft: BackButton,
          cardStyle: theme.cardStyle,
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
