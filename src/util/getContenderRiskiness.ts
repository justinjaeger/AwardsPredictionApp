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
  // console.log('numPredicting', numPredicting);
  const { numPredictingWithinSlots } = getContenderStats(numPredicting, slots);
  // console.log('numPredictingWithinSlots', numPredictingWithinSlots);
  const percentageOfUsersPredicting = formatLowDecimalAsPercentage(
    numPredictingWithinSlots / totalUsersPredicting,
  );
  // console.log('percentageOfUsersPredicting', percentageOfUsersPredicting);
  const riskiness = 100 - percentageOfUsersPredicting;
  // console.log('riskiness', riskiness);
  return Math.round(riskiness * 100) / 100; // this part isn't in backend bc we do that after calculation
};
