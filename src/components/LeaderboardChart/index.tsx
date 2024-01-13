import React, { useRef, useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import { iLeaderboard } from '../../types/api';
import { formatLowDecimalAsPercentage } from '../../util/formatPercentage';
import COLORS from '../../constants/colors';
import Slider from './Slider';
import Indicators from './Indicators';
import ChartToolbar, { SM } from './ChartToolbar';

const MARGIN = 15;
const CHART_HEIGHT = 75;

const LeaderboardChart = ({
  leaderboard,
  flatListRef,
}: {
  leaderboard: iLeaderboard;
  flatListRef: React.RefObject<FlatList<any>>;
}) => {
  const chartRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();

  const [minBarWidth, setMinBarWidth] = useState<number>(SM);

  const largestSegmentOfUsersWithSamePercentage = Math.max(
    ...Object.values(leaderboard.percentageAccuracyDistribution),
  );

  const groupedByPercentage: [percentage: number, numPredicting: number][] = [];
  const totalBars = leaderboard.totalPossibleSlots;
  for (let i = totalBars; i >= 0; i--) {
    const percentage = formatLowDecimalAsPercentage(i / totalBars);
    const numPredicting: number | undefined =
      leaderboard.percentageAccuracyDistribution[percentage];
    groupedByPercentage.push([percentage, numPredicting ?? 0]);
  }

  const barWidth = Math.max(width / totalBars, minBarWidth);
  const chartWidth = totalBars * barWidth;

  const [gesturePos, setGesturePos] = useState<{ x: number; y: number } | undefined>(
    undefined,
  );
  const handleGesture = (e: GestureResponderEvent) => {
    e.preventDefault();
    const x = e.nativeEvent.pageX;
    const y = e.nativeEvent.pageY;
    console.log({ x });
    const touchIsAboveHistogram = y <= 0;
    setGesturePos(touchIsAboveHistogram ? undefined : { x, y });
  };

  // lets us set the props of the scrollview from outside the component
  // better for performance since it won't re-render the component
  const enableScroll = (scrollEnabled: boolean) => {
    flatListRef?.current?.setNativeProps?.({ scrollEnabled });
  };

  return (
    <>
      <ScrollView
        horizontal
        style={{ width: '100%' }}
        contentContainerStyle={{
          flexDirection: 'column',
          marginLeft: MARGIN,
        }}
        showsHorizontalScrollIndicator={false}
        ref={chartRef}
        scrollEnabled={false}
      >
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexDirection: 'row',
            height: CHART_HEIGHT,
            width: chartWidth,
            marginTop: 20,
          }}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={(e) => {
            handleGesture(e);
            enableScroll(false);
          }}
          onResponderMove={(e) => {
            handleGesture(e);
          }}
          onTouchEnd={() => {
            setGesturePos(undefined);
            enableScroll(true);
          }}
        >
          {groupedByPercentage.map(([percentage, numPredicting]) => {
            return (
              <View style={{ width: barWidth }}>
                <View
                  style={{
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <View
                    key={percentage}
                    style={{
                      backgroundColor: COLORS.secondaryDark,
                      height:
                        (numPredicting / largestSegmentOfUsersWithSamePercentage) *
                        CHART_HEIGHT,
                      width: '50%',
                      marginBottom: 0,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: COLORS.white,
          }}
        />
        <Indicators chartWidth={chartWidth} />
      </ScrollView>
      <Slider
        onValueChange={(v) => {
          chartRef.current?.scrollTo({
            x: (chartWidth - width) * (v / 100),
            animated: false,
          });
        }}
        style={{ marginTop: 20 }}
      />
      <ChartToolbar minBarWidth={minBarWidth} setMinBarWidth={setMinBarWidth} />
    </>
  );
};

export default LeaderboardChart;
