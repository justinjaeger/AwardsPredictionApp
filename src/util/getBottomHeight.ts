import { getHeaderBasicHeight } from '../components/HeaderBasic';
import { BOTTOM_TAB_HEIGHT } from '../constants';

export const getBottomHeight = (safeAreaTop: number, headerTitle: string) => {
  const headerHeight = getHeaderBasicHeight(headerTitle);
  return BOTTOM_TAB_HEIGHT + headerHeight + safeAreaTop + 5;
};
