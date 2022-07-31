import { default as RNSnackbar, SnackBarOptions } from 'react-native-snackbar';
import theme from '../theme';

const Snackbar = {
  success: (text: string, params?: Partial<SnackBarOptions>) =>
    RNSnackbar.show({
      text,
      duration: RNSnackbar.LENGTH_LONG,
      backgroundColor: theme['color-success-700'],
      ...params,
    }),
  warning: (text: string, params?: Partial<SnackBarOptions>) =>
    RNSnackbar.show({
      text,
      duration: RNSnackbar.LENGTH_LONG,
      backgroundColor: theme['color-warning-400'],
      ...params,
    }),
  error: (text: string, params?: Partial<SnackBarOptions>) =>
    RNSnackbar.show({
      text,
      duration: RNSnackbar.LENGTH_LONG,
      backgroundColor: theme['color-danger-800'],
      ...params,
    }),
};

export default Snackbar;
