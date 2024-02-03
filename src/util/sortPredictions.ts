import { iContenderStatsData } from '../screens/ContenderStats';
import { iPrediction } from '../models';

export const sortPredictions = (ps: iPrediction[]) =>
  [...ps].sort((p1, p2) => {
    if (!p1 || !p2) return 0;
    if (p1.ranking < p2.ranking) return -1;
    return 1;
  });

export const sortByLikelihood = (ps: iContenderStatsData[]) =>
  [...ps].sort((p1, p2) => {
    if (!p1 || !p2) return 0;
    if (p1.likelihood > p2.likelihood) return -1;
    return 1;
  });
