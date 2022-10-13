import * as UserServices from './user';
import * as EventServices from './event';
import * as CategoryServices from './category';
import * as ContenderServices from './contender';
import * as PredictionServices from './prediction';
import * as MovieServices from './movie';
import * as PersonServices from './person';
import * as SongServices from './song';

// https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/#configure-your-application
// https://github.com/aws-amplify/amplify-js/issues/4257

const ApiServices = {
  ...UserServices,
  ...EventServices,
  ...CategoryServices,
  ...MovieServices,
  ...ContenderServices,
  ...PredictionServices,
  ...PersonServices,
  ...SongServices,
};

export default ApiServices;
