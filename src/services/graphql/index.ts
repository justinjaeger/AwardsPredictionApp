import * as UserServices from './user';

// https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/#configure-your-application
// https://github.com/aws-amplify/amplify-js/issues/4257

const ApiServices = {
  ...UserServices,
};

export default ApiServices;
