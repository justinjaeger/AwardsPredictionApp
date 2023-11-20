import { BodyBold } from '../Text';
import COLORS from '../../constants/colors';
import React from 'react';
import theme from '../../constants/theme';
import { StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import useDevice from '../../util/device';

const ExternalLinkButton = ({
  text,
  onPressImmediate,
  onPressDelay,
  delay,
  style,
}: {
  text: string;
  onPressImmediate: () => void;
  onPressDelay?: () => void;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}) => {
  const { isPad, isAndroid } = useDevice();
  return (
    <TouchableHighlight
      onPress={() => {
        onPressImmediate();
        if (onPressDelay) {
          setTimeout(() => {
            onPressDelay();
          }, delay ?? (isAndroid ? 800 : 0));
        }
      }}
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          padding: isPad ? 15 : 5,
          paddingHorizontal: isPad ? 20 : 10,
          borderRadius: theme.borderRadius,
          backgroundColor: COLORS.secondaryDark,
        },
        style,
      ]}
      underlayColor={COLORS.secondaryDark}
    >
      <BodyBold
        style={{
          color: COLORS.white,
        }}
      >
        {text}
      </BodyBold>
    </TouchableHighlight>
  );
};

export default ExternalLinkButton;
