import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { CategoryName, Phase, iPrediction } from '../types/api';

export type MainScreenNavigationProp = StackNavigationProp<MainParamList>;
export type MainParamList = {
  BottomTabNavigator: {
    screen: keyof BottomTabParamList;
  };
  AuthenticatorNavigator: undefined;
  WebView: {
    uri: string;
    title?: string;
    showWebLink?: boolean;
  };
};

type iBottomTabDefaultParamList = {
  initialScreen?: keyof PredictionsParamList;
};

export type BottomTabParamList = {
  Predictions: iBottomTabDefaultParamList;
  ProfileTab: iBottomTabDefaultParamList & { userId?: string };
  Friend: iBottomTabDefaultParamList;
  Leaderboard: iBottomTabDefaultParamList;
  Help: undefined;
  Admin: undefined;
};

export type PredictionsNavigationProp = StackNavigationProp<PredictionsParamList>;
export type PredictionsParamList = {
  EventSelect: undefined;
  // PREDICTION SCREENS
  Event: {
    userId: string | undefined;
    eventId: string;
  };
  EventFromProfile: {
    userId: string | undefined;
    eventId: string;
  };
  Category: {
    userId: string | undefined;
    eventId: string;
    category: CategoryName;
    showEventLink?: boolean;
    onPressItem?: (contenderId: string) => void;
  };
  CategoryFromProfile: {
    userId: string | undefined;
    userImage?: string;
    eventId: string;
    category: CategoryName;
    showEventLink?: boolean;
    onPressItem?: (contenderId: string) => void;
  };
  AddPredictions: {
    eventId: string;
    category: CategoryName;
    initialPredictions: iPrediction[];
    onFinish: (predictions: iPrediction[]) => void;
  };
  ContenderStats: {
    movieTmdbId: number;
    year: number;
  };
  // PROFILE SCREENS
  Profile: {
    userId?: string;
  };
  Followers: {
    userId: string;
    type: 'followers' | 'following';
  };
  UpdateProfileInfo: undefined;
  // FRIEND SCREENS
  SearchFriends: undefined;
  // LEADERBOARD SCREENS
  LeaderboardList: undefined;
  Leaderboard: {
    eventId: string;
    phase: Phase;
    noShorts?: boolean;
  };
  // MODALS
  ContenderInfoModal: {
    prediction: iPrediction;
    category: CategoryName;
    eventId: string;
  };
};

export type AdminNavigationProp = StackNavigationProp<AdminParamList>;
export type AdminParamList = {
  Admin: undefined;
  ManageStudios: undefined;
  ManageEvents: undefined;
  ManageContenders: undefined;
  AddTestUser: undefined;
  AdminScripts: undefined;
};

export type AuthTabNavigationProp = MaterialTopTabNavigationProp<AuthTabParamList>;
export type AuthTabParamList = {
  Social: undefined;
  Email: undefined;
};
