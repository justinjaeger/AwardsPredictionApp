import { AWARDS_BODY_TO_PLURAL_STRING } from '../constants/awardsBodies';
import { AwardsBody } from '../models';

/**
 * "2022 Academy Awards (Nominations)"
 */
export const eventToString = (awardsBody: AwardsBody, year: number) => {
  const ab = AWARDS_BODY_TO_PLURAL_STRING[AwardsBody[awardsBody]];
  const y = year;
  return y + ' ' + ab;
};
