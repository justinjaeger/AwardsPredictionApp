import { iPrediction } from '../../store/types';
import { sortPersonalPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';

const getPersonalPredictionsByCategory = async (
  categoryId: string,
  userId: string,
): Promise<iPrediction[]> => {
  const { data: predictionSets } = await ApiServices.getPersonalPredictionsByCategory(
    categoryId,
    userId,
  );
  const ps = predictionSets?.listPredictionSets?.items;
  if (!ps) {
    console.error('no prediction set found becuase of an error');
    return [];
  }
  if (ps.length > 2) {
    console.error(
      'for some reason, multiple prediction sets were found for the same category, which is an error',
    );
  }
  const predictionSet = ps[0];
  if (!predictionSet?.predictions) return [];
  // Format the prediction set as iPrediction
  const predictions = predictionSet.predictions.items.map((p) => ({
    ranking: p?.ranking || 0,
    contenderId: p?.contenderPredictionsId || '',
    contenderMovie: p?.contender.movie || undefined,
    contenderPerson: p?.contender.person || undefined,
    contenderSongId: p?.contender.contenderSongId,
  }));
  return sortPersonalPredictions(predictions);
};

export default getPersonalPredictionsByCategory;
