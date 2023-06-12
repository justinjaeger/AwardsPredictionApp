import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import theme from '../../../constants/theme';

const TIMING = 250;
const TIMING_FADE = 500;

const useListItemAnimation = (
  isSelected: boolean,
  rightColWidth: number,
  width: number,
  height: number,
  largePoster: number,
  smallPoster: number,
  windowWidth: number,
) => {
  const BODY_WIDTH_SELECTED =
    windowWidth - largePoster - theme.windowMargin * 2 - rightColWidth;
  const BODY_WIDTH_UNSELECTED =
    windowWidth - smallPoster - theme.windowMargin * 2 - rightColWidth;
  const ITEM_WIDTH_SELECTED = rightColWidth + BODY_WIDTH_SELECTED;
  const ITEM_WIDTH_UNSELECTED = rightColWidth + BODY_WIDTH_UNSELECTED;

  const imageWidth = useRef(new Animated.Value(width)).current;
  const imageHeight = useRef(new Animated.Value(height)).current;
  const hiddenOpacity = useRef(new Animated.Value(0)).current;
  const itemWidth = useRef(new Animated.Value(ITEM_WIDTH_UNSELECTED)).current;
  const bodyWidth = useRef(new Animated.Value(BODY_WIDTH_UNSELECTED)).current;

  useEffect(() => {
    Animated.timing(imageWidth, {
      toValue: width,
      duration: TIMING,
      useNativeDriver: false,
    }).start();
    Animated.timing(imageHeight, {
      toValue: height,
      duration: TIMING,
      useNativeDriver: false,
    }).start();
    Animated.timing(hiddenOpacity, {
      toValue: isSelected ? 1 : 0,
      duration: TIMING_FADE,
      useNativeDriver: true,
    }).start();
    Animated.timing(bodyWidth, {
      toValue: isSelected ? BODY_WIDTH_SELECTED : BODY_WIDTH_UNSELECTED,
      duration: TIMING,
      useNativeDriver: false,
    }).start();
    Animated.timing(itemWidth, {
      toValue: isSelected ? ITEM_WIDTH_SELECTED : ITEM_WIDTH_UNSELECTED,
      duration: TIMING,
      useNativeDriver: false,
    }).start();
  }, [isSelected]);

  return { imageWidth, imageHeight, hiddenOpacity, bodyWidth };
};

export default useListItemAnimation;
