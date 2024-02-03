import { CategoryName, EventModel, Phase } from '../models';
import { getBiggestPhaseThatHasHappened } from './getBiggestPhaseThatHasHappened';

export const getCategoryIsHidden = (
  event: EventModel,
  categoryName: CategoryName,
): boolean => {
  const categoryData = event.categories[categoryName];
  if (!categoryData) {
    return false;
  }

  const { isHidden, isHiddenBeforeNoms, isHiddenBeforeShortlist } = categoryData;

  if (isHidden) {
    return true;
  }

  const biggestPhaseThatHasHappened = getBiggestPhaseThatHasHappened(event, categoryName);
  const shortlistHasNotHappened = biggestPhaseThatHasHappened === undefined;
  const nomsHaveNotHappened = [undefined, Phase.SHORTLIST].includes(
    biggestPhaseThatHasHappened,
  );

  if (isHiddenBeforeShortlist && shortlistHasNotHappened) {
    return true;
  }
  if (isHiddenBeforeNoms && nomsHaveNotHappened) {
    return true;
  }

  return false;
};
