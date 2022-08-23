import { AwardsBody, CategoryName, EventType, Event } from '../models';

export const EVENT_TYPE_TO_STRING: {
  [key in EventType]: string;
} = {
  [EventType.WIN]: 'Wins',
  [EventType.NOMINATION]: 'Nominations',
};

export const AWARDS_BODY_TO_STRING: {
  [key in AwardsBody]: string;
} = {
  [AwardsBody.ACADEMY_AWARDS]: 'Academy Award',
  [AwardsBody.ADG]: 'Art Directors Guild',
  [AwardsBody.ASC]: 'American Society of Cinematographers',
  [AwardsBody.BAFTA]: 'British Academy of Film and Television',
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

export const AWARDS_BODY_TO_PLURAL_STRING: {
  [key in AwardsBody]: string;
} = {
  ...AWARDS_BODY_TO_STRING,
  [AwardsBody.ACADEMY_AWARDS]: 'Academy Awards',
  [AwardsBody.GOLDEN_GLOBES]: 'Golden Globes',
};

type iCategoryObject = { [key in CategoryName]: string | undefined };

export const getCategoryList = (event: Event): iCategoryObject => {
  switch (event.awardsBody) {
    case AwardsBody.ACADEMY_AWARDS:
      // This is just an example of how to use this when an awards body updates their category list
      if (event.year > 2022) {
        return ACADEMY_AWARDS_CATEGORIES_V1;
      }
      return ACADEMY_AWARDS_CATEGORIES_V1;
    case AwardsBody.GOLDEN_GLOBES:
      return GOLDEN_GLOBE_CATEGORIES_V1;
    default:
      return ALL_CATEGORIES;
  }
};

const ALL_CATEGORIES: iCategoryObject = {
  [CategoryName.PICTURE]: undefined,
  [CategoryName.DIRECTOR]: undefined,
  [CategoryName.ACTOR]: undefined,
  [CategoryName.ACTRESS]: undefined,
  [CategoryName.SUPPORTING_ACTOR]: undefined,
  [CategoryName.SUPPORTING_ACTRESS]: undefined,
  [CategoryName.ORIGINAL_SCREENPLAY]: undefined,
  [CategoryName.ADAPTED_SCREENPLAY]: undefined,
  [CategoryName.INTERNATIONAL]: undefined,
  [CategoryName.DOCUMENTARY]: undefined,
  [CategoryName.ANIMATED]: undefined,
  [CategoryName.CINEMATOGRAPHY]: undefined,
  [CategoryName.EDITING]: undefined,
  [CategoryName.PRODUCTION_DESIGN]: undefined,
  [CategoryName.COSTUMES]: undefined,
  [CategoryName.MAKEUP]: undefined,
  [CategoryName.VISUAL_EFFECTS]: undefined,
  [CategoryName.SOUND]: undefined,
  [CategoryName.SCORE]: undefined,
  [CategoryName.SONG]: undefined,
  [CategoryName.SHORT_DOCUMENTARY]: undefined,
  [CategoryName.SHORT_ANIMATED]: undefined,
  [CategoryName.SHORT_LIVE_ACTION]: undefined,
  [CategoryName.ACTING_ACHIEVEMENT]: undefined,
  [CategoryName.ACTION_PICTURE]: undefined,
  [CategoryName.ANIMATED_PERFORMANCE]: undefined,
  [CategoryName.BLOCKBUSTER]: undefined,
  [CategoryName.BREAKTHROUGH]: undefined,
  [CategoryName.BRITISH_PICTURE]: undefined,
  [CategoryName.COMEDY_ACTOR]: undefined,
  [CategoryName.COMEDY_ACTRESS]: undefined,
  [CategoryName.COMEDY_PICTURE]: undefined,
  [CategoryName.DEBUT]: undefined,
  [CategoryName.ENSEMBLE]: undefined,
  [CategoryName.FEMALE_DIRECTOR]: undefined,
  [CategoryName.FIRST_SCREENPLAY]: undefined,
  [CategoryName.INDIE_PICTURE]: undefined,
  [CategoryName.MALE_DIRECTOR]: undefined,
  [CategoryName.RISING_STAR]: undefined,
  [CategoryName.SCIFI_HORROR_PICTURE]: undefined,
  [CategoryName.SCREENPLAY]: undefined,
  [CategoryName.YOUNG_ACTOR]: undefined,
};

const ACADEMY_AWARDS_CATEGORIES_V1: iCategoryObject = {
  [CategoryName.PICTURE]: 'Picture',
  [CategoryName.DIRECTOR]: 'Director',
  [CategoryName.ACTOR]: 'Actor',
  [CategoryName.ACTRESS]: 'Actress',
  [CategoryName.SUPPORTING_ACTOR]: 'Supporting Actor',
  [CategoryName.SUPPORTING_ACTRESS]: 'Supporting Actress',
  [CategoryName.ORIGINAL_SCREENPLAY]: 'Original Screenplay',
  [CategoryName.ADAPTED_SCREENPLAY]: 'Adapted Screenplay',
  [CategoryName.INTERNATIONAL]: 'International Feature',
  [CategoryName.DOCUMENTARY]: 'Documentary Feature',
  [CategoryName.ANIMATED]: 'Animated Feature',
  [CategoryName.CINEMATOGRAPHY]: 'Cinematography',
  [CategoryName.EDITING]: 'Editing',
  [CategoryName.PRODUCTION_DESIGN]: 'Production Design',
  [CategoryName.COSTUMES]: 'Costumes',
  [CategoryName.MAKEUP]: 'Makeup and Hair',
  [CategoryName.VISUAL_EFFECTS]: 'Visual Effects',
  [CategoryName.SOUND]: 'Sound',
  [CategoryName.SCORE]: 'Original Score',
  [CategoryName.SONG]: 'Original Song',
  [CategoryName.SHORT_DOCUMENTARY]: 'Documentary Short',
  [CategoryName.SHORT_ANIMATED]: 'Animated Short',
  [CategoryName.SHORT_LIVE_ACTION]: 'Live Action Short',
  SCREENPLAY: undefined,
  ENSEMBLE: undefined,
  COMEDY_PICTURE: undefined,
  COMEDY_ACTOR: undefined,
  COMEDY_ACTRESS: undefined,
  ACTION_PICTURE: undefined,
  SCIFI_HORROR_PICTURE: undefined,
  YOUNG_ACTOR: undefined,
  RISING_STAR: undefined,
  DEBUT: undefined,
  FIRST_SCREENPLAY: undefined,
  BRITISH_PICTURE: undefined,
  ANIMATED_PERFORMANCE: undefined,
  BLOCKBUSTER: undefined,
  ACTING_ACHIEVEMENT: undefined,
  FEMALE_DIRECTOR: undefined,
  MALE_DIRECTOR: undefined,
  INDIE_PICTURE: undefined,
  BREAKTHROUGH: undefined,
};

const GOLDEN_GLOBE_CATEGORIES_V1: iCategoryObject = {
  [CategoryName.PICTURE]: 'Motion Picture - Drama',
  [CategoryName.COMEDY_PICTURE]: 'Motion Picture - Musical or Comedy',
  [CategoryName.DIRECTOR]: 'Director',
  [CategoryName.ACTOR]: 'Actor - Drama',
  [CategoryName.ACTRESS]: 'Actress - Drama',
  [CategoryName.COMEDY_ACTOR]: 'Actor - Musical or Comedy',
  [CategoryName.COMEDY_ACTRESS]: 'Actress - Musical or Comedy',
  [CategoryName.SUPPORTING_ACTOR]: 'Supporting Actor',
  [CategoryName.SUPPORTING_ACTRESS]: 'Supporting Actress',
  [CategoryName.SCREENPLAY]: 'Screenplay',
  [CategoryName.INTERNATIONAL]: 'Motion Picture - Foreign Language',
  [CategoryName.ANIMATED]: 'Motion Picture - Animated',
  [CategoryName.SCORE]: 'Original Score',
  [CategoryName.SONG]: 'Original Song',
  ORIGINAL_SCREENPLAY: undefined,
  ADAPTED_SCREENPLAY: undefined,
  DOCUMENTARY: undefined,
  EDITING: undefined,
  CINEMATOGRAPHY: undefined,
  PRODUCTION_DESIGN: undefined,
  COSTUMES: undefined,
  MAKEUP: undefined,
  VISUAL_EFFECTS: undefined,
  SOUND: undefined,
  SHORT_ANIMATED: undefined,
  SHORT_DOCUMENTARY: undefined,
  SHORT_LIVE_ACTION: undefined,
  ENSEMBLE: undefined,
  ACTION_PICTURE: undefined,
  SCIFI_HORROR_PICTURE: undefined,
  YOUNG_ACTOR: undefined,
  RISING_STAR: undefined,
  DEBUT: undefined,
  FIRST_SCREENPLAY: undefined,
  BRITISH_PICTURE: undefined,
  ANIMATED_PERFORMANCE: undefined,
  BLOCKBUSTER: undefined,
  ACTING_ACHIEVEMENT: undefined,
  FEMALE_DIRECTOR: undefined,
  MALE_DIRECTOR: undefined,
  INDIE_PICTURE: undefined,
  BREAKTHROUGH: undefined,
};
