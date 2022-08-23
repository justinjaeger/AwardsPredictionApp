import { AWARDS_BODY_TO_PLURAL_STRING, EVENT_TYPE_TO_STRING } from './constants';
import { AwardsBody, Event } from '../models';

export const eventToString = (e: Event) => {
  const ab = AWARDS_BODY_TO_PLURAL_STRING[AwardsBody[e.awardsBody]];
  const et = EVENT_TYPE_TO_STRING[e.type];
  const y = e.year;
  return y + ' ' + ab + ' (' + et + ')';
};
