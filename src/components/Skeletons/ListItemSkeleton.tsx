import React from 'react';
import { View } from 'react-native';
import theme from '../../constants/theme';
import { getPosterDimensionsByWidth } from '../../constants/posterDimensions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';

const ListItemSkeleton = ({ posterWidth }: { posterWidth: number }) => {
  const { height, width } = getPosterDimensionsByWidth(posterWidth);

  return (
    <SkeletonPlaceholder
      speed={1200}
      backgroundColor={COLORS.primary}
      highlightColor={COLORS.primaryLight}
    >
      <View
        style={{
          width: '100%',
          marginTop: theme.posterMargin * 4,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width,
            height,
            borderRadius: theme.borderRadius,
          }}
        />
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <View
            style={{
              width: 150,
              height: 20,
              borderRadius: theme.borderRadius,
            }}
          />
          {/* <View
                    style={{
                      marginTop: 10,
                      width: 100,
                      height: 20,
                      borderRadius: theme.borderRadius,
                    }}
                  /> */}
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default ListItemSkeleton;
