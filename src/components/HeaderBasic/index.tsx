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
  return (
    <>
      {safeAreaTop ? <View style={{ paddingTop: top, backgroundColor }} /> : null}
      <View
        style={[
          {
            width: '100%',
            alignItems: 'center',
            justifyContent: disableBack ? 'center' : 'flex-start',
            height: getHeaderBasicHeight(title),
            backgroundColor,
            flexDirection: 'row',
          },
          style,
        ]}
      >
        {disableBack ? null : (
          <View style={{ left: theme.windowMargin, marginRight: theme.windowMargin * 2 }}>
            <BackButton onPress={onPressBack} />
          </View>
        )}
        <SubHeader style={{ textAlign: disableBack ? 'center' : 'left' }}>
          {title}
        </SubHeader>
        <View />
      </View>
    </>
  );
};

export default HeaderBasic;
