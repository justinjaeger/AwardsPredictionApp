import { ContenderVisibility } from '../../API';
import { iIndexedPredictionsByCategory } from '../../types';
import { sortPersonalPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';

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
    const predictions = (ps?.predictions?.items || []).map((p) => ({
      ranking: p?.ranking || 0,
      accolade: p?.contender.accolade || undefined,
      visibility: p?.contender.visibility || ContenderVisibility.VISIBLE,
      contenderId: p?.contenderId || '',
      contenderMovie: p?.contender.movie || undefined,
      contenderPerson: p?.contender.person || undefined,
      contenderSong: p?.contender.song || undefined,
      lastUpdated: p?.updatedAt || '',
    }));
    const sortedPredictions = sortPersonalPredictions(predictions);
    data[categoryId] = { predictions: sortedPredictions, updatedAt: ps?.updatedAt || '' };
  });
  return data;
};

export default getPersonalHistory;
