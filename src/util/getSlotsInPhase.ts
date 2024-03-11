import { Phase, iCategory } from '../models';

export const getSlotsInPhase = (
  eventPhase: Phase | undefined,
  categoryData: iCategory | undefined, // possible undefined for safety
  includeNominees = false, // for leaderboards, we don't just want to display one film for example
) => {
  if (!categoryData) return 5;

  const { slots: nomSlots, shortlistSlots, winSlots } = categoryData;

  if (eventPhase === undefined) {
    return nomSlots ?? 5;
  }

  return eventPhase === Phase.SHORTLIST
    ? shortlistSlots ?? 15
    : eventPhase === Phase.NOMINATION || includeNominees
    ? nomSlots ?? 5
    : winSlots ?? 1;
};
