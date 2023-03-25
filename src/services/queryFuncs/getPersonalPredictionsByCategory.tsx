import { ContenderVisibility, PredictionType } from '../../API';
import { iIndexedPredictionsByCategory } from '../../types';
import { sortPersonalPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';

const getPersonalPredictionsByCategory = async (
  userId: string | undefined,
  categoryId: string,
) => {
  if (!userId) return {};
  const {
    data: predictionSets,
  } = await ApiServices.getPersonalPredictionsByCategoryRequest(userId, categoryId);
  const pSets = predictionSets?.predictionSetByUserIdAndCategoryId?.items;
  if (!pSets) return {};
  // Format the prediction sets
  const data: iIndexedPredictionsByCategory = {};
  pSets.forEach((ps) => {
    const predictions = (ps?.predictions?.items || []).map((p) => ({
      ranking: p?.ranking || 0,
      accolade: p?.contender.accolade || undefined,
      visibility: p?.contender.visibility || ContenderVisibility.VISIBLE,
      predictionType: ps?.type || PredictionType.NOMINATION,
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

export default getPersonalPredictionsByCategory;
