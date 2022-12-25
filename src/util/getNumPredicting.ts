import { iNumberPredicting } from '../types';

export const getNumPredicting = (
  np: iNumberPredicting,
  slots: number,
): { win: number; nom: number } => {
  const keys = Object.keys(np);
  const nom = keys.reduce((acc, key) => {
    const num = parseInt(key, 10);
    if (num > 1 && num <= slots) {
      acc += np[num];
    }
    return acc;
  }, 0);
  const win = np[1] || 0;
  return { win, nom };
};
