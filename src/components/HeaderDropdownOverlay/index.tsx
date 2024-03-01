import React from 'react';
import { TouchableHighlight, View, useWindowDimensions } from 'react-native';
import { SubHeader } from '../Text';
import theme from '../../constants/theme';
import COLORS from '../../constants/colors';
import { useHeaderDropdown } from '../../context/HeaderDropdownContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Used to render a backdrop to the year dropdown when focused
 */
const HeaderDropdownOverlay = (): React.ReactElement => {
  const { width, height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const { showDropdown, dropdownOptions, position, closeDropdown } = useHeaderDropdown();

  return showDropdown ? (
    <>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width,
          height,
          backgroundColor: 'black',
          opacity: 0.3,
          zIndex: 1,
          elevation: 1,
        }}
        onTouchEnd={() => closeDropdown()}
      />
      <View
        style={{
          position: 'absolute',
          borderRadius: theme.borderRadius,
          zIndex: 2,
          elevation: 2,
          ...position,
          top: position.top + top + 3,
        }}
      >
        {dropdownOptions.map((o, i) => (
          <TouchableHighlight
            key={'y-dropdown' + o.text}
            onPress={() => {
              o.onPress();
              closeDropdown();
            }}
            style={{
              padding: 10,
              minWidth: 100,
              backgroundColor: o.isSelected ? COLORS.secondaryDark : COLORS.primary,
              borderTopLeftRadius: i === 0 ? theme.borderRadius : 0,
              borderTopRightRadius: i === 0 ? theme.borderRadius : 0,
              borderBottomLeftRadius:
                i === dropdownOptions.length - 1 ? theme.borderRadius : 0,
              borderBottomRightRadius:
                i === dropdownOptions.length - 1 ? theme.borderRadius : 0,
            }}
            underlayColor={COLORS.secondary}
          >
            <SubHeader>{o.text}</SubHeader>
          </TouchableHighlight>
        ))}
      </View>
    </>
  ) : (
    <></>
  );
};

export default HeaderDropdownOverlay;
