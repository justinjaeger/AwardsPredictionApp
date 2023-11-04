import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { getPosterDimensionsByWidth } from '../../constants/posterDimensions';

const AMOUNT_IN_ROW = 5;

const EventSkeleton = () => {
  const { width: windowWidth } = useWindowDimensions();
  const totalWidth = windowWidth - theme.windowMargin - theme.posterMargin;
  const { width, height } = getPosterDimensionsByWidth(
    (totalWidth - theme.windowMargin * 2 + theme.posterMargin) / 5,
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
          {Array(5)
            .fill(null)
            .map((x, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginTop: theme.windowMargin,
                }}
              >
                <View
                  style={{
                    width: 100,
                    height: 20,
                    marginBottom: 5,
                    borderRadius: theme.borderRadius,
                  }}
                />
                <View style={{ flexDirection: 'row' }}>
                  {Array(AMOUNT_IN_ROW)
                    .fill(null)
                    .map((y, j) => (
                      <View
                        key={j}
                        style={{
                          width,
                          height,
                          marginLeft: theme.posterMargin,
                          marginRight: theme.posterMargin,
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
