import { Category, Event } from '../models';

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

export type ProfileParamList = {
  Profile: undefined;
};

export type MyPredictionsParamList = {
  MyPredictions: undefined;
};
