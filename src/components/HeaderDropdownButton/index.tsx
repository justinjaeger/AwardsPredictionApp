import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SubHeader } from '../Text';
import CustomIcon from '../CustomIcon';
import theme from '../../constants/theme';
import COLORS from '../../constants/colors';
import {
  iHeaderDropdownPosition,
  useHeaderDropdown,
} from '../../context/HeaderDropdownContext';
import { hexToRgb } from '../../util/hexToRgb';

const HeaderDropdownButton = ({
  options,
  onSelect,
  position,
  height = 40,
}: {
  options: { text: string; value: any; isSelected?: boolean }[];
  onSelect: (value: any) => void;
  position: iHeaderDropdownPosition;
  height?: number;
}): React.ReactElement => {
  const { openDropdown } = useHeaderDropdown();

  const selectedOption = options.find((o) => o.isSelected);

  return (
    <>
      <View
        style={{
          position: 'relative',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderRadius: theme.borderRadius,
            borderWidth: 1,
            borderColor: hexToRgb(COLORS.primaryLight, 0.5),
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 4,
            height,
          }}
          activeOpacity={0.5}
          onPress={() => {
            openDropdown(
              options.map((o) => ({
                ...o,
                onPress: () => {
                  onSelect(o.value);
                },
              })),
              { ...position, top: position.top + height },
            );
          }}
        >
          <SubHeader style={{ marginRight: 5 }}>{selectedOption?.text ?? ''}</SubHeader>
          <CustomIcon name="arrow-ios-downward-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HeaderDropdownButton;
