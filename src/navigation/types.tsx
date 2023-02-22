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

export type BottomTabParamList = {
  Predictions: undefined;
  Profile: { userId?: string };
  Friend: undefined;
  Admin: undefined;
};

export type PredictionsParamList = {
  EventSelect: undefined;
  Event: { userId: string | undefined };
  EventFromProflie: { userId: string | undefined };
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
  ContenderDetails: {
    categoryType: CategoryType;
    contenderId: string;
    personTmdb?: number | undefined;
  };
  AddPredictions: {
    initialPredictions: iPrediction[];
    onFinish: (predictions: iPrediction[]) => void;
  };
  Profile: {
    userId?: string;
  };
};

export type AdminParamList = {
  Admin: undefined;
  ManageContenders: undefined;
};

export type ProfileParamList = {
  Profile: {
    userId?: string;
  };
  Followers: {
    userId: string;
    type: 'followers' | 'following';
  };
  ChangeUsername: undefined;
  Event: { userId: string | undefined };
  Category: {
    userId: string | undefined;
    isSelectable?: boolean;
    onPressItem?: (contenderId: string) => void;
  };
};

export type FriendParamList = {
  SearchFriends: undefined;
  Profile: {
    userId?: string;
  };
  ChangeUsername: undefined;
};
