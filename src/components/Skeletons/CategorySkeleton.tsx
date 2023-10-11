import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { getPosterDimensionsByWidth } from '../../constants/posterDimensions';

const NUM_ROWS = 10;

const CategorySkeleton = () => {
  const { width: windowWidth } = useWindowDimensions();

  const SMALL_POSTER = windowWidth / 10;
  const { height, width } = getPosterDimensionsByWidth(SMALL_POSTER);

  return (
    <View
      style={{
        height: '100%',
        marginLeft: theme.windowMargin,
        marginRight: theme.windowMargin,
      }}
    >
      <SkeletonPlaceholder
        speed={1200}
        backgroundColor={COLORS.primary}
        highlightColor={COLORS.primaryLight}
      >
        <View style={{ flexDirection: 'column', marginTop: 20 }}>
          {Array(NUM_ROWS)
            .fill(null)
            .map((x, i) => (
              <View
                key={i}
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
            ))}
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default CategorySkeleton;
