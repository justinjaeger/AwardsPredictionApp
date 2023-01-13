import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

const TIMING = 300;
export type iListDisplay = 'list' | 'grid';

export const useDisplay = () => {
  const gridOpacity = useRef(new Animated.Value(0)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;

  const [display, setDisplay] = useState<iListDisplay>('list');
  const [delayedDisplay, setDelayedDisplay] = useState<iListDisplay>('list');

  useEffect(() => {
    if (display === 'grid') {
      Animated.timing(listOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(gridOpacity, {
          toValue: 1,
          duration: TIMING,
          useNativeDriver: true,
        }).start();
        setDelayedDisplay('grid');
      }, 0);
    }
    if (display === 'list') {
      Animated.timing(gridOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(listOpacity, {
          toValue: 1,
          duration: TIMING,
          useNativeDriver: true,
        }).start();
        setDelayedDisplay('list');
      }, 0);
    }
  }, [display]);

  return { display, delayedDisplay, setDisplay, listOpacity, gridOpacity };
};
