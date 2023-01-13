import React, { useState } from 'react';
import { ImageStyle, StyleProp, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import COLORS from '../../constants/colors';
import {
  getPosterDimensionsByWidth,
  PosterSize,
  POSTER_SIZE,
} from '../../constants/posterDimensions';
import { TMDB_IMAGE_URL } from '../../constants';
import { Body } from '../Text';
import theme from '../../constants/theme';

type iPosterProps = {
  title: string;
  path: string | null; // comes after TMDB_IMAGE_URL/
  width?: number; // 1 is 27*40px, defualt is 5
  ranking?: number;
  onPress?: () => void;
  isWinner?: boolean;
  styles?: StyleProp<ImageStyle>;
};

/**
 * TODO: add a blank image and blank movie poster for when poster is small
 */

const Poster = (props: iPosterProps) => {
  const { path, title, width: _width, ranking, onPress, isWinner, styles } = props;

  const width = _width || PosterSize.MEDIUM;

  const [isPressed, setIsPressed] = useState<boolean>(false);

  const posterDimensions = width
    ? getPosterDimensionsByWidth(width - theme.posterMargin * 2)
    : POSTER_SIZE[PosterSize.MEDIUM];

  const style: StyleProp<ImageStyle> = {
    ...(styles as Record<string, unknown>),
    ...posterDimensions,
    borderWidth: isWinner ? 5 : 1,
    borderColor: isWinner ? COLORS.secondaryLight : COLORS.secondary,
    borderRadius: 5,
    margin: theme.posterMargin,
    opacity: isPressed ? 0.8 : 1,
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
          <View
            style={{
              position: 'absolute',
              marginLeft: theme.posterMargin,
              marginTop: theme.posterMargin,
              zIndex: 1,
              backgroundColor: 'rgba(0,0,0,0.7)',
              borderBottomRightRadius: 5,
              borderTopLeftRadius: 5,
              borderWidth: 1,
              borderColor: COLORS.secondary,
            }}
          >
            <Body
              style={{
                color: COLORS.white,
                fontWeight: '600',
                padding: 1,
                paddingLeft: 2,
                paddingRight: 2,
              }}
            >
              {ranking.toString()}
            </Body>
          </View>
        ) : null}
        {path ? (
          <FastImage
            style={style as Record<string, unknown>}
            source={{
              uri: `${TMDB_IMAGE_URL}/${path}`,
            }}
          />
        ) : (
          <View
            style={{
              ...(style as Record<string, unknown>),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: theme.posterMargin,
            }}
          >
            {(width || 0) > PosterSize.SMALL ? (
              <Body
                style={{
                  textAlign: 'center',
                  color: COLORS.primaryLightest,
                  fontSize: 10,
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
