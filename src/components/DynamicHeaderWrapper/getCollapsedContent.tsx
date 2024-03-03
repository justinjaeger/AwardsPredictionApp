import React from 'react';
import HeaderBasic, { getHeaderBasicHeight } from '../HeaderBasic';

export const getCollapsedContent = (
  titleWhenCollapsed: string,
  disableBack?: boolean,
) => {
  return {
    height: getHeaderBasicHeight(titleWhenCollapsed),
    component: (
      <HeaderBasic
        title={titleWhenCollapsed}
        disableBack={disableBack}
        backgroundColor={'transparent'}
      />
    ),
  };
};
