import { default as RNSnackbar, SnackBarOptions } from 'react-native-snackbar';
import COLORS from '../constants/colors';

const Snackbar = {
  success: (text: string, params?: Partial<SnackBarOptions>) =>
    RNSnackbar.show({
      text,
      duration: RNSnackbar.LENGTH_LONG,
      backgroundColor: COLORS.success,
      ...params,
    }),
  warning: (text: string, params?: Partial<SnackBarOptions>) =>
    RNSnackbar.show({
      text,
      duration: RNSnackbar.LENGTH_LONG,
      backgroundColor: COLORS.secondaryDark,
      ...params,
    }),
  error: (text: string, params?: Partial<SnackBarOptions>) =>
    RNSnackbar.show({
      text,
      duration: RNSnackbar.LENGTH_LONG,
      backgroundColor: COLORS.error,
      ...params,
    }),
};

export default Snackbar;
