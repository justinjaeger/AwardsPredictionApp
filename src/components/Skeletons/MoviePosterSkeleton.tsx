import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';

const MoviePosterSkeleton = ({
  posterDimensions: { width, height },
}: {
  posterDimensions: { height: number; width: number };
}) => {
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
          borderRadius: theme.borderRadius,
        }}
      />
    </SkeletonPlaceholder>
  );
};

export default MoviePosterSkeleton;
