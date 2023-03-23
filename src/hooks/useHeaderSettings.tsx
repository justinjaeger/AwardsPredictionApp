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
    height: headerHeight * 2 + top,
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
