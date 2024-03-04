export const getNumPostersInRow = (slots: number) => {
  return slots % 4 === 0 ? 4 : slots % 6 === 0 ? 6 : 5;
};
