import React, { useRef } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { iLeaderboard } from '../../types/api';
import { formatLowDecimalAsPercentage } from '../../util/formatPercentage';
import COLORS from '../../constants/colors';
import Slider from './Slider';
import Indicators from './Indicators';

const MARGIN = 15;

const LeaderboardChart = ({ leaderboard }: { leaderboard: iLeaderboard }) => {
  const chartRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();

  const chartHeight = 75;
  const largestSegmentOfUsersWithSamePercentage = Math.max(
    ...Object.values(leaderboard.percentageAccuracyDistribution),
  );

  const resultsGroupedByRoundedPercentage: [percentage: number, numPredicting: number][] =
    [];
  const totalBars = leaderboard.totalPossibleSlots;
  for (let i = totalBars; i >= 0; i--) {
    const percentage = formatLowDecimalAsPercentage(i / totalBars);
    const numPredicting: number | undefined =
      leaderboard.percentageAccuracyDistribution[percentage];
    resultsGroupedByRoundedPercentage.push([percentage, numPredicting ?? 0]);
  }

  const barWidth = Math.max(width / totalBars, 10);
  const chartWidth = totalBars * barWidth;

  return (
    <View>
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
            height: chartHeight,
            width: chartWidth,
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
        >
          {resultsGroupedByRoundedPercentage.map(([percentage, numPredicting]) => {
            return (
              <View
                style={{
                  height: '100%',
                  justifyContent: 'flex-end',
                  marginLeft: barWidth / 2,
                }}
              >
                <View
                  key={percentage}
                  style={{
                    backgroundColor: COLORS.secondaryDark,
                    height:
                      (numPredicting / largestSegmentOfUsersWithSamePercentage) *
                      chartHeight,
                    width: barWidth / 2,
                    marginBottom: 0,
                  }}
                />
              </View>
            );
          })}
        </View>
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: COLORS.white,
            marginTop: 2,
            marginBottom: 2,
          }}
        />
        {/* loop throgh 1/100 and decide which indicators to show and where, and make it totalWidth */}
        <Indicators chartWidth={chartWidth} />
      </ScrollView>
      <Slider
        onValueChange={(v) => {
          chartRef.current?.scrollTo({
            x: (chartWidth - width) * (v / 100),
            animated: false,
          });
        }}
      />
    </View>
  );
};

export default LeaderboardChart;
