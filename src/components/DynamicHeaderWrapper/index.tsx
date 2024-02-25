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
import DynamicHeader, { iDynamicHeaderProps } from './DynamicHeader';
import { debounce } from 'lodash';

const DynamicHeaderWrapper = (
  props: {
    distanceToCollapse?: number;
    onEndReached?: () => void;
    renderBodyComponent: (props: {
      paddingTop: number;
      scrollViewProps: ScrollViewProps;
    }) => JSX.Element;
  } & iDynamicHeaderProps,
) => {
  const {
    distanceToCollapse,
    renderBodyComponent,
    topOnlyContent,
    collapsedContent,
    persistedContent,
    onEndReached,
  } = props;
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const { height: topOnlyComponentHeight } = topOnlyContent;
  const { height: collapsedComponentHeight } = collapsedContent;
  const { height: persistedComponentHeight } = persistedContent || { height: 0 };

  const collapsedHeaderHeight = collapsedComponentHeight + persistedComponentHeight;
  const topHeaderHeight = topOnlyComponentHeight + persistedComponentHeight;
  const scrollDistance =
    distanceToCollapse || Math.abs(topHeaderHeight - collapsedHeaderHeight);

  const animHeaderValue = useRef(new Animated.Value(0)).current;

  const debouncedOnEndReached = debounce(() => {
    onEndReached && onEndReached();
  }, 500);

  const scrollViewProps: ScrollViewProps = {
    style: {
      position: 'relative',
      zIndex: -1,
      elevation: -1,
    },
    contentContainerStyle: {
      paddingBottom: BOTTOM_TAB_HEIGHT + bottom + UNEXPLAINED_EXTRA_SCROLL_HEIGHT,
      minHeight: height,
    },
    scrollEventThrottle: 16,
    keyboardShouldPersistTaps: 'always',
    showsVerticalScrollIndicator: false,
    onScroll: (e) => {
      const currY = e.nativeEvent.contentOffset.y;
      const numberWithinRange = getNumberWithinRange(currY, {
        min: 0,
        max: scrollDistance,
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
        max: scrollDistance,
      });
      const isAtTop = numberWithinRange < scrollDistance / 2;
      if (numberWithinRange !== 0 && numberWithinRange !== scrollDistance) {
        Animated.timing(animHeaderValue, {
          toValue: isAtTop ? 0 : scrollDistance,
          useNativeDriver: false,
        }).start();
      }
    },
  };

  return (
    <View>
      <DynamicHeader
        animHeaderValue={animHeaderValue}
        collapsedHeaderHeight={collapsedHeaderHeight}
        topHeaderHeight={topHeaderHeight}
        scrollDistance={scrollDistance}
        {...props}
      />
      {renderBodyComponent({ paddingTop: topHeaderHeight, scrollViewProps })}
    </View>
  );
};

export default DynamicHeaderWrapper;
