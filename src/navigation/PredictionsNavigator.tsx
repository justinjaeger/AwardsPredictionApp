import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabParamList, PredictionsParamList } from './types';
import { getHeaderTitle } from '../constants';
import AddPredictions from '../screens/Predictions/AddPredictions.tsx';
import Profile from '../screens/Profile';
import UpdateProfileInfo from '../screens/Profile/UpdateProfileInfo';
import SearchFriends from '../screens/SearchUsers';
import { RouteProp, useRoute } from '@react-navigation/native';
import Followers from '../screens/Profile/Followers';
import { useHeaderSettings } from '../hooks/useHeaderSettings';
import ContenderStats from '../screens/ContenderStats';
import { PersonalCommunityTabProvider } from '../context/PersonalCommunityContext';
import ContenderInfoModal from '../screens/Predictions/ContenderInfoModal';
import Leaderboard from '../screens/Leaderboard/Leaderboard';
import Category from '../screens/Predictions/Category';
import Event from '../screens/Predictions/Event';
import { HeaderDropdownProvider } from '../context/HeaderDropdownContext';
import { BackButtonForNavigator } from '../components/HeaderComponents/BackButton';
import Social from '../screens/Predictions/Social';

const { Navigator, Screen, Group } = createStackNavigator<PredictionsParamList>();

const PredictionsNavigator = () => {
  const {
    params: { initialScreen },
  } = useRoute<RouteProp<BottomTabParamList, 'ProfileTab'>>();
  const { toolbarOnly, medium } = useHeaderSettings();

  return (
    <Navigator
      initialRouteName={initialScreen || 'Social'}
      screenOptions={{ headerMode: 'screen' }}
    >
      <Group>
        <Screen name="Social" component={Social} options={{ headerShown: false }} />
        {/* Prediction Screens */}
        <Screen name="Event" component={Event} options={{ headerShown: false }} />
        <Screen
          name="Category"
          component={Category}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Screen
          name="AddPredictions"
          component={AddPredictions}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Screen
          name="ContenderStats"
          component={ContenderStats}
          options={{ headerShown: false }}
        />
        {/* Profile Screens */}
        <Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Screen
          name="UpdateProfileInfo"
          component={UpdateProfileInfo}
          options={{
            headerTitle: getHeaderTitle('Enter Username'),
            headerLeft: BackButtonForNavigator,
            ...medium,
          }}
        />
        <Screen
          name="Followers"
          component={Followers}
          options={{
            headerLeft: BackButtonForNavigator,
            headerTitle: getHeaderTitle('Followers'),
            ...medium,
          }}
        />
        {/* Friend Screens */}
        <Screen
          name="SearchFriends"
          component={SearchFriends}
          options={{
            ...toolbarOnly,
          }}
        />
        {/* Leaderboard Screens */}
        <Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
      </Group>
      <Group screenOptions={{ presentation: 'modal' }}>
        <Screen
          name="ContenderInfoModal"
          component={ContenderInfoModal}
          options={{
            headerShown: false,
          }}
        />
      </Group>
    </Navigator>
  );
};

const WithProvider = () => (
  <PersonalCommunityTabProvider>
    <HeaderDropdownProvider>
      <PredictionsNavigator />
    </HeaderDropdownProvider>
  </PersonalCommunityTabProvider>
);

export default WithProvider;
