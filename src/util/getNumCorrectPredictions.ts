import { Phase, iPrediction } from '../models';
import { getContenderRiskiness } from './getContenderRiskiness';

export const getPredictionStatsFromPredictions = ({
  predictions,
  communityPredictions,
  totalUsersPredicting,
  slots,
  contenderIdsToPhase,
  phase,
}: {
  predictions: iPrediction[];
  communityPredictions: iPrediction[];
  totalUsersPredicting: number | undefined;
  slots: number;
  contenderIdsToPhase:
    | {
        [contenderId: string]: Phase;
      }
    | undefined;
  phase: Phase | undefined;
}) => {
  // for leaderboard: get riskiness of all contenders that user earned points for
  const contenderIdToRiskiness: { [cId: string]: number } = {};
  let numCorrectPredictions = 0;
  predictions.forEach(({ contenderId, ranking }) => {
    const accolade = contenderIdsToPhase?.[contenderId] === phase;
    const userDidPredictWithinSlots = ranking && ranking <= slots;
    const predictionWasCorrect = !!(userDidPredictWithinSlots && accolade);
    numCorrectPredictions += predictionWasCorrect ? 1 : 0;
    if (!predictionWasCorrect) {
      return;
    }
    const numPredictingContender =
      (communityPredictions ?? []).find((p) => p.contenderId === contenderId)
        ?.numPredicting || {};
    const riskiness = getContenderRiskiness(
      numPredictingContender,
      slots,
      totalUsersPredicting || 0,
    );
    contenderIdToRiskiness[contenderId] = riskiness;
  });
  return { contenderIdToRiskiness, numCorrectPredictions };
};
