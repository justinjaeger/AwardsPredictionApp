import React, { useRef } from 'react';
import {
  Animated,
  Keyboard,
  View,
  useWindowDimensions,
  ScrollViewProps,
} from 'react-native';
import { getNumberWithinRange } from '../../util/getNumberWithinRange';
import { BOTTOM_TAB_HEIGHT } from '../../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UNEXPLAINED_EXTRA_SCROLL_HEIGHT } from '../../screens/Predictions/Event/constants';
import useDevice from '../../util/device';
import DynamicHeader, { iDynamicHeaderProps } from './DynamicHeader';
import { debounce } from 'lodash';

const DynamicHeaderWrapper = (
  props: {
    onEndReached?: () => void;
    renderBodyComponent: (props: {
      paddingTop: Animated.AnimatedInterpolation<string | number>;
      scrollViewProps: ScrollViewProps;
    }) => JSX.Element;
  } & iDynamicHeaderProps,
) => {
  const {
    renderBodyComponent,
    topOnlyContent,
    collapsedContent,
    persistedContent,
    scrollViewRef,
    onEndReached,
  } = props;

  const { height: topOnlyComponentHeight } = topOnlyContent;
  const { height: collapsedComponentHeight } = collapsedContent;
  const { height: persistedComponentHeight } = persistedContent || { height: 0 };

  const { isPad } = useDevice();
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const minHeaderHeight = collapsedComponentHeight + persistedComponentHeight;
  const maxHeaderHeight = topOnlyComponentHeight + persistedComponentHeight;
  const SCROLL_DISTANCE = maxHeaderHeight - minHeaderHeight;

  const animHeaderValue = useRef(new Animated.Value(0)).current;

  const paddingTop = animHeaderValue.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [0, SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const debouncedOnEndReached = debounce(() => {
    onEndReached && onEndReached();
  }, 500);

  const scrollViewProps: ScrollViewProps = {
    style: {
      position: 'relative',
      zIndex: -1,
      elevation: -1,
    },
    // @ts-ignore
    ref: scrollViewRef,
    contentContainerStyle: {
      paddingBottom: BOTTOM_TAB_HEIGHT + bottom + UNEXPLAINED_EXTRA_SCROLL_HEIGHT,
      minHeight: height,
    },
    scrollEventThrottle: 16,
    onEndReachedThreshold: isPad ? 0.8 : 0.5, // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down
    keyboardShouldPersistTaps: 'always',
    showsVerticalScrollIndicator: false,
    onScroll: (e) => {
      const currY = e.nativeEvent.contentOffset.y;
      const numberWithinRange = getNumberWithinRange(currY, {
        min: 0,
        max: SCROLL_DISTANCE,
      });
      animHeaderValue.setValue(numberWithinRange);

      // BELOW IS NOT in the scroll view component
      Keyboard.dismiss();
      // Fetches more at bottom of scroll. Note the high event throttle to prevent too many requests
      // get position of current scroll
      const currentOffset = e.nativeEvent.contentOffset.y;
      // get max bottom of scroll
      const maxOffset =
        e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
      // if we're close to the bottom fetch more
      if (currentOffset > maxOffset - 200 && onEndReached) {
        debouncedOnEndReached();
      }
    },
    onScrollEndDrag: (e) => {
      const currY = e.nativeEvent.contentOffset.y;
      const numberWithinRange = getNumberWithinRange(currY, {
        min: 0,
        max: SCROLL_DISTANCE,
      });
      const isAtTop = numberWithinRange < SCROLL_DISTANCE / 2;
      if (numberWithinRange !== 0 && numberWithinRange !== SCROLL_DISTANCE) {
        Animated.timing(animHeaderValue, {
          toValue: isAtTop ? 0 : SCROLL_DISTANCE,
          useNativeDriver: false,
        }).start();
      }
    },
  };

  return (
    <View>
      <DynamicHeader animHeaderValue={animHeaderValue} {...props} />
      {renderBodyComponent({ paddingTop, scrollViewProps })}
    </View>
  );
};

export default DynamicHeaderWrapper;
