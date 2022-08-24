import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeParamList } from './types';
import CreateContender from '../screens/CreateContender';
import { RouteProp, useRoute } from '@react-navigation/native';
// import BackButton from '../components/Buttons/BackButton';

const { Navigator, Screen } = createStackNavigator<HomeParamList>();

const CreateContenderNavigator = () => {
  const { params } = useRoute<RouteProp<HomeParamList, 'CreateContender'>>();

  return (
    <Navigator initialRouteName="CreateContender" headerMode="none">
      <Screen
        name="CreateContender"
        component={CreateContender}
        options={{
          headerTitle: 'Add a contender',
        }}
        initialParams={params}
      />
    </Navigator>
  );
};

export default CreateContenderNavigator;
