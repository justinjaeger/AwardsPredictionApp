import * as UserRequests from './user';
import * as TokenRequests from './token';

const MongoApi = {
  ...UserRequests,
  ...TokenRequests,
};

export default MongoApi;
