// create component called LastUpdatedText
import React from 'react';
import { View } from 'react-native';
import { Body } from '../Text';

const LastUpdatedText = ({
  lastUpdated,
  isDisabled,
}: {
  lastUpdated: string;
  isDisabled?: boolean;
}) => {
  if (isDisabled || lastUpdated === 'Invalid Date') return null;
  return (
    <View
      style={{
        position: 'absolute',
        top: -20,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Body>{`Last Updated: ${lastUpdated}`}</Body>
    </View>
  );
};

export default LastUpdatedText;
