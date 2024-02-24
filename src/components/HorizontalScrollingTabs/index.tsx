import React from 'react';
import { ScrollView, StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import { BodyBold } from '../Text';
import COLORS from '../../constants/colors';

export const EVENT_TOP_TABS_HEIGHT = 30;

/**
 * Shows tabs within the selected event's year
 */
const HorizontalScrollingTabs = <T,>({
  options,
  onPress,
  style,
}: {
  options: { text: string; value: T; isSelected?: boolean }[];
  onPress: (value: T) => void;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <ScrollView
      horizontal
      style={[
        {
          width: '100%',
          height: EVENT_TOP_TABS_HEIGHT,
          zIndex: -1,
        },
        style,
      ]}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      showsHorizontalScrollIndicator={false}
    >
      {options.map(({ isSelected, text, value }) => {
        return (
          <TouchableHighlight
            key={'hst' + JSON.stringify(value)}
            style={{
              backgroundColor: isSelected ? COLORS.secondaryDark : COLORS.primaryLight,
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              marginLeft: 10,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              height: EVENT_TOP_TABS_HEIGHT,
            }}
            underlayColor={COLORS.secondary}
            onPress={() => onPress(value)}
          >
            <BodyBold style={{ color: COLORS.white }}>{text}</BodyBold>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
};

export default HorizontalScrollingTabs;
