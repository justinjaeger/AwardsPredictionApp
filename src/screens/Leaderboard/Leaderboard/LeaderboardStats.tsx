import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { Body, SubHeader } from '../../../components/Text';
import { formatDecimalAsPercentage } from '../../../util/formatPercentage';
import Stat from '../../../components/ItemStatBox/Stat';

const LeaderboardStats = ({
  title,
  subtitle,
  percentageAccuracy,
  numCorrect,
  totalPossibleSlots,
  numUsersPredicting,
  rank,
  onPress,
}: {
  title?: string;
  subtitle?: string;
  percentageAccuracy: number;
  numCorrect: number;
  totalPossibleSlots: number;
  numUsersPredicting: number;
  rank: number;
  onPress?: () => void;
}) => {
  return (
    <TouchableHighlight
      style={{
        flexDirection: 'row',
        width: '100%',
      }}
      onPress={onPress}
      underlayColor={COLORS.secondaryDark}
    >
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}
      >
        {title ? (
          <View
            style={{
              flexDirection: 'column',
              padding: 20,
              alignItems: 'center',
            }}
          >
            <SubHeader>{title}</SubHeader>
            {subtitle ? <Body style={{ marginTop: 5 }}>{subtitle}</Body> : null}
          </View>
        ) : (
          <View style={{ padding: 15 }} />
        )}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
          }}
        >
          <Stat
            number={`${formatDecimalAsPercentage(percentageAccuracy)}%`}
            text="accuracy"
          />
          <Stat number={`${numCorrect}/${totalPossibleSlots}`} text="correct" />
          <Stat number={`${rank}/${numUsersPredicting}`} text="rank" />
        </View>
        <View
          style={{
            height: 0.5,
            width: '90%',
            backgroundColor: COLORS.white,
            marginTop: 30,
            marginBottom: 5,
          }}
        />
      </View>
    </TouchableHighlight>
  );
};

export default LeaderboardStats;
