import {
  CommunityHistoryPredictionSetsByEventIdAndCreatedAtQueryVariables,
  HistoryPredictionSetByUserIdAndEventIdAndCreatedAtQueryVariables,
} from '../../API';
import * as customQueries from '../../graphqlCustom/queries';
import {
  HistoryPredictionSetByUserIdAndEventIdAndCreatedAtQuery,
  CommunityHistoryPredictionSetsByEventIdAndCreatedAtQuery,
} from '../../graphqlCustom/types';
import { GraphqlAPIPublic, handleError, iApiResponse } from '../utils';

export const getPersonalHistory = async (
  eventId: string,
  userId: string,
  createdAt: Date,
): Promise<iApiResponse<HistoryPredictionSetByUserIdAndEventIdAndCreatedAtQuery>> => {
  try {
    // create date range is going to be one full day. so from 0:00 to 23:59
    const startDate = new Date(createdAt);
    const endDate = new Date(createdAt);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const { data: maybePreSets, errors } = await GraphqlAPIPublic<
      HistoryPredictionSetByUserIdAndEventIdAndCreatedAtQuery,
      HistoryPredictionSetByUserIdAndEventIdAndCreatedAtQueryVariables
    >(customQueries.historyPredictionSetByUserIdAndEventIdAndCreatedAt, {
      userId,
      eventIdCreatedAt: {
        between: [
          { eventId, createdAt: startDate.toISOString() }, // createdAt is also optional
          { eventId, createdAt: endDate.toISOString() },
        ],
      },
    });
    if (!maybePreSets?.historyPredictionSetByUserIdAndEventIdAndCreatedAt) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: maybePreSets };
  } catch (err) {
    return handleError('error getting personal history', err);
  }
};

export const getCommunityHistory = async (
  eventId: string,
  createdAt: Date,
): Promise<iApiResponse<CommunityHistoryPredictionSetsByEventIdAndCreatedAtQuery>> => {
  try {
    // create date range is going to be one full day. so from 0:00 to 23:59
    const startDate = new Date(createdAt);
    const endDate = new Date(createdAt);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const { data: maybePreSets, errors } = await GraphqlAPIPublic<
      CommunityHistoryPredictionSetsByEventIdAndCreatedAtQuery,
      CommunityHistoryPredictionSetsByEventIdAndCreatedAtQueryVariables
    >(customQueries.communityHistoryPredictionSetsByEventIdAndCreatedAt, {
      eventId,
      createdAt: {
        // convert to ISO string
        between: [startDate.toISOString(), endDate.toISOString()],
      },
    });
    if (!maybePreSets?.communityHistoryPredictionSetsByEventIdAndCreatedAt) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: maybePreSets };
  } catch (err) {
    return handleError('error getting community history', err);
  }
};
