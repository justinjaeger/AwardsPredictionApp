import COLORS from '../constants/colors';
import { Phase } from '../types/api';

export const getAccoladeColor = (phase: Phase) => {
  return phase === Phase.SHORTLIST
    ? '#EFA96A'
    : phase === Phase.NOMINATION
    ? '#c4c5cc'
    : phase === Phase.WINNER
    ? '#ffd04d'
    : COLORS.primary;
};
