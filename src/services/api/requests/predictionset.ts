import { CategoryName, PredictionSet, WithId, iPredictions } from '../../../types/api';
import api from '../api';

/**
 * If wanting a specific date, pass yyyymmdd. Else, will default to returning the MOST RECENT.
 * Pass categoryName to return just a single category.
 */
export const getPredictionSet = async ({
  userId,
  eventId,
  yyyymmdd,
  categoryName,
}: {
  userId: string;
  eventId: string;
  yyyymmdd?: number;
  categoryName?: CategoryName;
}) => {
  let queryString = '?';
  if (categoryName) {
    queryString += `categoryName=${categoryName}`;
  }
  if (yyyymmdd) {
    if (queryString !== '?') {
      queryString += '&';
    }
    queryString += `yyyymmdd=${yyyymmdd}`;
  }

  return await api.get<WithId<PredictionSet>>(
    `predictionsets/${userId}/${eventId}${queryString === '?' ? '' : queryString}`,
  );
};

/**
 * Updates a single category that the user is predicting with new array of predictions
 */
type iUpdatePredictionSetPayload = {
  eventId: string;
  categoryName: CategoryName;
  predictions: iPredictions; // user passes all predictions with request
};
export const updatePredictionSet = async (payload: iUpdatePredictionSetPayload) => {
  return await api.post<undefined, iUpdatePredictionSetPayload>(
    'predictionsets',
    payload,
  );
};
