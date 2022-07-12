import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import PredictionsNavigator from './MyPredictionsNavigator';
import ProtectedRoute from '../screens/ProtectedRoute';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen
        name="MyPredictions"
        component={() => (
          <ProtectedRoute>
            <PredictionsNavigator />
          </ProtectedRoute>
        )}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
