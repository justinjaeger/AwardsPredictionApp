import { iNumberPredicting } from '../store/types';

export const getNumPredicting = (np: iNumberPredicting): { win: number; nom: number } => {
  const keys = Object.keys(np);
  const nom = keys.reduce((acc, key) => {
    const num = parseInt(key, 10);
    if (num > 1 && num <= 10) {
      acc += np[num];
    }
    return acc;
  }, 0);
  const win = np[1] || 0;
  return { win, nom };
};
