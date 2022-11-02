import { iNumberPredicting } from '../context/PredictionContext';

export const getContenderRank = (numPredicting: iNumberPredicting): number => {
  const { predictingWin, predictingNom, predictingUnranked } = numPredicting;

  const pointsForWin = 3;
  const pointsForNom = 2;
  const pointsForUnranked = 1;

  return (
    predictingWin * pointsForWin +
    predictingNom * pointsForNom +
    predictingUnranked * pointsForUnranked
  );
};
