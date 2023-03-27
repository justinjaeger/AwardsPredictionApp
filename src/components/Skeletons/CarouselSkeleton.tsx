import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';
import { getPosterDimensionsByWidth } from '../../constants/posterDimensions';
import theme from '../../constants/theme';

const CarouselSkeleton = () => {
  const { width } = useWindowDimensions();
  const dimensions = getPosterDimensionsByWidth(width / 5 - 10);

  return (
    <View style={{ height: '100%', width: '100%', marginLeft: theme.windowMargin }}>
      <SkeletonPlaceholder
        speed={1200}
        backgroundColor={COLORS.primary}
        highlightColor={COLORS.primaryLight}
      >
        <View style={{ flexDirection: 'row' }}>
          {['', '', '', '', ''].map(() => (
            <View
              style={{
                width: dimensions.width,
                height: dimensions.height,
                margin: theme.posterMargin,
              }}
            />
          ))}
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default CarouselSkeleton;
