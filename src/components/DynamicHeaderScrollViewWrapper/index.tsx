import React, { useRef } from 'react';
import { ScrollView, Animated, ScrollViewProps, View } from 'react-native';
import DynamicHeader, { iDynamicHeaderProps } from './DynamicHeader';

const DynamicHeaderScrollViewWrapper = (
  props: {
    children: JSX.Element;
    scrollViewProps?: ScrollViewProps;
  } & iDynamicHeaderProps,
) => {
  const { children, scrollViewProps } = props;
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <View>
      <DynamicHeader animHeaderValue={scrollOffsetY} {...props} />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false },
        )}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default DynamicHeaderScrollViewWrapper;
