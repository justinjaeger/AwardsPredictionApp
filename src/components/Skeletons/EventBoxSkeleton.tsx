import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import useDevice from '../../util/device';
import { EVENT_ITEM_HEIGHT } from '../../screens/Predictions/Event/EventList';

const EventBoxSkeleton = () => {
  const { isPad } = useDevice();
  const { width: windowWidth } = useWindowDimensions();
  const eventItemHeight = EVENT_ITEM_HEIGHT * (isPad ? 1.5 : 1);

  return (
    <View
      style={{
        width: '100%',
        marginLeft: theme.windowMargin,
        marginRight: theme.windowMargin,
        alignItems: 'flex-start',
      }}
    >
      <SkeletonPlaceholder
        speed={1200}
        backgroundColor={COLORS.primary}
        highlightColor={COLORS.primaryLight}
      >
        <View
          style={{
            marginLeft: theme.windowMargin,
            marginRight: theme.windowMargin,
            height: eventItemHeight,
            width: (isPad ? windowWidth / 2 : windowWidth) - theme.windowMargin * 1.5,
            marginTop: 20,
            marginBottom: 30,
            borderRadius: theme.borderRadius,
          }}
        />
      </SkeletonPlaceholder>
    </View>
  );
};

export default EventBoxSkeleton;
