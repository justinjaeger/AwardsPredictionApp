import React, { useState } from 'react';
import {
  ImageStyle,
  StyleProp,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import COLORS from '../../constants/colors';
import {
  getPosterDimensionsByWidth,
  PosterSize,
  POSTER_SIZE,
} from '../../constants/posterDimensions';
import { TMDB_IMAGE_URL } from '../../constants';
import { Body, Label } from '../Text';
import theme from '../../constants/theme';
import { ContenderAccolade, PredictionType } from '../../API';
import AccoladeTag from '../List/ContenderList/AccoladeTag';
import { useCategory } from '../../context/CategoryContext';

type iPosterProps = {
  title: string;
  path: string | null; // comes after TMDB_IMAGE_URL/
  width?: number; // 1 is 27*40px, defualt is 5
  ranking?: number;
  onPress?: () => void;
  accolade?: ContenderAccolade | undefined;
  predictionType?: PredictionType;
  styles?: StyleProp<ImageStyle>;
};

/**
 * TODO: add a blank image and blank movie poster for when poster is small
 */

const Poster = (props: iPosterProps) => {
  const {
    path,
    title,
    width: _width,
    ranking,
    onPress,
    accolade,
    predictionType,
    styles,
  } = props;
  const { width: windowWidth } = useWindowDimensions();
  const { date } = useCategory();
  const isHistory = !!date;

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
        {isHistory && accolade && predictionType ? (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: -10,
              margin: theme.posterMargin,
              zIndex: 1,
            }}
          >
            <AccoladeTag
              accolade={accolade}
              type={predictionType}
              small={width < windowWidth / 10}
            />
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
