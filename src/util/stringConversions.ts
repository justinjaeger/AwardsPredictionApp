import { AwardsBody, CategoryName } from '../API';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../constants/awardsBodies';
import { getAwardsBodyCategories } from '../constants/categories';

/**
 * "2022 Academy Awards (Nominations)"
 */
export const eventToString = (awardsBody: AwardsBody, year: number) => {
  const ab = AWARDS_BODY_TO_PLURAL_STRING[AwardsBody[awardsBody]];
  const y = year;
  return y + ' ' + ab;
};

/**
 * "Best Picture 2022 Academy Awards (Nominations)"
 */
export const fullEventToString = (
  awardsBody: AwardsBody,
  year: number,
  categoryName: CategoryName,
) => {
  const categoryList = getAwardsBodyCategories(awardsBody, year);
  const event = eventToString(awardsBody, year);
  return 'Best' + ' ' + categoryList[categoryName]?.name + ' ' + event;
};
