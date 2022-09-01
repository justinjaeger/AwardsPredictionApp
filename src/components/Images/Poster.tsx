import React, { useState } from 'react';
import { ImageStyle, StyleProp, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import COLORS from '../../constants/colors';
import { PosterSize, POSTER_SIZE } from '../../constants/posterDimensions';
import { TMDB_IMAGE_URL } from '../../constants';
import { Body } from '../Text';

type iPosterProps = {
  title: string;
  path: string | null; // comes after TMDB_IMAGE_URL/
  size?: PosterSize; // 1 is 27*40px, defualt is 5
  onPress?: () => void;
  styles?: StyleProp<ImageStyle>;
};

const Poster = (props: iPosterProps) => {
  const { path, title, size, onPress, styles } = props;

  const [isPressed, setIsPressed] = useState<boolean>(false);

  const posterDimensions = POSTER_SIZE[size || PosterSize.MEDIUM];

  const style: StyleProp<ImageStyle> = {
    ...(styles as Record<string, unknown>),
    ...posterDimensions,
    opacity: isPressed ? 0.8 : 1,
  };

  return (
    <TouchableHighlight
      onPress={onPress || undefined}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      underlayColor={'#FFF'}
      disabled={!onPress}
      style={{ marginLeft: 10 }}
    >
      <>
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
              backgroundColor: COLORS.warning,
            }}
          >
            <Body style={{ textAlign: 'center' }}>{title}</Body>
          </View>
        )}
      </>
    </TouchableHighlight>
  );
};

export default Poster;
