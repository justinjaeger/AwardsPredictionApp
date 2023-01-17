import React from 'react';
import { View } from 'react-native';
import { ContenderAccolade, PredictionType } from '../../../API';
import COLORS from '../../../constants/colors';
import { ACCOLADE_TO_SHORTSTRING } from '../../../constants/events';
import theme from '../../../constants/theme';
import { Body } from '../../Text';

const AccoladeTag = ({
  accolade,
  type,
  style,
}: {
  accolade: ContenderAccolade;
  type: PredictionType;
  style?: any;
}) => {
  // should only show accolade if it's a winner (when event is predicting winners), or nominee (when event is predicting nominees)
  const isWinner = accolade === ContenderAccolade.WINNER;
  const isNominee = accolade === ContenderAccolade.NOMINEE;
  const showWinTag = type === PredictionType.WIN && isWinner;
  const showNominationTag = type === PredictionType.NOMINATION && (isNominee || isWinner);

  if (!showWinTag && !showNominationTag) return null;

  return (
    <View
      style={{
        marginLeft: 5,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: COLORS.secondaryLight,
        backgroundColor: COLORS.secondaryLight,
        marginRight: theme.windowMargin,
        justifyContent: 'center',
        height: 20,
        ...style,
      }}
    >
      <Body
        style={{
          color: 'black',
          fontWeight: '700',
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
