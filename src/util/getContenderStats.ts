export type iContenderStats = {
  numPredictingWin: number;
  numPredictingWithinSlots: number;
  numPredictingWithinFiveSlots: number;
  numPredictingAnySlot: number;
};

/**
 * Gets summary data on where users are predicting a contender to be nominated
 * MUST be in sync with backend!
 */
export const getContenderStats = (
  numPredicting: Record<number, number>,
  slotsInCategory = 5,
): iContenderStats => {
  return Object.entries(numPredicting).reduce(
    (acc, [slotNum, numUsersPredicting]) => {
      const slotNumber = parseInt(slotNum, 10);

      acc.numPredictingAnySlot += numUsersPredicting;
      if (slotNumber <= slotsInCategory + 5) {
        acc.numPredictingWithinFiveSlots += numUsersPredicting;
      }
      if (slotNumber <= slotsInCategory) {
        acc.numPredictingWithinSlots += numUsersPredicting;
      }
      if (slotNumber === 1) {
        acc.numPredictingWin += numUsersPredicting;
      }
      return acc;
    },
    {
      numPredictingWin: 0,
      numPredictingWithinSlots: 0,
      numPredictingWithinFiveSlots: 0,
      numPredictingAnySlot: 0,
    },
  );
};
