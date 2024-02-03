import { formatLowDecimalAsPercentage } from './formatPercentage';
import { getContenderStats } from './getContenderStats';

/**
 * Gives a riskiness number for a contender
 * Must be in sync with backend!
 */
export const getContenderRiskiness = (
  numPredicting: Record<number, number>,
  slots: number,
  totalUsersPredicting: number, // derived from communityPredictionSet
): number => {
  const { numPredictingWithinSlots } = getContenderStats(numPredicting, slots);
  const percentageOfUsersPredicting = formatLowDecimalAsPercentage(
    numPredictingWithinSlots / totalUsersPredicting,
  );
  const riskiness = 100 - percentageOfUsersPredicting;
  return Math.round(riskiness * 100) / 100; // this part isn't in backend bc we do that after calculation
};
