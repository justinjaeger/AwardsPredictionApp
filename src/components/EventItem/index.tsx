import React from 'react';
import { TouchableHighlight, View, useWindowDimensions } from 'react-native';
import theme from '../../constants/theme';
import useDevice from '../../util/device';
import { hexToRgb } from '../../util/hexToRgb';
import COLORS from '../../constants/colors';
import { Body, HeaderLight, SubHeader } from '../Text';

export const EVENT_ITEM_HEIGHT = 100;

const EventItem = ({
  subtitle,
  title,
  onPress,
  bottomRightText,
  mode,
}: {
  subtitle: string;
  title: string;
  onPress: () => void;
  bottomRightText?: string;
  mode?: 'transparent' | 'solid';
}) => {
  const { width } = useWindowDimensions();
  const { isPad } = useDevice();
  const eventItemHeight = EVENT_ITEM_HEIGHT * (isPad ? 1.5 : 1);
  const isTransparent = mode === 'transparent';

  return (
    <TouchableHighlight
      style={{
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
      }}
      underlayColor={isTransparent ? COLORS.secondaryDark : COLORS.secondary}
      onPress={onPress}
    >
      <>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
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
                marginTop: 5,
                marginBottom: 10,
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
