import * as UserRequests from './user';
import * as TokenRequests from './token';
import * as ApiDataRequests from './apidata';
import * as RelationshipRequests from './relationship';
import * as EventRequests from './event';
import * as PredictionSetRequests from './predictionset';
import * as EmailRequests from './email';
import * as CategoryUpdateLogRequests from './categoryupdatelogs';
import * as ContenderRequests from './contender';
import * as UploadRequests from './upload';
import * as AppInfoRequests from './appinfo';

const MongoApi = {
  ...UserRequests,
  ...TokenRequests,
  ...ApiDataRequests,
  ...RelationshipRequests,
  ...EventRequests,
  ...PredictionSetRequests,
  ...EmailRequests,
  ...CategoryUpdateLogRequests,
  ...ContenderRequests,
  ...UploadRequests,
  ...AppInfoRequests,
};

export default MongoApi;
