import * as React from 'react';
import {
  Animated,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import COLORS from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BG_COLOR = COLORS.primary;
const PRIMARY_COLOR = COLORS.secondaryDark;

export type iDynamicHeaderProps = {
  topOnlyContent: { height: number; component: JSX.Element };
  collapsedContent: { height: number; component: JSX.Element };
  persistedContent: { height: number; component: JSX.Element };
  scrollViewRef: React.RefObject<ScrollView>;
};

const DynamicHeader = ({
  animHeaderValue,
  topOnlyContent,
  collapsedContent,
  persistedContent,
  scrollViewRef,
}: { animHeaderValue: Animated.Value } & iDynamicHeaderProps) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const { height: topOnlyComponentHeight, component: topOnlyComponent } = topOnlyContent;
  const { height: collapsedComponentHeight, component: collapsedComponent } =
    collapsedContent;
  const { height: persistedComponentHeight, component: persistedComponent } =
    persistedContent;

  const minHeaderHeight = collapsedComponentHeight + persistedComponentHeight;
  const maxHeaderHeight = topOnlyComponentHeight + persistedComponentHeight;
  const SCROLL_DISTANCE = maxHeaderHeight - minHeaderHeight;

  const minInnerHeaderHeight = topOnlyComponentHeight;
  const maxInnerHeaderHeight = topOnlyComponentHeight + collapsedComponentHeight;

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
                  height: topOnlyComponentHeight,
                },
                {
                  opacity: animateTopContentOpacity,
                },
              ]}
            >
              {topOnlyComponent}
            </Animated.View>
          </Animated.View>
          <Animated.View style={{ backgroundColor: animateHeaderBackgroundColor }}>
            <Animated.View
              style={[
                { height: collapsedComponentHeight },
                {
                  opacity: animateCollapsedContentOpacity,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  scrollViewRef.current?.scrollTo({ y: 0 });
                }}
              >
                {collapsedComponent}
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <View
          style={{
            height: persistedComponentHeight,
            backgroundColor: BG_COLOR,
          }}
        >
          {persistedComponent}
        </View>
      </Animated.View>
    </>
  );
};

export default DynamicHeader;
