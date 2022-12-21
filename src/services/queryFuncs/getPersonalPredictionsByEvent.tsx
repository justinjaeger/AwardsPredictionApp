import { ContenderVisibility } from '../../API';
import { iIndexedPredictionsByCategory } from '../../types';
import { sortPersonalPredictions } from '../../util/sortPredictions';
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
      visibility: p?.contender.visibility || ContenderVisibility.VISIBLE,
      contenderId: p?.contenderPredictionsId || '',
      contenderMovie: p?.contender.movie || undefined,
      contenderPerson: p?.contender.person || undefined,
      contenderSong: p?.contender.song || undefined,
    }));
    const sortedPredictions = sortPersonalPredictions(predictions);
    data[categoryId] = sortedPredictions;
  });
  return data;
};

export default getPersonalPredictionsByEvent;
