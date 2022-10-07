import { EVENT_TYPE_TO_STRING } from '../constants';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../constants/awardsBodies';
import { getAwardsBodyCategories } from '../constants/categories';
import { AwardsBody, CategoryName, EventType } from '../models';

/**
 * "2022 Academy Awards (Nominations)"
 */
export const eventToString = (
  awardsBody: AwardsBody,
  eventType: EventType,
  year: number,
) => {
  const ab = AWARDS_BODY_TO_PLURAL_STRING[AwardsBody[awardsBody]];
  const et = EVENT_TYPE_TO_STRING[eventType];
  const y = year;
  return y + ' ' + ab + ' (' + et + ')';
};

/**
 * "Best Picture 2022 Academy Awards (Nominations)"
 */
export const fullEventToString = (
  awardsBody: AwardsBody,
  eventType: EventType,
  year: number,
  categoryName: CategoryName,
) => {
  const categoryList = getAwardsBodyCategories(awardsBody, year);
  const event = eventToString(awardsBody, eventType, year);
  return 'Best' + ' ' + categoryList[categoryName]?.name + ' ' + event;
};
