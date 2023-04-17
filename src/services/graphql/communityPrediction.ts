import { CommunityPredictionSetByEventIdQueryVariables } from '../../API';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';
import * as customQueries from '../../graphqlCustom/queries';
import { CommunityPredictionSetByEventIdQuery } from '../../graphqlCustom/types';

// we want to get the first 10 of each category in an event
export const getCommunityPredictionsByEvent = async (
  eventId: string,
): Promise<iApiResponse<CommunityPredictionSetByEventIdQuery>> => {
  try {
    const { data: maybePreSets, errors } = await GraphqlAPI<
      CommunityPredictionSetByEventIdQuery,
      CommunityPredictionSetByEventIdQueryVariables
    >(customQueries.communityPredictionSetByEventId, {
      eventId,
    });
    if (!maybePreSets?.communityPredictionSetByEventId) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: maybePreSets };
  } catch (err) {
    return handleError('error getting community prediction sets by event', err);
  }
};
