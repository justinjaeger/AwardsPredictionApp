import React, { useRef, useState } from 'react';
import { ScrollView, TouchableHighlight, View, useWindowDimensions } from 'react-native';
import { iLeaderboard } from '../../types/api';
import { formatLowDecimalAsPercentage } from '../../util/formatPercentage';
import COLORS from '../../constants/colors';
import Slider from './Slider';
import Indicators from './Indicators';
import CustomIcon from '../CustomIcon';

const MARGIN = 15;
const CHART_HEIGHT = 75;
const RESIZE_BUTTON_SIZE = 40;

const LeaderboardChart = ({ leaderboard }: { leaderboard: iLeaderboard }) => {
  const chartRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();

  const [minBarWidth, setMinBarWidth] = useState<'sm' | 'md' | 'lg'>('sm');
  const minBarWidthValue = minBarWidth === 'sm' ? 10 : minBarWidth === 'md' ? 20 : 30;
  const toggleBarWidth = (mode: 'inc' | 'dec') => {
    if (mode === 'inc') {
      if (minBarWidth === 'sm') {
        setMinBarWidth('md');
      } else if (minBarWidth === 'md') {
        setMinBarWidth('lg');
      }
    } else if (mode === 'dec') {
      if (minBarWidth === 'lg') {
        setMinBarWidth('md');
      } else if (minBarWidth === 'md') {
        setMinBarWidth('sm');
      }
    }
  };

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

  const barWidth = Math.max(width / totalBars, minBarWidthValue);
  const chartWidth = totalBars * barWidth;

  const resizeButtonStyle = {
    width: RESIZE_BUTTON_SIZE,
    height: RESIZE_BUTTON_SIZE,
    borderRadius: RESIZE_BUTTON_SIZE,
    margin: 10,
  };

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
            height: CHART_HEIGHT,
            width: chartWidth,
            marginTop: 20,
          }}
        >
          {groupedByPercentage.map(([percentage, numPredicting]) => {
            return (
              <View
                style={{ width: barWidth }}
                onTouchMove={() => console.log({ percentage })}
              >
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
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableHighlight
          onPress={() => toggleBarWidth('dec')}
          style={resizeButtonStyle}
          underlayColor={COLORS.secondary}
        >
          <CustomIcon
            color={COLORS.gray}
            size={RESIZE_BUTTON_SIZE}
            name={'minus-circle-outline'}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => toggleBarWidth('inc')}
          style={resizeButtonStyle}
          underlayColor={COLORS.secondary}
        >
          <CustomIcon
            color={COLORS.gray}
            size={RESIZE_BUTTON_SIZE}
            name={'plus-circle-outline'}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default LeaderboardChart;
