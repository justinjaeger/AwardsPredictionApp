import { CategoryName, CategoryType, Phase } from '../types/api';

export type iCategoryData = {
  name: string;
  type: CategoryType;
  slots?: number; // 5 by default
  hideUntilShortlisted?: boolean;
};

export const CATEGORY_TYPE_TO_STRING: { [key in CategoryType]: string } = {
  [CategoryType.FILM]: 'Film',
  [CategoryType.PERFORMANCE]: 'Performance',
  [CategoryType.SONG]: 'Song',
};

export const PHASE_TO_STRING: { [key in Phase]: string } = {
  [Phase.WINNER]: 'Winner',
  [Phase.NOMINATION]: 'Nomination',
  [Phase.SHORTLIST]: 'Shortlist',
  [Phase.CLOSED]: 'Closed',
};

export const PHASE_TO_STRING_PLURAL: { [key in Phase]: string } = {
  [Phase.WINNER]: 'Winners',
  [Phase.NOMINATION]: 'Nominations',
  [Phase.SHORTLIST]: 'Shortlists',
  [Phase.CLOSED]: 'Closed',
};

export const ORDERED_CATEGORIES = [
  CategoryName.PICTURE,
  CategoryName.INDIE_PICTURE,
  CategoryName.COMEDY_PICTURE,
  CategoryName.DIRECTOR,
  CategoryName.FEMALE_DIRECTOR,
  CategoryName.MALE_DIRECTOR,
  CategoryName.ENSEMBLE,
  CategoryName.ACTRESS,
  CategoryName.COMEDY_ACTRESS,
  CategoryName.ACTOR,
  CategoryName.COMEDY_ACTOR,
  CategoryName.SUPPORTING_ACTRESS,
  CategoryName.SUPPORTING_ACTOR,
  CategoryName.SCREENPLAY,
  CategoryName.ORIGINAL_SCREENPLAY,
  CategoryName.ADAPTED_SCREENPLAY,
  CategoryName.INTERNATIONAL,
  CategoryName.DOCUMENTARY,
  CategoryName.ANIMATED,
  CategoryName.CINEMATOGRAPHY,
  CategoryName.EDITING,
  CategoryName.PRODUCTION_DESIGN,
  CategoryName.COSTUMES,
  CategoryName.MAKEUP,
  CategoryName.VISUAL_EFFECTS,
  CategoryName.SOUND,
  CategoryName.SCORE,
  CategoryName.SONG,
  CategoryName.SHORT_DOCUMENTARY,
  CategoryName.SHORT_ANIMATED,
  CategoryName.SHORT_LIVE_ACTION,
  CategoryName.ACTING_ACHIEVEMENT,
  CategoryName.ACTION_PICTURE,
  CategoryName.ANIMATED_PERFORMANCE,
  CategoryName.BLOCKBUSTER,
  CategoryName.BREAKTHROUGH,
  CategoryName.BRITISH_PICTURE,
  CategoryName.DEBUT,
  CategoryName.FIRST_SCREENPLAY,
  CategoryName.RISING_STAR,
  CategoryName.YOUNG_ACTOR,
];
