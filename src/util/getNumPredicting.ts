export const getNumPredicting = (
  numPredicting: Record<number, number>,
  slots: number,
): { win: number; nom: number } => {
  const keys = Object.keys(numPredicting);
  const nom = keys.reduce((acc, key) => {
    const num = parseInt(key, 10);
    if (num <= slots) {
      acc += numPredicting[num];
    }
    return acc;
  }, 0);
  const win = numPredicting[1] || 0;
  return { win, nom };
};

export const getTotalNumPredicting = (numPredicting: Record<number, number>) =>
  Object.values(numPredicting || {}).reduce((acc, numPredicting) => {
    return acc + numPredicting;
  }, 0);

/**
 * Display bars based on what place people are predicting it in
 * 1
 * 2-5
 * 6-10
 * 11-20
 */
export const getPredictionStats = (
  numPredicting: Record<number, number>,
): {
  one: number;
  twoThroughFive: number;
  sixThroughTen: number;
  elevenThroughTwenty: number;
} => {
  const keys = Object.keys(numPredicting);
  let one = 0;
  let twoThroughFive = 0;
  let sixThroughTen = 0;
  let elevenThroughTwenty = 0;
  keys.forEach((key) => {
    const num = parseInt(key, 10);
    if (num === 1) {
      one += 1;
    } else if (num <= 5) {
      twoThroughFive += 1;
    } else if (num <= 10) {
      sixThroughTen += 1;
    } else if (num <= 20) {
      elevenThroughTwenty += 1;
    }
  });
  return { one, twoThroughFive, sixThroughTen, elevenThroughTwenty };
};
