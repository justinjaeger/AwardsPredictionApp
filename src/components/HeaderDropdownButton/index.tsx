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
            borderColor: COLORS.primaryLight,
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
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
          <CustomIcon name="arrow-ios-downward-outline" size={20} color="white" />
          <SubHeader style={{ marginLeft: 5 }}>{selectedOption?.text ?? ''}</SubHeader>
        </TouchableOpacity>
        {/* {showDropdown ? (
          <>
            <View
              style={{
                position: 'absolute',
                top: height,
                right: 0,
                zIndex: 2,
              }}
            >
              {options.map((o) => (
                <TouchableHighlight
                  onPress={() => {
                    onSelect(o.value);
                    setShowDropdown(false);
                  }}
                  style={{
                    padding: 10,
                    minWidth: 60,
                    backgroundColor: o.isSelected ? COLORS.primaryLight : COLORS.primary,
                  }}
                >
                  <BodyBold>{o.text}</BodyBold>
                </TouchableHighlight>
              ))}
            </View>
          </>
        ) : null} */}
      </View>
    </>
  );
};

export default HeaderDropdownButton;
