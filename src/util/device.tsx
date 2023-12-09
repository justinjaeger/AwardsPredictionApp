import { Platform, useWindowDimensions } from 'react-native';

const useDevice = () => {
  const { width } = useWindowDimensions();

  const isSmallScreen = width < 400;
  const isLargeScreen = width > 700;

  // isPad can be google tablet OR ipad
  // @ts-ignore
  const isPad = Platform.constants?.interfaceIdiom === 'pad' || isLargeScreen; // boolean
  const isAndroid = Platform.OS === 'android';

  return { isPad, isAndroid, isSmallScreen, isLargeScreen };
};

export default useDevice;
