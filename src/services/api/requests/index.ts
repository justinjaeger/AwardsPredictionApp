import * as UserRequests from './user';
import * as TokenRequests from './token';
import * as SongRequests from './song';
import * as MovieRequests from './movie';
import * as PersonRequests from './person';
import * as RelationshipRequests from './relationship';
import * as EventRequests from './event';
import * as PredictionSetRequests from './predictionset';
import * as EmailRequests from './email';
import * as CategoryUpdateLogRequests from './categoryupdatelogs';
import * as ContenderRequests from './contender';

const MongoApi = {
  ...UserRequests,
  ...TokenRequests,
  ...SongRequests,
  ...MovieRequests,
  ...PersonRequests,
  ...RelationshipRequests,
  ...EventRequests,
  ...PredictionSetRequests,
  ...EmailRequests,
  ...CategoryUpdateLogRequests,
  ...ContenderRequests,
};

export default MongoApi;
