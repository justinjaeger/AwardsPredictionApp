import { Platform, useWindowDimensions } from 'react-native';

const useDevice = () => {
  const { width } = useWindowDimensions();
  // @ts-ignore
  const isPad = Platform.constants?.interfaceIdiom === 'pad'; // boolean

  const isSmallScreen = width < 400;
  const isLargeScreen = width > 900;

  return { isPad, isSmallScreen, isLargeScreen };
};

export default useDevice;
