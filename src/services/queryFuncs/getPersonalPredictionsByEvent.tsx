import { iIndexedPredictionsByCategory } from '../../store/types';
import { sortPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';

const getPersonalPredictionsByEvent = async (eventId: string, userId: string) => {
  const { data: predictionSets } = await ApiServices.getPersonalPredictionsByEvent(
    eventId,
    userId,
  );
  const pSets = predictionSets?.listPredictionSets?.items;
  if (!pSets) return; // handle in some other way?
  // Format the prediction sets
  const data: iIndexedPredictionsByCategory = {};
  pSets.forEach((ps) => {
    const categoryId = ps?.predictionSetCategoryId || '';
    const predictions = (ps?.predictions?.items || []).map((p) => ({
      ranking: p?.ranking || 0,
      contenderId: p?.contenderPredictionsId || '',
      contenderMovie: p?.contender.movie || undefined,
      contenderPerson: p?.contender.person || undefined,
      contenderSongId: p?.contender.contenderSongId,
    }));
    const sortedPredictions = sortPredictions(predictions);
    data[categoryId] = sortedPredictions;
  });
  return data;
};

export default getPersonalPredictionsByEvent;
