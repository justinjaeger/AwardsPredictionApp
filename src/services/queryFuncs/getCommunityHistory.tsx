import { iEvent, iIndexedPredictionsByCategory, iPrediction } from '../../types';
import { sortCommunityPredictionsByRanking } from '../../util/sortPredictions';
import ApiServices from '../graphql';
import Serializers from '../../serializers';

const getCommunityHistory = async (event: iEvent, createdAt: Date) => {
  // TODO: move this logic to lambda function. Pull directly from CommunityPredictionSet
  const eventId = event.id;
  const { data: predictionSets } = await ApiServices.getCommunityHistory(
    eventId,
    createdAt,
  );
  const pSets =
    predictionSets?.communityHistoryPredictionSetsByEventIdAndCreatedAt?.items;
  if (!pSets) return; // handle in some other way?
  // Format the prediction sets
  const data: iIndexedPredictionsByCategory = {};
  pSets.forEach((ps) => {
    const categoryId = ps?.categoryId || '';
    const predictions: iPrediction[] = [];
    // populate predictions array
    (ps?.predictions?.items || []).forEach((p) => {
      const contender = p?.contender;
      if (!contender) return;
      predictions.push(Serializers.historyPredictionSerializer(p, ps?.type));
    });
    const sortedPredictions = sortCommunityPredictionsByRanking(predictions);
    data[categoryId] = { predictions: sortedPredictions, updatedAt: ps?.updatedAt || '' };
  });
  return data;
};

export default getCommunityHistory;
