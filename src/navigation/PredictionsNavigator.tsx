import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BackButton from '../components/Buttons/BackButton';
import { BottomTabParamList, PredictionsParamList } from './types';
import EventSelect from '../screens/Predictions/EventSelect';
import theme from '../constants/theme';
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

const { Navigator, Screen, Group } = createStackNavigator<PredictionsParamList>();

const PredictionsNavigator = () => {
  const {
    params: { initialScreen },
  } = useRoute<RouteProp<BottomTabParamList, 'ProfileTab'>>();
  const { toolbarOnly, medium, large } = useHeaderSettings();

  return (
    <Navigator
      initialRouteName={initialScreen || 'EventSelect'}
      screenOptions={{ headerMode: 'screen' }}
    >
      <Group>
        <Screen
          name="EventSelect"
          component={EventSelect}
          options={{
            ...toolbarOnly,
          }}
        />
        {/* Prediction Screens */}
        <Screen
          name="Event"
          component={Event}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="Category"
          component={Category}
          options={{
            headerTitle: getHeaderTitle('Category'),
            headerLeft: BackButton,
            cardStyle: theme.cardStyle,
            ...large,
          }}
        />
        <Screen
          name="AddPredictions"
          component={AddPredictions}
          options={{
            headerTitle: getHeaderTitle('Add / Remove Predictions'),
            headerLeft: BackButton,
            ...large,
          }}
        />
        <Screen
          name="ContenderStats"
          component={ContenderStats}
          options={{
            headerTitle: getHeaderTitle('Stats'),
            headerLeft: BackButton,
            gestureEnabled: false,
            ...large,
          }}
        />
        {/* Profile Screens */}
        <Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: '',
            ...medium,
          }}
        />
        <Screen
          name="UpdateProfileInfo"
          component={UpdateProfileInfo}
          options={{
            headerTitle: getHeaderTitle('Enter Username'),
            headerLeft: BackButton,
            ...medium,
          }}
        />
        <Screen
          name="Followers"
          component={Followers}
          options={{
            headerLeft: BackButton,
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
