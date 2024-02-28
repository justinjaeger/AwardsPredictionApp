import React from 'react';
import { TouchableHighlight } from 'react-native';
import COLORS from '../../constants/colors';
import { SubHeader } from '../Text';
import CustomIcon from '../CustomIcon';
import theme from '../../constants/theme';
import { hexToRgb } from '../../util/hexToRgb';

const EVENT_ITEM_HEIGHT = 60;

const EventItemSimple = ({ onPress, title }: { onPress: () => void; title: string }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        height: EVENT_ITEM_HEIGHT,
        paddingLeft: theme.windowMargin,
        paddingRight: theme.windowMargin,
        backgroundColor: hexToRgb(COLORS.primaryLight, 0.2),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: COLORS.primaryLight,
        borderTopWidth: 1,
        borderBottomColor: COLORS.primaryLight,
        borderBottomWidth: 1,
        marginTop: -1,
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
