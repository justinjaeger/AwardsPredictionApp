import * as React from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import COLORS from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';

const BG_COLOR = COLORS.primaryDark;
const PRIMARY_COLOR = COLORS.secondaryDark;

export type iDynamicHeaderProps = {
  topOnlyContent: { height: number; component: JSX.Element };
  collapsedContent: { height: number; component: JSX.Element };
  persistedContent?: { height: number; component: JSX.Element };
  flatListRef?: React.LegacyRef<FlashList<any>>;
  scrollViewRef?: React.RefObject<ScrollView>;
};

// TODO: replace with reanimated
const DynamicHeader = ({
  scrollY,
  collapsedHeaderHeight,
  topHeaderHeight,
  scrollDistance,
  topOnlyContent,
  collapsedContent,
  persistedContent,
  flatListRef,
  scrollViewRef,
}: {
  scrollY: SharedValue<number>;
  collapsedHeaderHeight: number;
  topHeaderHeight: number;
  scrollDistance: number;
} & iDynamicHeaderProps) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const { height: topOnlyComponentHeight, component: topOnlyComponent } = topOnlyContent;
  const { height: collapsedComponentHeight, component: collapsedComponent } =
    collapsedContent;
  const { height: persistedComponentHeight, component: persistedComponent } =
    persistedContent || { height: 0, component: <></> };

  // less than zero if the collapsed header is taller than the top header
  const negativeAmountToHideCollapsed = Math.min(
    topHeaderHeight - collapsedHeaderHeight,
    0,
  );

  const animatedHeaderHeight = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, scrollDistance],
      [topHeaderHeight, collapsedHeaderHeight],
      Extrapolation.CLAMP,
    ),
  }));

  const animatedMarginTop = useAnimatedStyle(() => ({
    marginTop: interpolate(
      scrollY.value,
      [0, scrollDistance],
      [negativeAmountToHideCollapsed, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const animateTopContentOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, scrollDistance / 2],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const animateCollapsedContentOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [scrollDistance / 2, scrollDistance],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  const animateHeaderBackgroundColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scrollY.value,
      [0, scrollDistance],
      [BG_COLOR, PRIMARY_COLOR],
    ),
  }));

  const animateTopZIndex = useAnimatedStyle(() => ({
    zIndex: interpolate(scrollY.value, [0, scrollDistance], [0, 2], Extrapolation.CLAMP),
  }));

  return (
    <>
      <Animated.View
        style={[
          {
            height: top,
            width,
            zIndex: 2,
          },
          animateHeaderBackgroundColor,
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
            zIndex: 1000,
            // marginTop: animatedMarginTop,
            // height: animatedHeaderHeight,
            // backgroundColor: animateHeaderBackgroundColor,
          },
          animatedMarginTop,
          animatedHeaderHeight,
          animateHeaderBackgroundColor,
        ]}
      >
        <Animated.View style={[animateHeaderBackgroundColor]}>
          <Animated.View
            style={[
              {
                height: topOnlyComponentHeight,
                zIndex: 1,
              },
              animateTopContentOpacity,
            ]}
          >
            {topOnlyComponent}
          </Animated.View>
          <Animated.View
            style={[
              {
                width: '100%',
                position: 'absolute',
                top: topOnlyComponentHeight - collapsedComponentHeight,
                // opacity: animateCollapsedContentOpacity,
                // zIndex: animateTopZIndex,
              },
              animateCollapsedContentOpacity,
              animateTopZIndex,
            ]}
          >
            <View style={[{ height: collapsedComponentHeight }]}>
              <TouchableOpacity
                onPress={() => {
                  console.log('flatListRef', flatListRef);
                  // flatListRef && flatListRef.current?.scrollToOffset({ offset: 0 });
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
