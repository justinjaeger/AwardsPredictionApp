import { iIndexedRankings } from '../types';

/**
 * assigns a point value based on where users are ranking the film in their lists
 */
export const getContenderRank = (numPredicting: iIndexedRankings): number => {
  /**
   * 1-5 is between 10 and 5 points
   * 6-10 are all 5
   * 11-15 are all 2
   * 15-20 are all 1
   */
  return Object.entries(numPredicting).reduce((acc, [key, val]) => {
    const num = parseInt(key, 10);

    const factor = num <= 5 ? 10 - num + 1 : num <= 10 ? 5 : num <= 15 ? 2 : 1;

    const value = val * factor;

    acc += value;
    return acc;
  }, 0);
};
