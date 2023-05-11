import { ContenderVisibility, PredictionType } from '../API';
import { iPrediction } from '../types';

const predictionSerializer = (
  p: any,
  predictionType?: PredictionType | undefined | null,
): iPrediction => {
  // Have to parse this because the field is a json stringified object
  const indexedRankings = (p?.indexedRankings ? JSON.parse(p?.indexedRankings) : {}) as {
    [key: number]: number;
  };
  return {
    ranking: p?.ranking || 0,
    accolade: p?.contender.accolade || undefined,
    visibility: p?.contender.visibility || ContenderVisibility.VISIBLE,
    predictionType: predictionType || PredictionType.NOMINATION,
    contenderId: p?.contenderId || '',
    contenderMovie: p?.contender.movie || undefined,
    contenderPerson: p?.contender.person || undefined,
    contenderSong: p?.contender.song || undefined,
    lastUpdated: p?.updatedAt || '',
    indexedRankings, // only on community predictions
  };
};

const predictionsSerializer = (
  predictions: any[],
  predictionType?: PredictionType | undefined | null,
): iPrediction[] => predictions.map((p) => predictionSerializer(p, predictionType));

const historyPredictionSerializer = (
  p: any,
  predictionType?: PredictionType | undefined | null,
): iPrediction => {
  const contender = p?.contender;
  // Have to parse this because the field is a json stringified object
  const indexedRankings = (p?.indexedRankings ? JSON.parse(p?.indexedRankings) : {}) as {
    [key: number]: number;
  };
  return {
    ranking: p?.ranking || 0,
    accolade: contender.accolade || undefined,
    predictionType: predictionType || PredictionType.NOMINATION,
    indexedRankings: indexedRankings,
    visibility: contender.visibility || ContenderVisibility.VISIBLE,
    contenderId: contender.id || '',
    contenderMovie: contender.movie || undefined,
    contenderPerson: contender.person || undefined,
    contenderSong: contender.song || undefined,
  };
};

const historyPredictionsSerializer = (
  predictions: any[],
  predictionType?: PredictionType | undefined | null,
): iPrediction[] =>
  predictions.map((p) => historyPredictionSerializer(p, predictionType));

const Serializers = {
  predictionSerializer,
  predictionsSerializer,
  historyPredictionSerializer,
  historyPredictionsSerializer,
};

export default Serializers;
