import { Phase, iCategory } from '../types/api';

export const getSlotsInPhase = (
  eventPhase: Phase | undefined,
  categoryData: iCategory | undefined, // possible undefined for safety
) => {
  if (!categoryData) return 5;

  const { slots: nomSlots, shortlistSlots, winSlots } = categoryData;

  if (eventPhase === undefined) {
    return nomSlots ?? 5;
  }

  return eventPhase === Phase.SHORTLIST
    ? shortlistSlots ?? 15
    : eventPhase === Phase.NOMINATION
    ? nomSlots ?? 5
    : winSlots ?? 1;
};
