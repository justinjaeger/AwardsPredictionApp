import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '../constants';
import COLORS from '../constants/colors';

export const useHeaderSettings = () => {
  const { top } = useSafeAreaInsets();

  const headerStyle = {
    backgroundColor: COLORS.secondaryDark,
    height: HEADER_HEIGHT + top,
  };
  const largeHeaderStyle = {
    backgroundColor: COLORS.secondaryDark,
    height: HEADER_HEIGHT * 2 + top,
  };
  const headerTitleStyle = { color: COLORS.white };
  const headerSettings: any = {
    headerStyle,
    headerTitleStyle,
  };
  const largeHeaderSettings: any = {
    headerStyle: largeHeaderStyle,
    headerTitleStyle,
  };
  const toolbarOnly: any = {
    headerStyle: { backgroundColor: COLORS.secondaryDark, height: top },
  };

  return { toolbarOnly, medium: headerSettings, large: largeHeaderSettings };
};
