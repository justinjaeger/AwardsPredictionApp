import React from 'react';
import { StyleProp, View, ViewStyle, useWindowDimensions } from 'react-native';
import COLORS from '../../constants/colors';
import useDevice from '../../util/device';
import { Body, HeaderLight } from '../Text';
import { getPosterDimensionsByWidth } from '../../constants/posterDimensions';
import theme from '../../constants/theme';
import { Phase } from '../../models';
import { getAccoladeColor } from '../../util/getAccoladeColor';

const RankingDisplay = ({
  ranking,
  accolade,
  isUnaccoladed,
  style,
}: {
  ranking: string | number;
  accolade?: Phase;
  isUnaccoladed?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const { width } = useWindowDimensions();
  const { isPad } = useDevice();
  const Text = isPad ? HeaderLight : Body;

  const accoladeColor = accolade && getAccoladeColor(accolade);
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
      style={[
        {
          position: 'absolute',
          zIndex: 1,
          backgroundColor: accolade
            ? accoladeColor
            : isUnaccoladed
            ? 'rgba(0,0,0,0.5)'
            : 'rgba(0,0,0,0.7)',
          borderBottomRightRadius: 5,
          borderTopLeftRadius: 5,
          borderColor: accolade
            ? accoladeColor
            : isUnaccoladed
            ? undefined
            : COLORS.secondary,
          padding: isPad ? 5 : 0,
          ...sizeSpecificStyles,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: isUnaccoladed ? 'rgba(255,255,255,0.5)' : COLORS.white,
          fontWeight: '700',
        }}
      >
        {ranking.toString()}
      </Text>
    </View>
  );
};

export default RankingDisplay;
