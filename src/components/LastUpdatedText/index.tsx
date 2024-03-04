// create component called LastUpdatedText
import React from 'react';
import { View } from 'react-native';
import { Body } from '../Text';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';

export const LAST_UPDATED_SECTION_HEIGHT = 20;

const LastUpdatedText = ({
  lastUpdated,
  style,
}: {
  lastUpdated: string | undefined;
  style?: any;
}) => {
  const renderBlank = !lastUpdated || lastUpdated === 'Invalid Date';

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
        {!renderBlank ? (
          <Body
            style={{ color: COLORS.gray, fontWeight: '500' }}
          >{`last update: ${lastUpdated}`}</Body>
        ) : null}
      </View>
    </>
  );
};

export default LastUpdatedText;
