export const getContenderRank = (
  numberOfUsersPredictingWin: number,
  numberOfUsersPredictingNom: number,
  numberOfUsersPredictingUnranked: number,
): number => {
  const pointsForWin = 3;
  const pointsForNom = 2;
  const pointsForUnranked = 1;
  return (
    numberOfUsersPredictingWin * pointsForWin +
    numberOfUsersPredictingNom *
      pointsForNom *
      numberOfUsersPredictingUnranked *
      pointsForUnranked
  );
};
