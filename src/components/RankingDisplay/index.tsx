import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import COLORS from '../../constants/colors';
import useDevice from '../../util/device';
import { SmallHeader, SubHeader } from '../Text';
import { getPosterDimensionsByWidth } from '../../constants/posterDimensions';
import theme from '../../constants/theme';

const RankingDisplay = ({
  ranking,
  borderColor,
}: {
  ranking: number;
  borderColor?: string;
}) => {
  const { width } = useWindowDimensions();
  const { isPad } = useDevice();
  const Text = isPad ? SmallHeader : SubHeader;

  const posterDimensions = getPosterDimensionsByWidth(width - theme.posterMargin * 2);

  const sizeSpecificStyles =
    posterDimensions.height > 50
      ? {
          borderWidth: 1,
          paddingRight: 2,
          paddingLeft: 2,
        }
      : {
          borderTopWidth: 1,
          borderLeftWidth: 1,
        };

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderColor: borderColor ?? COLORS.secondary,
        padding: isPad ? 5 : 0,
        ...sizeSpecificStyles,
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          fontWeight: '600',
        }}
      >
        {ranking.toString()}
      </Text>
    </View>
  );
};

export default RankingDisplay;
