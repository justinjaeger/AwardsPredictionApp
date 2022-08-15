import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { CreateUserInput, CreateUserMutation, GetUserQueryVariables } from '../../API';
import * as mutations from '../../graphql/mutations';

// https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/#configure-your-application
// https://github.com/aws-amplify/amplify-js/issues/4257

const createUser = async (input: CreateUserInput) => {
  return await API.graphql<GraphQLQuery<CreateUserMutation>>(
    graphqlOperation(mutations.createUser, { input }),
  );
};

const getUser = async (input: GetUserQueryVariables) => {
  return await API.graphql<GraphQLQuery<CreateUserMutation>>(
    graphqlOperation(mutations.createUser, { input }),
  );
};

const ApiServices = {
  createUser,
};

export default ApiServices;
