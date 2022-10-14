import { CategoryType } from '../API';

export type MainParamList = {
  BottomTabNavigator: undefined;
  Authenticator: undefined;
  WebView: {
    uri: string;
    title: string;
  };
};

export type GlobalParamList = {
  EventSelect: undefined;
  CategorySelect: {
    eventId: string;
  };
  Contenders: {
    categoryId: string;
  };
  ContenderDetails: {
    categoryType: CategoryType;
    contenderId: string;
    personTmdb?: number | undefined;
  };
};

export type PersonalParamList = {
  EventSelect: undefined;
  CategorySelect: {
    event: Event;
  };
  Contenders: {
    categoryId: string;
  };
  CreateContender: {
    categoryId: string;
  };
  ContenderDetails: {
    categoryType: CategoryType;
    contenderId: string;
    personTmdb?: number | undefined;
  };
  AddContenders: {
    categoryId: string;
  };
  EditPredictions: {
    categoryId: string;
  };
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
