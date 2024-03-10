import { TouchableOpacity } from 'react-native';
import React from 'react';
import theme from '../../constants/theme';
import COLORS from '../../constants/colors';
import { useHeaderDropdown } from '../../context/HeaderDropdownContext';
import CustomIcon from '../CustomIcon';
import { hexToRgb } from '../../util/hexToRgb';
import Header from './Header';

export const HEADER_HEIGHT = 40;

const HeaderListTypeDropdown = ({
  eventType,
  setEventType,
  heightAboveDropdown,
}: {
  eventType: string;
  setEventType: (v: 'list' | 'prediction') => void;
  heightAboveDropdown: number;
}) => {
  const { openDropdown } = useHeaderDropdown();
  const options = [
    {
      text: 'Predictions',
      value: 'prediction',
      isSelected: eventType === 'prediction',
    },
    {
      text: 'Lists',
      value: 'list',
      isSelected: eventType === 'list',
    },
  ];
  const selectedOption = options.find((o) => o.isSelected);
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderRadius: theme.borderRadius,
        borderWidth: 1,
        borderColor: hexToRgb(COLORS.primaryLight, 0.5),
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        height: HEADER_HEIGHT,
      }}
      activeOpacity={0.5}
      onPress={() => {
        openDropdown(
          options.map((o) => ({
            ...o,
            onPress: () => {
              // @ts-ignore
              setEventType(o.value);
            },
          })),
          { top: heightAboveDropdown + HEADER_HEIGHT - 5, left: theme.windowMargin },
        );
      }}
    >
      <Header style={{ marginRight: 5 }} text={selectedOption?.text ?? ''} />
      <CustomIcon name="arrow-ios-downward-outline" size={20} color="white" />
    </TouchableOpacity>
  );
};

export default HeaderListTypeDropdown;
