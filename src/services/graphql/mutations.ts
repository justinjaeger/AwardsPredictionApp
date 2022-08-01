import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { CreateUserInput } from '../../API';
import * as mutations from '../../graphql/mutations';

const createUser = async (input: CreateUserInput) => {
  return await API.graphql<GraphQLQuery<typeof input>>(
    graphqlOperation(mutations.createUser, { input }),
  );
};

const ApiServices = {
  createUser,
};

export default ApiServices;
