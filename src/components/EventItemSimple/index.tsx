import React from 'react';
import { TouchableHighlight } from 'react-native';
import COLORS from '../../constants/colors';
import { SubHeader } from '../Text';
import CustomIcon from '../CustomIcon';

const EventItemSimple = ({ onPress, title }: { onPress: () => void; title: string }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      underlayColor={COLORS.secondaryDark}
    >
      <>
        <SubHeader>{title}</SubHeader>
        <CustomIcon name="chevron-right" size={24} color={COLORS.white} />
      </>
    </TouchableHighlight>
  );
};

export default EventItemSimple;
