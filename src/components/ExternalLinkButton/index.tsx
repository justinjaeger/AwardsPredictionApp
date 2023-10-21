import { TouchableHighlight } from 'react-native-gesture-handler';
import { Body } from '../Text';
import COLORS from '../../constants/colors';
import React from 'react';
import theme from '../../constants/theme';

const ExternalLinkButton = (props: { text: string; onPress: () => void }) => {
  const { text, onPress } = props;
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: theme.borderRadius,
        backgroundColor: COLORS.secondary,
      }}
      underlayColor={COLORS.secondaryDark}
    >
      <Body
        style={{
          fontWeight: '700',
          color: COLORS.white,
        }}
      >
        {text}
      </Body>
    </TouchableHighlight>
  );
};

export default ExternalLinkButton;
