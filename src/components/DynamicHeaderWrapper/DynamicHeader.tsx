import * as React from 'react';
import {
  Animated,
  FlatList,
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
  persistedContent?: { height: number; component: JSX.Element };
  flatListRef?: React.RefObject<FlatList>;
  scrollViewRef?: React.RefObject<ScrollView>;
};

const DynamicHeader = ({
  animHeaderValue,
  topOnlyContent,
  collapsedContent,
  persistedContent,
  flatListRef,
  scrollViewRef,
}: { animHeaderValue: Animated.Value } & iDynamicHeaderProps) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const { height: topOnlyComponentHeight, component: topOnlyComponent } = topOnlyContent;
  const { height: collapsedComponentHeight, component: collapsedComponent } =
    collapsedContent;
  const { height: persistedComponentHeight, component: persistedComponent } =
    persistedContent || { height: 0, component: <></> };

  const collapsedHeaderHeight = collapsedComponentHeight + persistedComponentHeight;
  const topHeaderHeight = topOnlyComponentHeight + persistedComponentHeight;
  const scrollDistance = Math.abs(collapsedHeaderHeight - topHeaderHeight);

  // less than zero if the collapsed header is taller than the top header
  const negativeAmountToHideCollapsed = Math.min(
    topHeaderHeight - collapsedHeaderHeight,
    0,
  );

  const animatedHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [topHeaderHeight, collapsedHeaderHeight],
    extrapolate: 'clamp',
  });

  const animatedMarginTop = animHeaderValue.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [negativeAmountToHideCollapsed, 0],
    extrapolate: 'clamp',
  });

  const animateTopContentOpacity = animHeaderValue.interpolate({
    inputRange: [0, scrollDistance / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animateCollapsedContentOpacity = animHeaderValue.interpolate({
    inputRange: [scrollDistance / 2, scrollDistance],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [BG_COLOR, PRIMARY_COLOR],
    extrapolate: 'clamp',
  });

  const animateTopZIndex = animHeaderValue.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [0, 1],
  });

  return (
    <>
      <Animated.View
        style={[
          {
            height: top,
            width,
            zIndex: 2,
          },
          { backgroundColor: animateHeaderBackgroundColor },
        ]}
      />
      <Animated.View
        style={[
          {
            justifyContent: 'flex-end',
            width,
          },
          {
            position: 'absolute',
            top,
            marginTop: animatedMarginTop,
            height: animatedHeaderHeight,
            backgroundColor: animateHeaderBackgroundColor,
          },
        ]}
      >
        <Animated.View style={{ backgroundColor: animateHeaderBackgroundColor }}>
          <Animated.View
            style={[
              {
                height: topOnlyComponentHeight,
              },
              {
                opacity: animateTopContentOpacity,
                zIndex: animateTopZIndex,
              },
            ]}
          >
            {topOnlyComponent}
          </Animated.View>
          <Animated.View
            style={{
              width: '100%',
              position: 'absolute',
              top: topOnlyComponentHeight - collapsedComponentHeight,
              opacity: animateCollapsedContentOpacity,
            }}
          >
            <View style={[{ height: collapsedComponentHeight }]}>
              <TouchableOpacity
                onPress={() => {
                  flatListRef && flatListRef.current?.scrollToOffset({ offset: 0 });
                  scrollViewRef && scrollViewRef.current?.scrollTo({ y: 0 });
                }}
              >
                {collapsedComponent}
              </TouchableOpacity>
            </View>
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
