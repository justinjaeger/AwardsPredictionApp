// create component called LastUpdatedText
import React from 'react';
import { View } from 'react-native';
import { Body } from '../Text';
import useDevice from '../../util/device';

const LastUpdatedText = ({
  lastUpdated,
  isDisabled,
  style,
}: {
  lastUpdated: string;
  isDisabled?: boolean;
  style?: any;
}) => {
  const { isAndroid } = useDevice();
  if (isDisabled || lastUpdated === 'Invalid Date' || !lastUpdated) return null;
  return (
    <View
      style={{
        position: 'absolute',
        top: isAndroid ? 0 : -25,
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
