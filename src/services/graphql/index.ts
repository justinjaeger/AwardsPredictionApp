import Snackbar from '../../components/Snackbar';
import * as UserServices from './user';

// https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/#configure-your-application
// https://github.com/aws-amplify/amplify-js/issues/4257

export interface iApiServiceReturn<T> {
  status: 'success' | 'error';
  data?: T;
  error?: any;
  message?: string;
}

export const handleError = (message?: string, error?: any): iApiServiceReturn<any> => {
  console.error(message, JSON.stringify(error));
  const m = error.message || message;
  Snackbar.error(m || '');
  return { status: 'error', message: m, error: error.name };
};

const ApiServices = {
  ...UserServices,
};

export default ApiServices;
