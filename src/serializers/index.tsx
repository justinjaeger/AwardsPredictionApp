import { ContenderVisibility, PredictionType } from '../API';
import { iPrediction } from '../types';

export const predictionsSerializer = (
  predictions: any[],
  predictionType?: PredictionType | undefined | null,
): iPrediction[] =>
  predictions.map((p) => ({
    ranking: p?.ranking || 0,
    accolade: p?.contender.accolade || undefined,
    visibility: p?.contender.visibility || ContenderVisibility.VISIBLE,
    predictionType: predictionType || PredictionType.NOMINATION,
    contenderId: p?.contenderId || '',
    // @ts-ignore - the typescript isn't this nested
    contenderMovie: p?.contender.movie || undefined,
    // @ts-ignore - the typescript isn't this nested
    contenderPerson: p?.contender.person || undefined,
    // @ts-ignore - the typescript isn't this nested
    contenderSong: p?.contender.song || undefined,
    lastUpdated: p?.updatedAt || '',
  }));
