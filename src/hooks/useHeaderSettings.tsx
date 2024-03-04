import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '../constants';
import COLORS from '../constants/colors';
import useDevice from '../util/device';

export const useHeaderSettings = () => {
  const { top } = useSafeAreaInsets();
  const { isPad } = useDevice();

  const headerHeight = HEADER_HEIGHT * (isPad ? 1.5 : 1);

  const headerStyle = {
    backgroundColor: COLORS.secondaryDark,
    height: headerHeight + top,
  };
  const largeHeaderStyle = {
    backgroundColor: COLORS.secondaryDark,
    height: headerHeight * 1.5 + top,
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
    headerStyle: { backgroundColor: COLORS.primary, height: top },
  };

  const darkHeaderSettings = {
    headerStyle: {
      backgroundColor: COLORS.primary,
      height: headerHeight + top,
    },
    headerTitleStyle: { color: COLORS.white },
  };

  return {
    toolbarOnly,
    medium: headerSettings,
    large: largeHeaderSettings,
    dark: darkHeaderSettings,
  };
};
