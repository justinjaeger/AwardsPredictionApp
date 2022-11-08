import { iPrediction } from '../store/types';

export const sortPredictions = (ps: iPrediction[]) =>
  ps.sort((p1, p2) => {
    if (!p1 || !p2) return 0;
    if (p1.ranking < p2.ranking) return -1;
    return 1;
  });
