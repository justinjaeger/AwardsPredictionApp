import * as React from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';
import COLORS from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BG_COLOR = COLORS.primary;
const PRIMARY_COLOR = COLORS.secondaryDark;

export type iDynamicHeaderProps = {
  HeaderContentOnlyAtTop: JSX.Element;
  HeaderContentOnlyWhenCollapsed: JSX.Element;
  HeaderContentToPersist: JSX.Element;
  headerContentOnlyAtTopHeight: number;
  headerContentOnlyWhenCollapsedHeight: number;
  headerContentToPersistHeight: number;
};

const DynamicHeader = ({
  animHeaderValue,
  HeaderContentOnlyAtTop,
  HeaderContentOnlyWhenCollapsed,
  HeaderContentToPersist,
  headerContentOnlyAtTopHeight,
  headerContentOnlyWhenCollapsedHeight,
  headerContentToPersistHeight,
}: { animHeaderValue: Animated.Value } & iDynamicHeaderProps) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const minHeaderHeight =
    headerContentOnlyWhenCollapsedHeight + headerContentToPersistHeight;
  const maxHeaderHeight = headerContentOnlyAtTopHeight + headerContentToPersistHeight;

  const minInnerHeaderHeight = headerContentOnlyAtTopHeight;
  const maxInnerHeaderHeight =
    headerContentOnlyAtTopHeight + headerContentOnlyWhenCollapsedHeight;

  const SCROLL_DISTANCE = maxHeaderHeight - minHeaderHeight;

  const animatedHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: 'clamp',
  });

  const animatedInnerHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [minInnerHeaderHeight, maxInnerHeaderHeight],
    extrapolate: 'clamp',
  });

  const animateTopContentOpacity = animHeaderValue.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animateCollapsedContentOpacity = animHeaderValue.interpolate({
    inputRange: [SCROLL_DISTANCE / 2, SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [BG_COLOR, PRIMARY_COLOR],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View
        style={{
          height: top,
          width,
          zIndex: 2,
          backgroundColor: animateHeaderBackgroundColor,
        }}
      />
      <Animated.View
        style={[
          {
            justifyContent: 'flex-end',
            width,
          },
          { height: animatedHeaderHeight },
        ]}
      >
        <Animated.View style={[{ height: animatedInnerHeaderHeight }]}>
          <Animated.View style={{ backgroundColor: animateHeaderBackgroundColor }}>
            <Animated.View
              style={[
                {
                  height: headerContentOnlyAtTopHeight,
                },
                {
                  opacity: animateTopContentOpacity,
                },
              ]}
            >
              {HeaderContentOnlyAtTop}
            </Animated.View>
            <Animated.View
              style={[
                { height: headerContentOnlyWhenCollapsedHeight },
                {
                  opacity: animateCollapsedContentOpacity,
                },
              ]}
            >
              {HeaderContentOnlyWhenCollapsed}
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <View
          style={{
            height: headerContentToPersistHeight,
            backgroundColor: BG_COLOR,
          }}
        >
          {HeaderContentToPersist}
        </View>
      </Animated.View>
    </>
  );
};

export default DynamicHeader;
