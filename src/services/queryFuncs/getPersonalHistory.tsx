import { iIndexedPredictionsByCategory } from '../../types';
import { sortPersonalPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';
import Serializers from '../../serializers';

const getPersonalHistory = async (eventId: string, userId: string, createdAt: Date) => {
  const { data: predictionSets } = await ApiServices.getPersonalHistory(
    eventId,
    userId,
    createdAt,
  );
  const pSets = predictionSets?.historyPredictionSetByUserIdAndEventIdAndCreatedAt?.items;
  if (!pSets) return; // handle in some other way?
  // Format the prediction sets
  const data: iIndexedPredictionsByCategory = {};
  pSets.forEach((ps) => {
    const categoryId = ps?.categoryId || '';
    const predictions = Serializers.historyPredictionsSerializer(
      ps?.predictions?.items || [],
      ps?.type,
    );
    const sortedPredictions = sortPersonalPredictions(predictions);
    data[categoryId] = { predictions: sortedPredictions, updatedAt: ps?.updatedAt || '' };
  });
  return data;
};

export default getPersonalHistory;
