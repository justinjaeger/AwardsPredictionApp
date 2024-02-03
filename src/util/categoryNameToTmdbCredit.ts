import { CategoryName, IMovieCategoryCredit } from '../models';

export const categoryNameToTmdbCredit = (
  categoryName: CategoryName,
  credits: Record<IMovieCategoryCredit, string[]>,
) => {
  switch (categoryName) {
    case CategoryName.DIRECTOR:
      return credits.directing;
    case CategoryName.SCREENPLAY:
      return credits.screenplay;
    case CategoryName.CINEMATOGRAPHY:
      return credits.cinematography;
    case CategoryName.COSTUMES:
      return credits.costumes;
    case CategoryName.EDITING:
      return credits.editing;
    case CategoryName.PRODUCTION_DESIGN:
      return credits.productionDesign;
    case CategoryName.SCORE:
      return credits.score;
    case CategoryName.VISUAL_EFFECTS:
      return credits.vfx;
  }
};
