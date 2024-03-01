import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { CategoryName, Phase, iPrediction } from '../models';

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
  Help: undefined;
};

type iBottomTabDefaultParamList = {
  initialScreen?: keyof PredictionsParamList;
  disableBack?: boolean;
};

export type BottomTabParamList = {
  Social: iBottomTabDefaultParamList;
  Predictions: iBottomTabDefaultParamList;
  ProfileTab: iBottomTabDefaultParamList & { userId?: string };
  Leaderboard: iBottomTabDefaultParamList;
  Help: undefined;
  Admin: undefined;
};

export type iUserInfo = {
  userId: string;
  userName: string;
  userImage: string | undefined;
};

// TODO: Not all of these are going to be relevant
type iHistoryNavigationProps = {
  yyyymmdd?: number;
  noShorts?: boolean;
  phase?: Phase;
  predictionSetId?: string;
  isLeaderboard?: boolean;
};

export type PredictionsNavigationProp = StackNavigationProp<PredictionsParamList>;
export type PredictionsParamList = {
  EventSelect: undefined;
  // PREDICTION SCREENS
  Event: {
    userInfo: iUserInfo | undefined;
    eventId: string;
    disableBack?: boolean;
  } & iHistoryNavigationProps;
  Category: {
    userInfo: iUserInfo | undefined;
    eventId: string;
    category: CategoryName;
    showEventLink?: boolean;
    onPressItem?: (contenderId: string) => void;
  } & iHistoryNavigationProps;
  AddPredictions: {
    eventId: string;
    category: CategoryName;
    initialPredictions: iPrediction[];
    onFinish: (predictions: iPrediction[]) => void;
  };
  ContenderStats: {
    eventId: string;
    movieTmdbId: number;
    year: number;
  } & iHistoryNavigationProps;
  // PROFILE SCREENS
  Profile: {
    userInfo: iUserInfo;
    disableBack?: boolean;
  };
  Followers: {
    userInfo: iUserInfo;
    type: 'followers' | 'following';
  };
  UpdateProfileInfo: undefined;
  // FRIEND SCREENS
  SearchFriends: undefined;
  // LEADERBOARD SCREENS
  Leaderboard: {
    eventId: string;
    phase: Phase;
    noShorts?: boolean;
    disableBack?: boolean;
  };
  // MODALS
  ContenderInfoModal: {
    prediction: iPrediction;
    category: CategoryName;
    eventId: string;
  } & iHistoryNavigationProps;
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
