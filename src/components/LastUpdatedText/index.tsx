// create component called LastUpdatedText
import React from 'react';
import { View } from 'react-native';
import { Body } from '../Text';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';

const LastUpdatedText = ({
  lastUpdated,
  isDisabled,
  style,
}: {
  lastUpdated: string;
  isDisabled?: boolean;
  style?: any;
}) => {
  if (isDisabled || lastUpdated === 'Invalid Date' || !lastUpdated) return null;

  return (
    <>
      <View
        style={[
          { alignSelf: 'flex-end', paddingRight: theme.windowMargin, marginTop: 5 },
          style,
        ]}
      >
        <Body
          style={{ color: COLORS.gray, fontWeight: '500' }}
        >{`last update: ${lastUpdated}`}</Body>
      </View>
    </>
  );
};

export default LastUpdatedText;
