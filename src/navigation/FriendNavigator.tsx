import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getHeaderTitle, headerSettings } from '../constants';
import SearchFriends from '../screens/SearchFriends';
import { SearchProvider } from '../context/ContenderSearchContext';
import { FriendParamList } from './types';
import ProfileNavigator from './ProfileNavigator';

const { Navigator, Screen } = createStackNavigator<FriendParamList>();

const FriendNavigator = () => (
  <SearchProvider>
    <Navigator
      initialRouteName="SearchFriends"
      headerMode={'screen'}
      screenOptions={{
        animationTypeForReplace: 'push',
      }}
    >
      <Screen
        name="SearchFriends"
        component={SearchFriends}
        options={{
          headerTitle: getHeaderTitle('Follow Users'),
          ...headerSettings,
        }}
      />
      <Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  </SearchProvider>
);

export default FriendNavigator;
