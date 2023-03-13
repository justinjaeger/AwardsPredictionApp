import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import Snackbar from '../components/Snackbar';

export interface iApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: any;
  message?: string;
}

export const handleError = (message?: string, error?: any): iApiResponse<any> => {
  const m = error.message || message || 'something went wrong';
  console.error(message, JSON.stringify(error), m);
  Snackbar.error(m || '');
  return { status: 'error', message: m, error: error.name };
};

export const GraphqlAPI = <Query, Variables>(query: string, variables?: Variables) => {
  return API.graphql<GraphQLQuery<Query>>({
    query,
    // @ts-ignore
    variables,
  });
};
