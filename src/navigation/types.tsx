import { CategoryType } from '../API';

export type MainParamList = {
  BottomTabNavigator: undefined;
  Authenticator: undefined;
  WebView: {
    uri: string;
    title: string;
  };
};

export type PredictionsParamList = {
  Profile: undefined;
  EventSelect: undefined;
  EventPredictions: undefined;
  Category: {
    isSelectable?: boolean;
    onPressItem?: (contenderId: string) => void;
  };
  ContenderDetails: {
    categoryType: CategoryType;
    contenderId: string;
    personTmdb?: number | undefined;
  };
  PersonalPredictions: undefined;
};

export type PersonalParamList = {
  EditPredictions: undefined;
  AddPredictions: undefined;
  CreateContender: undefined;
  ContenderDetails: {
    categoryType: CategoryType;
    contenderId: string;
    personTmdb?: number | undefined;
  }; // duplicated but it's better for the typed navigation
};

export type DevParamList = {
  Dev: undefined;
};

export type CreateContenderParamList = {
  CreateContender: {
    categoryId: string;
  };
  ConfirmContender: {
    tmdbId: number;
    categoryId: string;
  };
};

export type ProfileParamList = {
  Profile: undefined;
};

export type PersonalPredictionsParamList = {
  PersonalPredictions: undefined;
};
