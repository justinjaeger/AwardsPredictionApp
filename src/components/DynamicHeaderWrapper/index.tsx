import React from 'react';
import { View, useWindowDimensions, ScrollViewProps } from 'react-native';
import { getNumberWithinRange } from '../../util/getNumberWithinRange';
import { BOTTOM_TAB_HEIGHT } from '../../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UNEXPLAINED_EXTRA_SCROLL_HEIGHT } from '../../screens/Predictions/Event/constants';
import DynamicHeader, { iDynamicHeaderProps } from './DynamicHeader';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { FlashListProps } from '@shopify/flash-list';

const DynamicHeaderWrapper = (
  props: {
    distanceToCollapse?: number;
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

  const scrollY = useSharedValue(0);

  const scrollViewProps: FlashListProps<any> | ScrollViewProps = {
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
      scrollY.value = numberWithinRange;
    },
    onScrollEndDrag: (e) => {
      const currY = e.nativeEvent.contentOffset.y;
      const numberWithinRange = getNumberWithinRange(currY, {
        min: 0,
        max: scrollDistance,
      });
      const isAtTop = numberWithinRange < scrollDistance / 2;
      if (numberWithinRange !== 0 && numberWithinRange !== scrollDistance) {
        scrollY.value = withTiming(isAtTop ? 0 : scrollDistance);
      }
    },
  };

  return (
    <View>
      <DynamicHeader
        scrollY={scrollY}
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
