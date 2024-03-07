import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { SubHeader } from '../Text';
import BackButton from '../HeaderComponents/BackButton';
import theme from '../../constants/theme';
import COLORS from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BASE_HEIGHT = 40;

export const getHeaderBasicHeight = (title: string) => {
  const numExtraLines = title.split('\n').length - 1;
  return BASE_HEIGHT + numExtraLines * 16;
};

const HeaderBasic = ({
  title,
  disableBack,
  style,
  safeAreaTop,
  onPressBack,
  backgroundColor = COLORS.secondaryDark,
}: {
  title: string;
  disableBack?: boolean;
  style?: StyleProp<ViewStyle>;
  safeAreaTop?: boolean;
  onPressBack?: () => void;
  backgroundColor?: string;
}) => {
  const { top } = useSafeAreaInsets();
  const height = getHeaderBasicHeight(title);
  const shouldCenterText = disableBack || height <= BASE_HEIGHT;
  return (
    <View style={{ width: '100%' }}>
      {safeAreaTop ? <View style={{ paddingTop: top, backgroundColor }} /> : null}
      {disableBack || !shouldCenterText ? null : (
        <View
          style={{
            position: 'absolute',
            left: theme.windowMargin,
            marginRight: theme.windowMargin * 2,
            zIndex: 2,
          }}
        >
          <BackButton onPress={onPressBack} />
        </View>
      )}
      <View
        style={[
          {
            width: '100%',
            alignItems: 'center',
            justifyContent: shouldCenterText ? 'center' : 'flex-start',
            height,
            backgroundColor,
            flexDirection: 'row',
            zIndex: 1,
          },
          style,
        ]}
      >
        {shouldCenterText ? null : (
          <View style={{ left: theme.windowMargin, marginRight: theme.windowMargin * 2 }}>
            <BackButton onPress={onPressBack} />
          </View>
        )}
        <SubHeader style={{ textAlign: shouldCenterText ? 'center' : 'left' }}>
          {title}
        </SubHeader>
        <View />
      </View>
    </View>
  );
};

export default HeaderBasic;
