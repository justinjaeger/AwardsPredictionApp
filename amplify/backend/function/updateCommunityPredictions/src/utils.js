const isWithinLastMonth = (lastUpdated) => {
  const lastUpdatedDate = new Date(lastUpdated);
  const now = new Date();
  const diff = now.getTime() - lastUpdatedDate.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays <= 30;
};

/**
 * IMPORTANT: returns null if the event should NOT be recorded
 * eventStatus = enum EventStatus {
    NOMS_STAGING # before nominations go public
    NOMS_LIVE # when everyone can predict nominations
    WINS_STAGING # when nominations are being announced + prepared
    WINS_LIVE # when everyone can predict wins
    ARCHIVED # when winners have been announced and such
   }} 
 */
const getPredictionType = (eventStatus) => {
  switch (eventStatus) {
    case 'NOMS_STAGING':
    case 'WINS_STAGING':
    case 'ARCHIVED':
      return null;
    case 'NOMS_LIVE':
      return 'NOMINATION';
    case 'WINS_LIVE':
      return 'WIN';
    default:
      return 'NOMINATION';
  }
};

module.exports = { isWithinLastMonth, getPredictionType };
