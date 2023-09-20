import * as UserRequests from './user';
import * as TokenRequests from './token';

const ApiService = {
  ...UserRequests,
  ...TokenRequests,
};

export default ApiService;
