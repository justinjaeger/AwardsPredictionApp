import React, { useState } from 'react';
import { ImageStyle, StyleProp, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import COLORS from '../../constants/colors';
import {
  getPosterDimensionsByWidth,
  PosterSize,
  POSTER_SIZE,
} from '../../constants/posterDimensions';
import {
  TMDB_IMAGE_URL_LARGE,
  TMDB_IMAGE_URL_MED,
  TMDB_IMAGE_URL_SMALL,
} from '../../constants';
import { Body, Label } from '../Text';
import theme from '../../constants/theme';
import useDevice from '../../util/device';

type iPosterProps = {
  title: string;
  path: string | null; // comes after TMDB_IMAGE_URL_MED/
  width?: number; // 1 is 27*40px, defualt is 5
  ranking?: number;
  onPress?: () => void;
  styles?: StyleProp<ImageStyle>;
};

const Poster = ({
  path,
  title,
  width: _width,
  ranking,
  onPress,
  styles,
}: iPosterProps) => {
  const { isPad } = useDevice();

  const width = _width || PosterSize.MEDIUM;

  const [isPressed, setIsPressed] = useState<boolean>(false);

  const posterDimensions = width
    ? getPosterDimensionsByWidth(width - theme.posterMargin * 2)
    : POSTER_SIZE[PosterSize.MEDIUM];

  const style: StyleProp<ImageStyle> = {
    ...(styles as Record<string, unknown>),
    ...posterDimensions,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 5,
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
              padding: isPad ? 5 : 0,
            }}
          >
            <Body
              style={{
                color: COLORS.white,
                fontWeight: '600',
                padding: 1,
                paddingLeft: 2,
                paddingRight: 2,
                fontSize: isPad ? 22 : undefined,
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
              uri: `${
                width >= PosterSize.LARGE
                  ? TMDB_IMAGE_URL_LARGE
                  : width >= PosterSize.MEDIUM
                  ? TMDB_IMAGE_URL_MED
                  : TMDB_IMAGE_URL_SMALL
              }/${path}`,
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
