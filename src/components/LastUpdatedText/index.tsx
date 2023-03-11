// create component called LastUpdatedText
import React from 'react';
import { View } from 'react-native';
import { Body } from '../Text';

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
    <View
      style={{
        position: 'absolute',
        top: -25,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}
    >
      <Body>{`Last Updated: ${lastUpdated}`}</Body>
    </View>
  );
};

export default LastUpdatedText;
