import * as UserRequests from './user';
import * as TokenRequests from './token';
import * as SongRequests from './song';
import * as MovieRequests from './movie';
import * as PersonRequests from './person';
import * as RelationshipRequests from './relationship';
import * as EventRequests from './event';

const MongoApi = {
  ...UserRequests,
  ...TokenRequests,
  ...SongRequests,
  ...MovieRequests,
  ...PersonRequests,
  ...RelationshipRequests,
  ...EventRequests,
};

export default MongoApi;
