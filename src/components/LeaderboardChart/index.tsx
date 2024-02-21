import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import { iLeaderboard } from '../../models';
import {
  formatDecimalAsPercentage,
  formatLowDecimalAsPercentage,
} from '../../util/formatPercentage';
import COLORS from '../../constants/colors';
import Slider from './Slider';
import Indicators from './Indicators';
import ChartToolbar, { SM } from './ChartToolbar';
import { Header, SubHeader, SubHeaderLight } from '../Text';
import { hexToRgb } from '../../util/hexToRgb';
import theme from '../../theme';

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

  const totalBars = leaderboard.totalPossibleSlots;
  const largestSegmentOfUsersWithSamePercentage = Math.max(
    ...Object.values(leaderboard.percentageAccuracyDistribution),
  );

  const getBarWidth = (minBarWidth: number) => {
    return Math.max(width / totalBars, minBarWidth);
  };

  // the position of the inner scroll
  const [scrollPos, setScrollPos] = useState<number>(0);

  const [minBarWidth, _setMinBarWidth] = useState<number>(SM);

  const setMinBarWidth = (newW: number) => {
    _setMinBarWidth((prevW) => {
      // have to compensate the inner scroll position because the total width changes, so it will be off otherwise

      const newChartWidth = totalBars * getBarWidth(newW); // this is like 900, 1800, 2700
      const prevChartWidth = totalBars * getBarWidth(prevW);

      const v = (scrollPos / (prevChartWidth - width)) * 100;
      const percentageOfSliderThatIsFilled = v;

      const x = (newChartWidth - width) * (percentageOfSliderThatIsFilled / 100);

      // setTimeout is essential so the chart div can update before we scroll
      setTimeout(() => {
        chartRef.current?.scrollTo({
          x: x,
          animated: false,
        });
      }, 0);

      // have to also update the new inner scroll position
      setScrollPos(x);

      return newW;
    });
  };

  // const groupedByPercentage: [percentage: number, numPredicting: number][] = [];
  const [groupedByPercentage, setGroupedByPercentage] = useState<
    [percentage: number, numPredicting: number][]
  >([]);

  useEffect(() => {
    const groupedByPercentage: [percentage: number, numPredicting: number][] = [];
    for (let i = totalBars; i >= 0; i--) {
      const percentage = formatLowDecimalAsPercentage(i / totalBars);
      const numPredicting: number | undefined =
        leaderboard.percentageAccuracyDistribution[percentage];
      groupedByPercentage.push([percentage, numPredicting ?? 0]);
    }
    setGroupedByPercentage(groupedByPercentage);
  }, []);

  const barWidth = getBarWidth(minBarWidth);
  const chartWidth = totalBars * barWidth;

  const [gesturePos, setGesturePos] = useState<number | undefined>(undefined);

  const handleGesture = (e: GestureResponderEvent) => {
    // e.preventDefault();
    const x = e.nativeEvent.pageX;
    const left = scrollPos;
    const touchPosition = left + x - MARGIN;
    setGesturePos(Math.floor(touchPosition));
  };

  const slotIndex = gesturePos && Math.floor(gesturePos / barWidth);
  const slot = slotIndex && groupedByPercentage[Math.floor(slotIndex)];
  const percentage = slot && slot[0];
  const numPredicting = slot && slot[1];

  // lets us set the props of the scrollview from outside the component
  // better for performance since it won't re-render the component
  const enableScroll = (scrollEnabled: boolean) => {
    flatListRef?.current?.setNativeProps?.({ scrollEnabled });
  };

  return (
    <View style={{ position: 'relative' }}>
      {gesturePos !== undefined && slot && percentage ? (
        <View
          style={{
            position: 'absolute',
            top: -CHART_HEIGHT,
            right: 0,
            backgroundColor: COLORS.primaryLight,
            borderRadius: theme.borderRadius,
            alignItems: 'flex-end',
            flexDirection: 'column',
            borderWidth: 1,
            borderColor: hexToRgb(COLORS.white, 0.2),
          }}
        >
          <View style={{ padding: 5, alignItems: 'flex-end' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              <Header style={{ textAlign: 'right' }}>{`${formatDecimalAsPercentage(
                percentage,
              )}%`}</Header>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'baseline',
              }}
            >
              <SubHeader>{`${numPredicting}`}</SubHeader>
              <SubHeaderLight style={{ marginLeft: 5 }}>{'users'}</SubHeaderLight>
            </View>
          </View>
        </View>
      ) : null}
      <ScrollView
        horizontal
        style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.02)' }}
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
          {groupedByPercentage.map(([percentage, numPredicting], i) => {
            const isHovering = slotIndex === i;
            const height =
              (numPredicting / largestSegmentOfUsersWithSamePercentage) * CHART_HEIGHT;
            return (
              <View key={percentage} style={{ width: barWidth }}>
                <View
                  style={{
                    height: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : undefined,
                  }}
                >
                  {height > 0 ? (
                    <View
                      key={percentage}
                      style={{
                        backgroundColor: isHovering
                          ? COLORS.secondaryLight
                          : COLORS.secondaryDark,
                        height,
                        width: '70%',
                        marginBottom: 0,
                      }}
                    />
                  ) : null}
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
          const x = (chartWidth - width) * (v / 100);
          chartRef.current?.scrollTo({
            x,
            animated: false,
          });
        }}
        onSlidingComplete={(v) => {
          const x = (chartWidth - width) * (v / 100);
          chartRef.current?.scrollTo({
            x,
            animated: false,
          });
          setScrollPos(x);
        }}
        style={{ marginTop: 15 }}
      />
      <ChartToolbar minBarWidth={minBarWidth} setMinBarWidth={setMinBarWidth} />
    </View>
  );
};

export default LeaderboardChart;
