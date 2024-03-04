import { getFloatingButtonSize } from '../components/Buttons/FloatingButton';
import { BOTTOM_TAB_HEIGHT } from '../constants';

export const getBottomHeight = (safeAreaTop: number, isPad?: boolean) =>
  BOTTOM_TAB_HEIGHT + getFloatingButtonSize(isPad) + safeAreaTop + 10;
