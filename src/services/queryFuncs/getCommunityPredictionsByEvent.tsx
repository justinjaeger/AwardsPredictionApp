import { ContenderVisibility } from '../../API';
import { iEvent, iIndexedPredictionsByCategory, iPrediction } from '../../types';
import { isWithinLastMonth } from '../../util/isWithinLastMonth';
import { sortCommunityPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';

const getCommunityPredictionsByEvent = async (event: iEvent, includeHidden = false) => {
  // TODO: move this logic to lambda function. Pull directly from CommunityPredictionSet
  const eventId = event.id;
  const { data: predictionSets } = await ApiServices.getCommunityPredictionsByEvent(
    eventId,
  );
  const pSets = predictionSets?.communityPredictionSetByEventId?.items;
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
      const lastUpdated = p?.updatedAt || '';
      const isRecentPrediction = isWithinLastMonth(lastUpdated);
      const hidePrediction =
        contender.visibility === ContenderVisibility.HIDDEN && includeHidden !== true;
      // skip if contender is hidden and we don't want to include hidden
      // OR if prediction is NOT recent
      if (isRecentPrediction === false || hidePrediction) {
        return;
      }
      // TODO: after amplify push / codegen this should work
      const indexedRankings = (p?.indexedRankings
        ? JSON.parse(p?.indexedRankings)
        : {}) as { [key: number]: number };

      predictions.push({
        ranking: 0, // for community, we only care about / set indexedRankings
        indexedRankings: indexedRankings,
        visibility: contender.visibility || ContenderVisibility.VISIBLE,
        contenderId: contender.id || '',
        contenderMovie: contender.movie || undefined,
        contenderPerson: contender.person || undefined,
        contenderSong: contender.song || undefined,
      });
    });
    const sortedPredictions = sortCommunityPredictions(predictions);
    data[categoryId] = { predictions: sortedPredictions, updatedAt: ps?.updatedAt || '' };
  });
  return data;
};

export default getCommunityPredictionsByEvent;
