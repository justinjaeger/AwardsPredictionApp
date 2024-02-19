import React, { useState } from 'react';
import { ImageStyle, StyleProp, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import COLORS from '../../constants/colors';
import { getPosterDimensionsByWidth, PosterSize } from '../../constants/posterDimensions';
import { getTmdbImageUrl } from '../../constants';
import { Body } from '../Text';
import theme from '../../constants/theme';
import RankingDisplay from '../RankingDisplay';
import { getAccoladeColor } from '../../util/getAccoladeColor';
import { iPosterFromTmdbProps } from './PosterFromTmdb';

export type iPosterProps = {
  title: string;
  path: string | null;
} & iPosterFromTmdbProps;

const BORDER_RADIUS = 5;

const Poster = ({
  path,
  title,
  posterDimensions,
  ranking,
  onPress,
  styles,
  accolade,
  isUnaccoladed,
}: iPosterProps) => {
  const { width, height } = posterDimensions;
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const accoladeColor = accolade && getAccoladeColor(accolade);

  const borderWidth = accolade ? width / 15 : 1;

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
                  width: width,
                  height: height,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: BORDER_RADIUS,
                  zIndex: 2,
                }}
              />
            ) : null}
            <FastImage
              style={style as Record<string, unknown>}
              source={{
                uri: getTmdbImageUrl(width) + '/' + path,
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
              <Body
                style={{
                  textAlign: 'center',
                  color: COLORS.primaryLightest,
                }}
              >
                {title}
              </Body>
            ) : null}
          </View>
        )}
      </>
    </TouchableHighlight>
  );
};

export default Poster;
