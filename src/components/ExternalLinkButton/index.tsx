import { TouchableHighlight } from 'react-native-gesture-handler';
import { BodyBold } from '../Text';
import COLORS from '../../constants/colors';
import React from 'react';
import theme from '../../constants/theme';
import { StyleProp, ViewStyle } from 'react-native';
import useDevice from '../../util/device';

const ExternalLinkButton = ({
  text,
  onPress,
  style,
}: {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const { isPad } = useDevice();
  return (
    <TouchableHighlight
      onPress={onPress}
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
