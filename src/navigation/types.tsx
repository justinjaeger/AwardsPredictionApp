import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { iPrediction } from '../types/api';

export type MainScreenNavigationProp = StackNavigationProp<MainParamList>;
export type MainParamList = {
  BottomTabNavigator: {
    screen: keyof BottomTabParamList;
  };
  Authenticator: undefined;
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
  Profile: iBottomTabDefaultParamList & { userId?: string };
  Friend: iBottomTabDefaultParamList;
  Admin: undefined;
  Help: undefined;
};

export type PredictionsParamList = {
  EventSelect: undefined;
  // PREDICTION SCREENS
  Event: { userId: string | undefined };
  EventFromProfile: { userId: string | undefined };
  Category: {
    userId: string | undefined;
    isSelectable?: boolean;
    showEventLink?: boolean;
    onPressItem?: (contenderId: string) => void;
  };
  CategoryFromProfile: {
    userId: string | undefined;
    isSelectable?: boolean;
    showEventLink?: boolean;
    onPressItem?: (contenderId: string) => void;
  };
  AddPredictions: {
    initialPredictions: iPrediction[];
    onFinish: (predictions: iPrediction[]) => void;
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
