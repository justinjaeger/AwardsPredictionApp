import { iNumberPredicting } from '../types';

/**
 * assigns a point value based on where users are ranking the film in their lists
 */
export const getContenderRank = (numPredicting: iNumberPredicting): number => {
  /**
   * 1-5 is between 1.0 and 0.5 points
   * 6-10 are all 0.5
   * 11-15 are all 0.2
   * 15-20 are all 0.1
   */
  return Object.entries(numPredicting).reduce((acc, [key, val]) => {
    const num = parseInt(key, 10);

    const factor =
      num <= 5 ? (10 - num + 1) / 10 : num <= 10 ? 0.5 : num <= 15 ? 0.2 : 0.1;
    const value = val * factor;

    acc += value;
    return acc;
  }, 0);
};
