import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

const TIMING = 300;

export const useCollapsible = () => {
  const collapsedOpacity = useRef(new Animated.Value(0)).current;
  const expandedOpacity = useRef(new Animated.Value(1)).current;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    if (isCollapsed) {
      Animated.timing(expandedOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      Animated.timing(collapsedOpacity, {
        toValue: 1,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(collapsedOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      Animated.timing(expandedOpacity, {
        toValue: 1,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
    }
  }, [isCollapsed]);

  return { isCollapsed, setIsCollapsed, collapsedOpacity, expandedOpacity };
};
