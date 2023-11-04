import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { getPosterDimensionsByWidth } from '../../constants/posterDimensions';

const MoviePosterSkeleton = () => {
  const { width: windowWidth } = useWindowDimensions();
  const totalWidth = windowWidth - theme.windowMargin - theme.posterMargin;
  const { width, height } = getPosterDimensionsByWidth(
    (totalWidth - theme.windowMargin * 2 + theme.posterMargin) / 5,
  );
  return (
    <SkeletonPlaceholder
      speed={1200}
      backgroundColor={COLORS.primary}
      highlightColor={COLORS.primaryLight}
    >
      <View
        style={{
          width,
          height,
          marginLeft: theme.posterMargin,
          marginRight: theme.posterMargin,
          borderRadius: theme.borderRadius,
        }}
      />
    </SkeletonPlaceholder>
  );
};

export default MoviePosterSkeleton;
