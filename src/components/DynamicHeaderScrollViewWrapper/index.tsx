import React, { useRef } from 'react';
import { Animated, ScrollViewProps, View } from 'react-native';
import DynamicHeader, { iDynamicHeaderProps } from './DynamicHeader';
import { getNumberWithinRange } from '../../util/getNumberWithinRange';

const DynamicHeaderScrollViewWrapper = (
  props: {
    children: JSX.Element;
    scrollViewProps?: ScrollViewProps;
  } & iDynamicHeaderProps,
) => {
  const {
    children,
    scrollViewProps,
    topOnlyContent,
    collapsedContent,
    persistedContent,
  } = props;
  const { height: topOnlyComponentHeight } = topOnlyContent;
  const { height: collapsedComponentHeight } = collapsedContent;
  const { height: persistedComponentHeight } = persistedContent;

  const minHeaderHeight = collapsedComponentHeight + persistedComponentHeight;
  const maxHeaderHeight = topOnlyComponentHeight + persistedComponentHeight;
  const SCROLL_DISTANCE = maxHeaderHeight - minHeaderHeight;

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  // TODO: when we "spring", this should also spring, else it gets slightly offset. can't figure out how
  const paddingTop = scrollOffsetY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [0, SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  return (
    <View>
      <DynamicHeader animHeaderValue={scrollOffsetY} {...props} />
      <Animated.ScrollView
        style={{
          paddingTop,
          position: 'relative',
          zIndex: -1,
          elevation: -1,
        }}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const currY = e.nativeEvent.contentOffset.y;
          const numberWithinRange = getNumberWithinRange(currY, {
            min: 0,
            max: SCROLL_DISTANCE,
          });
          scrollOffsetY.setValue(numberWithinRange);
        }}
        onScrollEndDrag={(e) => {
          const currY = e.nativeEvent.contentOffset.y;
          const numberWithinRange = getNumberWithinRange(currY, {
            min: 0,
            max: SCROLL_DISTANCE,
          });
          const isAtTop = numberWithinRange < SCROLL_DISTANCE / 2;
          Animated.spring(scrollOffsetY, {
            toValue: isAtTop ? 0 : SCROLL_DISTANCE,
            useNativeDriver: false,
          }).start();
        }}
        {...scrollViewProps}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
};

export default DynamicHeaderScrollViewWrapper;
