import { AwardsBody } from '../models';

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
