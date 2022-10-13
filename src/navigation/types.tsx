import { Category, CategoryType, Contender, Event } from '../models';

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
    category: Category;
  };
  CreateContender: {
    category: Category;
  };
  ContenderDetails: {
    categoryType: CategoryType;
    contender: Contender;
    personTmdb?: number | undefined;
  };
  AddContenders: {
    category: Category;
  };
};

export type DevParamList = {
  Dev: undefined;
};

export type CreateContenderParamList = {
  CreateContender: {
    category: Category;
  };
  ConfirmContender: {
    tmdbId: number;
    category: Category;
  };
};

export type ProfileParamList = {
  Profile: undefined;
};

export type PersonalPredictionsParamList = {
  PersonalPredictions: undefined;
};
