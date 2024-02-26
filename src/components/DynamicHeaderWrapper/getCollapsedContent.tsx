import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { SubHeader } from '../Text';
import CustomIcon from '../CustomIcon';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';

const TITLE_WHEN_COLLAPSED_HEIGHT = 40;

export const getCollapsedContent = (
  titleWhenCollapsed: string,
  disableBack?: boolean,
  onPressBack?: () => void,
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
          <TouchableHighlight
            onPress={onPressBack}
            style={{
              width: 30,
              borderRadius: 100,
              left: theme.windowMargin,
              position: 'absolute',
            }}
            underlayColor={COLORS.secondaryLight}
          >
            <CustomIcon name="chevron-left-outline" size={30} color={COLORS.white} />
          </TouchableHighlight>
        )}
        <SubHeader style={{ textAlign: 'center' }}>{titleWhenCollapsed}</SubHeader>
      </View>
    ),
  };
};
