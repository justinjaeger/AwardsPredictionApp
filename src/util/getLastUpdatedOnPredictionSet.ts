import { PredictionSet, WithId } from '../models';
import { formatLastUpdated } from './formatDateTime';

export const getLastUpdatedOnPredictionSet = (
  predictionSet: WithId<PredictionSet>,
  isCommunity?: boolean,
) => {
  const iterablePredictionData = Object.values(predictionSet?.categories || {});

  // only applies to community since all categories are updated at once
  const lastUpdated = isCommunity
    ? iterablePredictionData[0]?.createdAt || ''
    : // if personal, find the most recent updatedAt on category (bc this is for entire event)
      iterablePredictionData.reduce((acc: Date, prediction) => {
        const curUpdatedAt = new Date(prediction.createdAt);
        if (curUpdatedAt > acc) {
          acc = curUpdatedAt;
        }
        return acc;
      }, new Date(0));
  const lastUpdatedString = formatLastUpdated(new Date(lastUpdated || ''));
  return lastUpdatedString;
};
