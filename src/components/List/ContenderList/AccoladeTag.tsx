import React from 'react';
import { View } from 'react-native';
import { ContenderAccolade, EventStatus, PredictionType } from '../../../API';
import COLORS from '../../../constants/colors';
import {
  ACCOLADE_TO_SHORTSTRING,
  eventStatusToPredictionType,
} from '../../../constants/events';
import theme from '../../../constants/theme';
import { Body } from '../../Text';

const AccoladeTag = ({
  accolade,
  eventStatus,
  style,
}: {
  accolade: ContenderAccolade;
  eventStatus: EventStatus;
  style?: any;
}) => {
  // should only show accolade if it's a winner (when event is predicting winners), or nominee (when event is predicting nominees)
  const isWinner = accolade === ContenderAccolade.WINNER;
  const isNominee = accolade === ContenderAccolade.NOMINEE;
  const isPredictingWinners =
    eventStatusToPredictionType(eventStatus) === PredictionType.WIN;
  const showWinTag = isPredictingWinners && isWinner;
  const showNominationTag = !isPredictingWinners && isNominee;

  if (!showWinTag && !showNominationTag) return null;

  return (
    <View
      style={{
        marginLeft: 5,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: COLORS.secondaryLight,
        backgroundColor: isWinner ? COLORS.secondaryLight : 'transparent',
        marginRight: theme.windowMargin,
        justifyContent: 'center',
        height: 20,
        ...style,
      }}
    >
      <Body
        style={{
          color: isWinner ? 'black' : COLORS.secondaryLight,
          fontWeight: isWinner ? '700' : undefined,
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        {ACCOLADE_TO_SHORTSTRING[accolade]}
      </Body>
    </View>
  );
};

export default AccoladeTag;
