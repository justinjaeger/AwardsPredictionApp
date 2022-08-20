import { AwardsBody, CategoryName, EventType } from '../models';

export const EVENT_TYPE_TO_STRING: {
  [key in EventType]: string;
} = {
  [EventType.WIN]: 'wins',
  [EventType.NOMINATION]: 'Nominations',
};

export const AWARDS_BODY_TO_STRING: {
  [key in AwardsBody]: string;
} = {
  [AwardsBody.ACADEMY_AWARDS]: 'Academy Award',
  [AwardsBody.ADG]: 'Art Directors Guild',
  [AwardsBody.ASC]: 'American Society of Cinematographers',
  [AwardsBody.BAFTA]: 'BAFTA',
  [AwardsBody.CDG]: 'Costume Designers Guild',
  [AwardsBody.CRITICS_CHOICE]: 'Critics Choice',
  [AwardsBody.DGA]: 'Directors Guild',
  [AwardsBody.GOLDEN_GLOBES]: 'Golden Globe',
  [AwardsBody.HCA]: 'Hollywood Critics Association',
  [AwardsBody.MAKEUP_GUILD]: 'Make-Up Artists and Hair Stylists Guild',
  [AwardsBody.MPSE]: 'Motion Picture Sound Editors',
  [AwardsBody.PGA]: 'Producers Guild',
  [AwardsBody.SAG]: 'Screen Actors Guild',
  [AwardsBody.WGA]: 'Writers Guild',
};

export const getCategoryList = (
  awardsBody: AwardsBody,
  year: number,
): Map<CategoryName, string> => {
  switch (awardsBody) {
    case AwardsBody.ACADEMY_AWARDS:
      // This is just an example of how to use this when an awards body updates their category list
      if (year > 2022) {
        return ACADEMY_AWARDS_CATEGORIES_V1;
      }
      return ACADEMY_AWARDS_CATEGORIES_V1;
    case AwardsBody.GOLDEN_GLOBES:
      return GOLDEN_GLOBE_CATEGORIES_V1;
    default:
      return new Map();
  }
};

const ACADEMY_AWARDS_CATEGORIES_V1 = new Map<CategoryName, string>([
  [CategoryName.PICTURE, 'Picture'],
  [CategoryName.DIRECTOR, 'Director'],
  [CategoryName.ACTOR, 'Actor'],
  [CategoryName.ACTRESS, 'Actress'],
  [CategoryName.SUPPORTING_ACTOR, 'Supporting Actor'],
  [CategoryName.SUPPORTING_ACTRESS, 'Supporting Actress'],
  [CategoryName.ORIGINAL_SCREENPLAY, 'Original Screenplay'],
  [CategoryName.ADAPTED_SCREENPLAY, 'Adapted Screenplay'],
  [CategoryName.CINEMATOGRAPHY, 'Cinematography'],
  [CategoryName.EDITING, 'Editing'],
  [CategoryName.PRODUCTION_DESIGN, 'Production Design'],
  [CategoryName.COSTUMES, 'Costumes'],
  [CategoryName.MAKEUP, 'Makeup and Hair'],
  [CategoryName.VISUAL_EFFECTS, 'Visual Effects'],
  [CategoryName.SOUND, 'Sound'],
  [CategoryName.SCORE, 'Original Score'],
  [CategoryName.SONG, 'Original Song'],
  [CategoryName.INTERNATIONAL, 'International Film'],
  [CategoryName.ANIMATED, 'Animated Feature'],
  [CategoryName.SHORT_DOCUMENTARY, 'Documentary Short'],
  [CategoryName.SHORT_ANIMATED, 'Animated Short'],
  [CategoryName.SHORT_LIVE_ACTION, 'Live Action Short'],
]);

const GOLDEN_GLOBE_CATEGORIES_V1 = new Map<CategoryName, string>([
  [CategoryName.PICTURE, 'Motion Picture - Drama'],
  [CategoryName.COMEDY_PICTURE, 'Motion Picture - Musical or Comedy'],
  [CategoryName.INTERNATIONAL, 'Motion Picture - Foreign Language'],
  [CategoryName.ANIMATED, 'Motion Picture - Animated'],
  [CategoryName.DIRECTOR, 'Director'],
  [CategoryName.ACTOR, 'Actor - Drama'],
  [CategoryName.ACTRESS, 'Actress - Drama'],
  [CategoryName.COMEDY_ACTOR, 'Actor - Musical or Comedy'],
  [CategoryName.COMEDY_ACTRESS, 'Actress - Musical or Comedy'],
  [CategoryName.SUPPORTING_ACTOR, 'Supporting Actor'],
  [CategoryName.SUPPORTING_ACTRESS, 'Supporting Actress'],
  [CategoryName.SCREENPLAY, 'Screenplay'],
  [CategoryName.SCORE, 'Original Score'],
  [CategoryName.SONG, 'Original Song'],
]);
