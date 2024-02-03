// create component called LastUpdatedText
import React from 'react';
import { View } from 'react-native';
import { Body } from '../Text';
import useDevice from '../../util/device';
import COLORS from '../../constants/colors';

const LastUpdatedText = ({
  lastUpdated,
  isDisabled,
  noAbsolutePosition, // ios only
  style,
}: {
  lastUpdated: string;
  isDisabled?: boolean;
  noAbsolutePosition?: boolean;
  style?: any;
}) => {
  const { isAndroid } = useDevice();
  if (isDisabled || lastUpdated === 'Invalid Date' || !lastUpdated) return null;

  const s = noAbsolutePosition
    ? { alignSelf: 'center' }
    : {
        position: 'absolute',
        top: isAndroid ? 0 : -20,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      };
  return (
    <>
      <View style={[s, style]}>
        <Body
          style={{ color: COLORS.gray, fontWeight: '500' }}
        >{`last update: ${lastUpdated}`}</Body>
      </View>
      {noAbsolutePosition ? null : <View style={{ height: isAndroid ? 15 : 5 }} />}
    </>
  );
};

export default LastUpdatedText;
