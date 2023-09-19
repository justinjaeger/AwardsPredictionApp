import {
  CommunityPredictionSetByCategoryIdQuery,
  CommunityPredictionSetByCategoryIdQueryVariables,
  CommunityPredictionSetByEventIdQueryVariables,
} from '../../API';
import { GraphqlAPIPublic, handleError, iApiResponse } from '../utils';
import * as customQueries from '../../graphqlCustom/queries';
import { CommunityPredictionSetByEventIdQuery } from '../../graphqlCustom/types';

export const getCommunityPredictionsByCategory = async (
  categoryId: string,
): Promise<iApiResponse<CommunityPredictionSetByCategoryIdQuery>> => {
  try {
    // Get all prediction sets matching params (should only be one)
    const { data, errors } = await GraphqlAPIPublic<
      CommunityPredictionSetByCategoryIdQuery,
      CommunityPredictionSetByCategoryIdQueryVariables
    >(customQueries.communityPredictionSetByCategoryId, {
      categoryId,
    });
    if (!data?.communityPredictionSetByCategoryId) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data };
  } catch (err) {
    return handleError('error getting prediction set', err);
  }
};

// we want to get the first 10 of each category in an event
export const getCommunityPredictionsByEvent = async (
  eventId: string,
): Promise<iApiResponse<CommunityPredictionSetByEventIdQuery>> => {
  try {
    const { data: maybePreSets, errors } = await GraphqlAPIPublic<
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
