import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { CATEGORY_TOP_AREA_HEIGHT } from '../../screens/Predictions/Event/constants';
import { getNumPostersInRow } from '../../util/getNumPostersInRow';
import { getCategoryListItemHeight } from '../../util/getCategoryListItemHeight';
import { CategoryName, EventModel } from '../../models';
import { getPosterDimensionsByWidth } from '../../constants/posterDimensions';

const EventSkeleton = ({
  event,
  category,
}: {
  event: EventModel | undefined;
  category: CategoryName | undefined;
}) => {
  const { width } = useWindowDimensions();

  const isLoading = !event || !category;
  const slots = isLoading ? 5 : event.categories[category]?.slots ?? 5;
  const numPostersInRow = getNumPostersInRow(slots);
  const numRowsToRender = Math.ceil(slots / numPostersInRow);
  const height = getCategoryListItemHeight({
    categoryName: category,
    event,
    windowWidth: width,
  });
  const { width: posterWidth, height: posterHeight } = getPosterDimensionsByWidth(
    (width - theme.windowMargin * 2 - theme.posterMargin * 2 * numPostersInRow) /
      numPostersInRow,
  );

  return (
    <View
      style={{
        height,
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
          {Array(numRowsToRender)
            .fill(null)
            .map((x, i) => (
              <View
                key={'event-skeleton-row' + i}
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                {i === 0 ? (
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
                ) : null}
                <View style={{ flexDirection: 'row' }}>
                  {Array(numPostersInRow)
                    .fill(null)
                    .map((y, j) => (
                      <View
                        key={`event-skeleton-poster${j}`}
                        style={{
                          width: posterWidth,
                          height: posterHeight,
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
