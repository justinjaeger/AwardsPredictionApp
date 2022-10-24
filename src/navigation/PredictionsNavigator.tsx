import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/Buttons/BackButton';
import { CategoryProvider } from '../context/CategoryContext';
import PersonalCommunityTabs from './PersonalCommunityTabs.tsx';
import PersonalPredictionsNavigator from './PersonalPredictionsNavigator';
import ContenderDetailsScreen from '../screens/Predictions/ContenderDetailsScreen';
import { PredictionsParamList } from './types';
import Category from '../screens/Predictions/Category';
import EventSelect from '../screens/Predictions/EventSelect';
import EventPredictions from '../screens/Predictions/EventPredictions';
import { PredictionProvider } from '../context/PredictionContext';

const { Navigator, Screen } = createStackNavigator<PredictionsParamList>();

const PredictionsNavigator = () => (
  <Navigator initialRouteName="EventSelect" headerMode="screen">
    <Screen
      name="EventSelect"
      component={EventSelect}
      options={{
        headerTitle: 'Events (Global)',
      }}
    />
    <Screen
      name="EventPredictions"
      component={EventPredictions}
      options={{
        headerTitle: 'Event',
        headerLeft: BackButton,
      }}
    />
    <Screen
      name="Category"
      component={Category}
      options={{
        headerTitle: 'Category',
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
    <Screen
      name="PersonalPredictions"
      component={PersonalPredictionsNavigator}
      options={{
        headerTitle: 'Personal Predictions',
        headerLeft: BackButton,
      }}
    />
  </Navigator>
);

const PredictionsNavigatorWrapper = () => {
  return (
    <CategoryProvider>
      <PredictionProvider>
        <PredictionsNavigator />
        <PersonalCommunityTabs />
      </PredictionProvider>
    </CategoryProvider>
  );
};

export default PredictionsNavigatorWrapper;
