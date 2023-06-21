import * as UserServices from './user';
import * as RelationshipServices from './relationship';
import * as EventServices from './event';
import * as CategoryServices from './category';
import * as ContenderServices from './contender';
import * as PredictionServices from './prediction';
import * as HistoryPredictionServices from './historyPrediction';
import * as CommunityPredictionServices from './communityPrediction';
import * as MovieServices from './movie';
import * as PersonServices from './person';
import * as SongServices from './song';
import * as DeleteUserServices from './removeUser';
import * as EmailAuthServices from './emailAuth';
import * as TokenServices from './token';

// https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/#configure-your-application
// https://github.com/aws-amplify/amplify-js/issues/4257

const ApiServices = {
  ...UserServices,
  ...EventServices,
  ...CategoryServices,
  ...MovieServices,
  ...ContenderServices,
  ...PredictionServices,
  ...HistoryPredictionServices,
  ...CommunityPredictionServices,
  ...PersonServices,
  ...SongServices,
  ...RelationshipServices,
  ...DeleteUserServices,
  ...EmailAuthServices,
  ...TokenServices,
};

export default ApiServices;
