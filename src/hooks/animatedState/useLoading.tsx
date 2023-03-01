import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const TIMING = 300;

export const useLoading = (isLoading: boolean) => {
  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(loadingOpacity, {
      toValue: isLoading ? 1 : 0,
      duration: TIMING,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(bodyOpacity, {
        toValue: isLoading ? 0 : 1,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
    }, 250);
  }, [isLoading]);

  return { loadingOpacity, bodyOpacity };
};
