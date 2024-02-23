import { PredictionSet, WithId } from '../models';
import { formatLastUpdated } from './formatDateTime';

export const getLastUpdatedOnPredictionSet = (
  predictionSet: WithId<PredictionSet> | undefined,
  isCommunity?: boolean,
) => {
  const iterablePredictionData = Object.values(predictionSet?.categories || {});

  const lastUpdated = isCommunity
    ? // in community all categories are updated at once
      iterablePredictionData[0]?.createdAt
    : // if personal, find the most recent updatedAt on category (bc this is for entire event)
    iterablePredictionData.length
    ? iterablePredictionData.reduce((acc: Date, prediction) => {
        const curUpdatedAt = new Date(prediction.createdAt);
        if (curUpdatedAt > acc) {
          acc = curUpdatedAt;
        }
        return acc;
      }, new Date(0))
    : undefined;

  const lastUpdatedString = lastUpdated
    ? formatLastUpdated(new Date(lastUpdated))
    : undefined;

  return lastUpdatedString;
};
