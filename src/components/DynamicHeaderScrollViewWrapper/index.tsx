import React, { useRef } from 'react';
import { Animated, ScrollViewProps, View, useWindowDimensions } from 'react-native';
import DynamicHeader, { iDynamicHeaderProps } from './DynamicHeader';
import { getNumberWithinRange } from '../../util/getNumberWithinRange';
import { BOTTOM_TAB_HEIGHT } from '../../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UNEXPLAINED_EXTRA_SCROLL_HEIGHT } from '../../screens/Predictions/Event/constants';

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
    scrollViewRef,
  } = props;
  const { height: topOnlyComponentHeight } = topOnlyContent;
  const { height: collapsedComponentHeight } = collapsedContent;
  const { height: persistedComponentHeight } = persistedContent;

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

  return (
    <View>
      <DynamicHeader animHeaderValue={animHeaderValue} {...props} />
      <Animated.ScrollView
        style={{
          paddingTop,
          position: 'relative',
          zIndex: -1,
          elevation: -1,
        }}
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingBottom: BOTTOM_TAB_HEIGHT + bottom + UNEXPLAINED_EXTRA_SCROLL_HEIGHT,
          minHeight: height,
        }}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const currY = e.nativeEvent.contentOffset.y;
          const numberWithinRange = getNumberWithinRange(currY, {
            min: 0,
            max: SCROLL_DISTANCE,
          });
          animHeaderValue.setValue(numberWithinRange);
        }}
        onScrollEndDrag={(e) => {
          const currY = e.nativeEvent.contentOffset.y;
          const numberWithinRange = getNumberWithinRange(currY, {
            min: 0,
            max: SCROLL_DISTANCE,
          });
          const isAtTop = numberWithinRange < SCROLL_DISTANCE / 2;
          Animated.spring(animHeaderValue, {
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
