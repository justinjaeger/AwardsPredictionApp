import { Phase, iCategory } from '../types/api';

export const getSlotsInPhase = (
  eventPhase: Phase | undefined,
  categoryData: iCategory,
) => {
  const { slots: nomSlots, shortlistSlots, winSlots } = categoryData;
  console.log('categoryData', categoryData);
  console.log('eventPhase', eventPhase);

  if (eventPhase === undefined) {
    return nomSlots ?? 5;
  }

  return eventPhase === Phase.SHORTLIST
    ? shortlistSlots ?? 15
    : eventPhase === Phase.NOMINATION
    ? nomSlots ?? 5
    : winSlots ?? 1;
};
