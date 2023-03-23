import { Platform } from 'react-native';

const useDevice = () => {
  // @ts-ignore
  const isPad = Platform.constants?.interfaceIdiom === 'pad'; // boolean

  return { isPad };
};

export default useDevice;
