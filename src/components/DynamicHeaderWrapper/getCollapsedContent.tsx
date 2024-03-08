import React from 'react';
import HeaderBasic, { getHeaderBasicHeight } from '../HeaderBasic';

export const getCollapsedContent = (
  titleWhenCollapsed: string,
  disableBack?: boolean,
  onPressBack?: () => void,
) => {
  return {
    height: getHeaderBasicHeight(titleWhenCollapsed),
    component: (
      <HeaderBasic
        title={titleWhenCollapsed}
        disableBack={disableBack}
        backgroundColor={'transparent'}
        onPressBack={onPressBack}
      />
    ),
  };
};
