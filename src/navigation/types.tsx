import { Event } from '../models';

export type HomeParamList = {
  EventSelect: undefined;
  CategorySelect: {
    event: Event;
  };
};

export type ProfileParamList = {
  Profile: undefined;
};

export type MyPredictionsParamList = {
  MyPredictions: undefined;
};
