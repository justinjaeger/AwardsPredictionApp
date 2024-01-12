import React from 'react';
import {
  StyleProp,
  TouchableHighlight,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import theme from '../../constants/theme';
import useDevice from '../../util/device';
import { hexToRgb } from '../../util/hexToRgb';
import COLORS from '../../constants/colors';
import { Body, HeaderLight, SubHeader } from '../Text';

export const EVENT_ITEM_HEIGHT = 80;

const EventItem = ({
  subtitle,
  title,
  onPress,
  bottomRightText,
  mode,
  style,
}: {
  subtitle: string;
  title: string;
  onPress: () => void;
  bottomRightText?: string;
  mode?: 'transparent' | 'solid';
  style?: StyleProp<ViewStyle>;
}) => {
  const { width } = useWindowDimensions();
  const { isPad } = useDevice();
  const eventItemHeight = EVENT_ITEM_HEIGHT * (isPad ? 1.5 : 1);
  const isTransparent = mode === 'transparent';

  return (
    <TouchableHighlight
      style={[
        {
          marginLeft: theme.windowMargin,
          flexDirection: 'row',
          height: eventItemHeight,
          backgroundColor: isTransparent
            ? 'transparent'
            : hexToRgb(COLORS.secondaryDark, 1),
          borderRadius: theme.borderRadius,
          borderWidth: 1,
          borderColor: COLORS.white,
          width: (isPad ? width / 2 : width) - theme.windowMargin * 2,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      underlayColor={isTransparent ? COLORS.secondaryDark : COLORS.secondary}
      onPress={onPress}
    >
      <>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: 10,
          }}
        >
          <View style={{ justifyContent: 'flex-start' }}>
            <SubHeader>{subtitle}</SubHeader>
            <HeaderLight
              style={{
                color: COLORS.white,
                fontWeight: '700',
              }}
            >
              {title}
            </HeaderLight>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Body
              style={{
                color: isTransparent ? COLORS.gray : COLORS.white,
                fontWeight: '600',
              }}
            >
              {bottomRightText ?? ''}
            </Body>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};

export default EventItem;
