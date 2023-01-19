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

export type PredictionsParamList = {
  EventSelect: undefined;
  Event: undefined;
  Category: {
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
};

export type AdminParamList = {
  Admin: undefined;
  ManageContenders: undefined;
};

export type ProfileParamList = {
  Profile: undefined;
  ChangeUsername: undefined;
};
