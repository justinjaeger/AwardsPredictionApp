const isWithinLastMonth = (lastUpdated) => {
  const lastUpdatedDate = new Date(lastUpdated);
  const now = new Date();
  const diff = now.getTime() - lastUpdatedDate.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays <= 30;
};

const getContenderRank = (numPredicting) => {
  /**
   * 1-5 is between 10 and 5 points
   * 6-10 are all 5
   * 11-15 are all 2
   * 15-20 are all 1
   */
  return Object.entries(numPredicting).reduce((acc, [key, val]) => {
    const num = parseInt(key, 10);

    const factor = num <= 5 ? 10 - num + 1 : num <= 10 ? 5 : num <= 15 ? 2 : 1;

    const value = val * factor;

    acc += value;
    return acc;
  }, 0);
};

/**
   INPUT: EventStatus:
   - NOMS_STAGING # before nominations go public
   - NOMS_LIVE # when everyone can predict nominations
   - WINS_STAGING # when nominations are being announced + prepared
   - WINS_LIVE # when everyone can predict wins
   - ARCHIVED # when winners have been announced and such

    OUTPUT: PredictionType
    - NOMINATION
    - WIN
 */
const eventStatusToPredictionType = (eventStatus) =>
  ['NOMS_LIVE', 'NOMS_STAGING'].includes(eventStatus) ? 'NOMINATION' : 'WIN';

module.exports = { isWithinLastMonth, getContenderRank, eventStatusToPredictionType };
