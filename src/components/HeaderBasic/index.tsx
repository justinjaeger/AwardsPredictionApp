import React from 'react';
import { View } from 'react-native';
import { SubHeader } from '../Text';
import BackButton from '../HeaderComponents/BackButton';
import theme from '../../constants/theme';

const BASE_HEIGHT = 40;

export const getHeaderBasicHeight = (title: string) => {
  const numExtraLines = title.split('\n').length - 1;
  return BASE_HEIGHT + numExtraLines * 15;
};

const HeaderBasic = ({
  title,
  disableBack,
}: {
  title: string;
  disableBack?: boolean;
}) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: getHeaderBasicHeight(title),
      }}
    >
      {disableBack ? null : (
        <View style={{ left: theme.windowMargin, position: 'absolute' }}>
          <BackButton />
        </View>
      )}
      <SubHeader style={{ textAlign: 'center' }}>{title}</SubHeader>
    </View>
  );
};

export default HeaderBasic;
