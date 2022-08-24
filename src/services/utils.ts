import Snackbar from '../components/Snackbar';

export interface iApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: any;
  message?: string;
}

export const handleError = (message?: string, error?: any): iApiResponse<any> => {
  console.error(message, JSON.stringify(error));
  const m = error.message || message;
  Snackbar.error(m || '');
  return { status: 'error', message: m, error: error.name };
};
