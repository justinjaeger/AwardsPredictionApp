import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { getPosterDimensionsByWidth } from '../../constants/posterDimensions';
import {
  CATEGORY_BOTTOM_AREA_HEIGHT,
  CATEGORY_TOP_AREA_HEIGHT,
} from '../../screens/Predictions/Event/constants';

const EventSkeleton = ({ numPostersInRow = 5 }: { numPostersInRow?: number }) => {
  const { width: windowWidth } = useWindowDimensions();
  const totalWidth = windowWidth - theme.windowMargin - theme.posterMargin;
  const { width, height } = getPosterDimensionsByWidth(
    (totalWidth - theme.windowMargin * 2 + theme.posterMargin) / numPostersInRow,
  );

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
        <View style={{ flexDirection: 'column' }}>
          {Array(3)
            .fill(null)
            .map((x, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <View
                  style={{
                    height: CATEGORY_TOP_AREA_HEIGHT,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      height: '33%',
                      width: 100,
                      borderRadius: theme.borderRadius,
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: CATEGORY_BOTTOM_AREA_HEIGHT,
                  }}
                >
                  {Array(numPostersInRow)
                    .fill(null)
                    .map((y, j) => (
                      <View
                        key={j}
                        style={{
                          width,
                          height,
                          margin: theme.posterMargin,
                          borderRadius: theme.borderRadius,
                        }}
                      />
                    ))}
                </View>
              </View>
            ))}
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default EventSkeleton;
