import { TouchableHighlight } from 'react-native-gesture-handler';
import { BodyBold } from '../Text';
import COLORS from '../../constants/colors';
import React from 'react';
import theme from '../../constants/theme';
import { StyleProp, ViewStyle } from 'react-native';

const ExternalLinkButton = ({
  text,
  onPress,
  style,
}: {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          paddingHorizontal: 10,
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
