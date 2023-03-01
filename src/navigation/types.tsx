import { CategoryType } from '../API';
import { iPrediction } from '../types';

export type MainParamList = {
  BottomTabNavigator: undefined;
  Authenticator: undefined;
  WebView: {
    uri: string;
    title: string;
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
    onPressItem?: (contenderId: string) => void;
  };
  CategoryFromProfile: {
    userId: string | undefined;
    isSelectable?: boolean;
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
  ChangeUsername: undefined;
  // UNFINISHED SCREENS
  ContenderDetails: {
    categoryType: CategoryType;
    contenderId: string;
    personTmdb?: number | undefined;
  };
  // FRIEND SCREENS
  SearchFriends: undefined;
};

export type AdminParamList = {
  Admin: undefined;
  ManageContenders: undefined;
};
