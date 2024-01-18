import COLORS from '../constants/colors';
import { Phase } from '../types/api';

export const getAccoladeColor = (phase: Phase) => {
  return phase === Phase.SHORTLIST
    ? '#db7e53'
    : phase === Phase.NOMINATION
    ? '#9da3b0'
    : phase === Phase.WINNER
    ? '#ebb12a'
    : COLORS.primary;
};
