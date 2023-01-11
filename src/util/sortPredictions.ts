import { iPrediction } from '../types';
import { getContenderRank } from './getContenderRank';

export const sortPersonalPredictions = (ps: iPrediction[]) =>
  ps.sort((p1, p2) => {
    if (!p1 || !p2) return 0;
    if (p1.ranking < p2.ranking) return -1;
    return 1;
  });

// NOTE: We're never using this func except in the lambda functions, so it's sort of here for reference
export const sortCommunityPredictionsByIndexedRankings = (ps: iPrediction[]) =>
  ps.sort((p1, p2) => {
    if (!p1 || !p2 || !p1.indexedRankings || !p2.indexedRankings) return 0;
    const rank1 = getContenderRank(p1.indexedRankings);
    const rank2 = getContenderRank(p2.indexedRankings);
    if (rank2 < rank1) return -1;
    return 1;
  });

// NOTE: ranking field is set when the lambda function updateCommunityPredictions runs
export const sortCommunityPredictionsByRanking = (ps: iPrediction[]) =>
  ps.sort((p1, p2) => {
    if (p1.ranking < p2.ranking) return -1;
    return 1;
  });
