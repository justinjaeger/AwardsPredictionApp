import { Category, Event } from '../models';

export type MainParamList = {
  BottomTabNavigator: undefined;
  Authenticator: undefined;
  WebView: {
    uri: string;
    title: string;
  };
};

export type HomeParamList = {
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

export type MyPredictionsParamList = {
  MyPredictions: undefined;
};
