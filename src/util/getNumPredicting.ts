import { iIndexedRankings } from '../types';

export const getNumPredicting = (
  ir: iIndexedRankings,
  slots: number,
): { win: number; nom: number } => {
  const keys = Object.keys(ir);
  const nom = keys.reduce((acc, key) => {
    const num = parseInt(key, 10);
    if (num > 1 && num <= slots) {
      acc += ir[num];
    }
    return acc;
  }, 0);
  const win = ir[1] || 0;
  return { win, nom };
};
