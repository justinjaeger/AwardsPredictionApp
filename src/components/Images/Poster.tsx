import React, { useState } from 'react';
import { ImageStyle, StyleProp, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import COLORS from '../../constants/colors';
import { getPosterDimensionsByWidth, PosterSize } from '../../constants/posterDimensions';
import { getTmdbImageUrl } from '../../constants';
import { Label } from '../Text';
import theme from '../../constants/theme';
import RankingDisplay from '../RankingDisplay';
import { Phase } from '../../types/api';
import { getAccoladeColor } from '../../util/getAccoladeColor';

type iPosterProps = {
  title: string;
  path: string | null;
  width: number; // 1 is 27*40px, defualt is 5
  ranking?: number;
  onPress?: () => void;
  styles?: StyleProp<ImageStyle>;
  accolade?: Phase;
  isUnaccoladed?: boolean;
};

const BORDER_RADIUS = 5;

const Poster = ({
  path,
  title,
  width,
  ranking,
  onPress,
  styles,
  accolade,
  isUnaccoladed,
}: iPosterProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const posterDimensions = getPosterDimensionsByWidth(width - theme.posterMargin * 2);

  const accoladeColor: string = getAccoladeColor(accolade);

  const borderWidth = accolade ? posterDimensions.width / 15 : 1;

  const style: StyleProp<ImageStyle> = {
    ...posterDimensions,
    borderWidth,
    borderColor: accolade ? accoladeColor : isUnaccoladed ? undefined : COLORS.secondary,
    borderRadius: BORDER_RADIUS,
    opacity: isPressed ? 0.8 : 1,
    ...(styles as Record<string, unknown>),
  };

  return (
    <TouchableHighlight
      onPress={onPress || undefined}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      underlayColor={'#FFF'}
      disabled={!onPress}
    >
      <>
        {ranking !== undefined ? (
          <RankingDisplay
            ranking={ranking}
            accolade={accolade}
            isUnaccoladed={isUnaccoladed}
          />
        ) : null}
        {path ? (
          <View style={{ position: 'relative' }}>
            {isUnaccoladed ? (
              <View
                style={{
                  position: 'absolute',
                  width: posterDimensions.width,
                  height: posterDimensions.height,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: BORDER_RADIUS,
                  zIndex: 2,
                }}
              />
            ) : null}
            <FastImage
              style={style as Record<string, unknown>}
              source={{
                uri: getTmdbImageUrl(posterDimensions.width) + '/' + path,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              ...(style as Record<string, unknown>),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isUnaccoladed ? 'rgba(0,0,0,0.3)' : undefined,
              padding: theme.posterMargin,
            }}
          >
            {(width || 0) > PosterSize.SMALL ? (
              <Label
                style={{
                  textAlign: 'center',
                  color: COLORS.primaryLightest,
                }}
              >
                {title}
              </Label>
            ) : null}
          </View>
        )}
      </>
    </TouchableHighlight>
  );
};

export default Poster;
