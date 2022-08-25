import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateContenderParamList, HomeParamList } from './types';
import CreateContender from '../screens/CreateContender';
import { RouteProp, useRoute } from '@react-navigation/native';
import ConfirmContender from '../screens/CreateContender/ConfirmContender';
import BackButton from '../components/Buttons/BackButton';

const { Navigator, Screen } = createStackNavigator<CreateContenderParamList>();

const CreateContenderNavigator = () => {
  const { params } = useRoute<RouteProp<HomeParamList, 'CreateContender'>>();

  return (
    <Navigator initialRouteName="CreateContender" headerMode="screen">
      <Screen
        name="CreateContender"
        component={CreateContender}
        options={{
          headerTitle: 'Add a contender',
          headerLeft: BackButton,
        }}
        initialParams={params}
      />
      <Screen
        name="ConfirmContender"
        component={ConfirmContender}
        options={{
          headerTitle: 'Confirm Contender',
          headerLeft: BackButton,
        }}
      />
    </Navigator>
  );
};

export default CreateContenderNavigator;
