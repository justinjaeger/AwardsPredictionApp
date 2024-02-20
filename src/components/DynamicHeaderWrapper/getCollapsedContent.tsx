import React from 'react';
import { View } from 'react-native';
import { SubHeader } from '../Text';

const TITLE_WHEN_COLLAPSED_HEIGHT = 40;

export const getCollapsedContent = (titleWhenCollapsed: string) => {
  return {
    height: TITLE_WHEN_COLLAPSED_HEIGHT,
    component: (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <SubHeader style={{ textAlign: 'center' }}>{titleWhenCollapsed}</SubHeader>
      </View>
    ),
  };
};
