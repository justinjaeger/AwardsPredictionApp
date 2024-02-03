import COLORS from '../constants/colors';
import { Phase } from '../models';

export const getAccoladeColor = (phase: Phase): string => {
  return phase === Phase.SHORTLIST
    ? '#db7e53'
    : phase === Phase.NOMINATION
    ? '#9da3b0'
    : phase === Phase.WINNER
    ? '#ebb12a'
    : COLORS.primary;
};
