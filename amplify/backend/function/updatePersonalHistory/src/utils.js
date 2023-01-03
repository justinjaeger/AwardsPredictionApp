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

module.exports = { getPredictionType };
