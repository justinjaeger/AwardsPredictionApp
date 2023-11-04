export const getNumPredicting = (
  numPredicting: Record<number, number>,
  slots: number,
): { win: number; nom: number; listed: number } => {
  const keys = Object.keys(numPredicting);
  const listed = keys.reduce((acc, key) => {
    const num = parseInt(key, 10);
    acc += numPredicting[num];
    return acc;
  }, 0);
  const nom = keys.reduce((acc, key) => {
    const num = parseInt(key, 10);
    if (num <= slots) {
      acc += numPredicting[num];
    }
    return acc;
  }, 0);
  const win = numPredicting[1] || 0;
  return { win, nom, listed };
};

export const getTotalNumPredicting = (numPredicting: Record<number, number>) =>
  Object.values(numPredicting || {}).reduce((acc, numPredicting) => {
    return acc + numPredicting;
  }, 0);
