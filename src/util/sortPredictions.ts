import { iPrediction } from '../types';
import { getContenderRank } from './getContenderRank';

export const sortPersonalPredictions = (ps: iPrediction[]) =>
  ps.sort((p1, p2) => {
    if (!p1 || !p2) return 0;
    if (p1.ranking < p2.ranking) return -1;
    return 1;
  });

export const sortCommunityPredictions = (ps: iPrediction[]) =>
  ps.sort((p1, p2) => {
    if (!p1 || !p2 || !p1.communityRankings || !p2.communityRankings) return 0;
    const rank1 = getContenderRank(p1.communityRankings);
    const rank2 = getContenderRank(p2.communityRankings);
    if (rank2 < rank1) return -1;
    return 1;
  });
