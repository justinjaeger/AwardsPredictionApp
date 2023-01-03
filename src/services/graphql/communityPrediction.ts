import {
  ListCommunityPredictionSetsQuery,
  ListCommunityPredictionSetsQueryVariables,
} from '../../API';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';
import * as customQueries from '../../graphqlCustom/queries';

export const getCommunityPredictionsByEvent = async (
  eventId: string,
): Promise<iApiResponse<ListCommunityPredictionSetsQuery>> => {
  try {
    const { data: maybePreSets, errors } = await GraphqlAPI<
      ListCommunityPredictionSetsQuery,
      ListCommunityPredictionSetsQueryVariables
    >(customQueries.listCommunityPredictionSets, {
      filter: {
        eventId: { eq: eventId },
      },
    });
    if (!maybePreSets?.listCommunityPredictionSets) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success', data: maybePreSets };
  } catch (err) {
    return handleError('error getting community prediction sets by event', err);
  }
};
