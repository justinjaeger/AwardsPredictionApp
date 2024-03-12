import { Phase } from '../models';

export const getContenderMeetsAccolade = (
  currentAccolade: Phase,
  contenderAccolade: Phase,
) => {
  if (currentAccolade === Phase.SHORTLIST) {
    return [Phase.SHORTLIST, Phase.NOMINATION, Phase.WINNER].includes(contenderAccolade);
  }
  if (currentAccolade === Phase.NOMINATION) {
    return [Phase.NOMINATION, Phase.WINNER].includes(contenderAccolade);
  }
  if (currentAccolade === Phase.WINNER) {
    return [Phase.WINNER].includes(contenderAccolade);
  }
  return false;
};
