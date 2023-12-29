import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/Buttons/BackButton';
import { LeaderboardParamList } from './types';
import { getHeaderTitle } from '../constants';
import LeaderboardList from '../screens/Leaderboard/LeaderboardList';
import Leaderboard from '../screens/Leaderboard/Leaderboard';

const { Navigator, Screen } = createStackNavigator<LeaderboardParamList>();

const LeaderboardNavigator = () => {
  return (
    <Navigator
      initialRouteName={'LeaderboardList'}
      screenOptions={{ headerMode: 'screen' }}
    >
      <Screen
        name="LeaderboardList"
        component={LeaderboardList}
        options={{
          headerTitle: getHeaderTitle('Leaderboards'),
          headerLeft: BackButton,
        }}
      />
      <Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          headerTitle: getHeaderTitle('Leaderboard'),
          headerLeft: BackButton,
        }}
      />
    </Navigator>
  );
};

export default LeaderboardNavigator;
