import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import useDevice from '../util/device';

const useKeyboard = () => {
  const { isAndroid } = useDevice();
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    const willShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardIsVisible(true),
    );
    const didShowListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardIsVisible(false),
    );
    return () => {
      willShowListener.remove();
      didShowListener.remove();
    };
  }, []);

  const androidKeyboardIsVisible = keyboardIsVisible && isAndroid;

  return { androidKeyboardIsVisible, keyboardIsVisible };
};

export default useKeyboard;
