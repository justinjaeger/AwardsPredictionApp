import React from 'react';
import { View } from 'react-native';
import { SubHeader } from '../Text';
import BackButton from '../HeaderComponents/BackButton';
import theme from '../../constants/theme';

const TITLE_WHEN_COLLAPSED_HEIGHT = 40;

export const getCollapsedContent = (
  titleWhenCollapsed: string,
  disableBack?: boolean,
) => {
  const numExtraLines = titleWhenCollapsed.split('\n').length - 1;
  return {
    height: TITLE_WHEN_COLLAPSED_HEIGHT + numExtraLines * 15,
    component: (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {disableBack ? null : (
          <View style={{ left: theme.windowMargin, position: 'absolute' }}>
            <BackButton />
          </View>
        )}
        <SubHeader style={{ textAlign: 'center' }}>{titleWhenCollapsed}</SubHeader>
      </View>
    ),
  };
};
