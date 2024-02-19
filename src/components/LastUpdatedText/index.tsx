// create component called LastUpdatedText
import React from 'react';
import { View } from 'react-native';
import { Body } from '../Text';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';

export const LAST_UPDATED_SECTION_HEIGHT = 20;

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
          {
            alignSelf: 'flex-end',
            paddingRight: theme.windowMargin,
            height: LAST_UPDATED_SECTION_HEIGHT,
            justifyContent: 'center',
          },
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
