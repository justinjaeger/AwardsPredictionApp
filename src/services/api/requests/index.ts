import * as UserRequests from './user';
import * as TokenRequests from './token';
import * as SongRequests from './song';
import * as MovieRequests from './movie';
import * as PersonRequests from './person';

const MongoApi = {
  ...UserRequests,
  ...TokenRequests,
  ...SongRequests,
  ...MovieRequests,
  ...PersonRequests,
};

export default MongoApi;
