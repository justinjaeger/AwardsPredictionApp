import * as UserServices from './user';
import * as EventServices from './event';
import * as CategoryServices from './category';

// https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/#configure-your-application
// https://github.com/aws-amplify/amplify-js/issues/4257

const ApiServices = {
  ...UserServices,
  ...EventServices,
  ...CategoryServices,
};

export default ApiServices;
