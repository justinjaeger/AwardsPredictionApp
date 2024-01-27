import { iContenderStatsData } from '../screens/ContenderStats';
import { CategoryName, EventModel } from '../models';

export const getPredictedOutcomes = (
  predictions: iContenderStatsData[],
  event: EventModel,
) => {
  const allSignificantPredictions: iContenderStatsData[] = [];
  const potentialPredictions: iContenderStatsData[] = [];
  const nomPredictions: iContenderStatsData[] = [];
  const winPredictions: iContenderStatsData[] = [];

  predictions.forEach((p) => {
    const { category } = p;
    const slots = event.categories[category].slots ?? 5;
    if (p.ranking === 1) {
      winPredictions.push(p);
    }
    if (p.ranking <= slots) {
      nomPredictions.push(p);
    }
    if (p.ranking <= slots * 2) {
      potentialPredictions.push(p);
    }
    if (p.ranking <= slots * 4) {
      allSignificantPredictions.push(p);
    }
  });

  // Handle special logic here - like how we can't get nominated in both screenplay categories
  const hasBothScreenplayCategoriesAsNoms =
    potentialPredictions.filter(
      (p) =>
        p.category === CategoryName.ADAPTED_SCREENPLAY ||
        p.category === CategoryName.ORIGINAL_SCREENPLAY,
    ).length === 2;

  const hasBothScreenplayCategoriesAsPotential =
    potentialPredictions.filter(
      (p) =>
        p.category === CategoryName.ADAPTED_SCREENPLAY ||
        p.category === CategoryName.ORIGINAL_SCREENPLAY,
    ).length === 2;

  let numActorsPredictedTwiceForNom = 0;
  nomPredictions.reduce((acc: Record<number, boolean>, p) => {
    if (!p.personTmdbId) {
      return acc;
    }
    const key = p.personTmdbId + p.movieTmdbId;
    if (acc[key]) {
      numActorsPredictedTwiceForNom += 1;
    }
    acc[key] = true;
    return acc;
  }, {});

  let numActorsPredictedTwiceForPotential = 0;
  potentialPredictions.reduce((acc: Record<number, boolean>, p) => {
    if (!p.personTmdbId) {
      return acc;
    }
    const key = p.personTmdbId + p.movieTmdbId;
    if (acc[key]) {
      numActorsPredictedTwiceForPotential += 1;
    }
    acc[key] = true;
    return acc;
  }, {});

  const nomCount =
    nomPredictions.length -
    (hasBothScreenplayCategoriesAsNoms ? 1 : 0) -
    numActorsPredictedTwiceForNom;

  const potentialCount =
    potentialPredictions.length -
    (hasBothScreenplayCategoriesAsPotential ? 1 : 0) -
    numActorsPredictedTwiceForPotential;

  return {
    potentialPredictions,
    allSignificantPredictions,
    numWins: winPredictions.length,
    numNoms: nomCount,
    numPoential: potentialCount,
  };
};
