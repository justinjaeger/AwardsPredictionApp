import React from 'react';
import { Animated, ImageStyle, StyleProp, TouchableOpacity, View } from 'react-native';
import COLORS from '../../constants/colors';
import { TMDB_IMAGE_URL } from '../../constants';
import { Body } from '../Text';
import theme from '../../constants/theme';

type iAnimatedPosterProps = {
  title: string;
  path: string | null; // comes after TMDB_IMAGE_URL/
  animatedWidth: Animated.Value;
  animatedHeight: Animated.Value;
  ranking?: number;
  onPress?: () => void;
  styles?: StyleProp<ImageStyle>;
};

/**
 * TODO: add a blank image and blank movie poster for when poster is small
 */

const AnimatedPoster = (props: iAnimatedPosterProps) => {
  const { path, title, animatedWidth, animatedHeight, ranking, onPress, styles } = props;

  const style: any = {
    ...(styles as Record<string, unknown>),
    width: animatedWidth,
    height: animatedHeight,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    margin: theme.posterMargin,
  };

  return (
    <View>
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
          <TouchableOpacity
            onPress={onPress || undefined}
            disabled={!onPress}
            activeOpacity={0.6}
          >
            <Animated.Image
              style={style as Record<string, unknown>}
              source={{
                uri: `${TMDB_IMAGE_URL}/${path}`,
              }}
            />
          </TouchableOpacity>
        ) : (
          <Animated.View
            style={{
              ...(style as Record<string, unknown>),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: theme.posterMargin,
            }}
          >
            <Body
              style={{
                textAlign: 'center',
                color: COLORS.primaryLightest,
                fontSize: 10,
              }}
            >
              {title}
            </Body>
          </Animated.View>
        )}
      </>
    </View>
  );
};

export default AnimatedPoster;
