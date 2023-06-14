import { ContenderVisibility, PredictionType } from '../../API';
import Serializers from '../../serializers';
import { iIndexedPredictionsByCategory } from '../../types';
import { sortPersonalPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';

const getPersonalPredictionsByEvent = async (
  eventId: string,
  userId: string | undefined,
) => {
  if (!userId) return {};
  const { data: predictionSets } = await ApiServices.getPersonalPredictionsByEvent(
    eventId,
    userId,
  );
  const pSets = predictionSets?.predictionSetByUserIdAndEventId?.items;
  if (!pSets) return {};
  // Format the prediction sets
  const data: iIndexedPredictionsByCategory = {};
  pSets.forEach((ps) => {
    const categoryId = ps?.categoryId || '';
    const predictions = Serializers.predictionsSerializer(ps?.predictions?.items || []);
    const sortedPredictions = sortPersonalPredictions(predictions);
    data[categoryId] = { predictions: sortedPredictions, updatedAt: ps?.updatedAt || '' };
  });
  return data;
};

export default getPersonalPredictionsByEvent;
