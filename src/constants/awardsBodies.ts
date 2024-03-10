import { AwardsBody } from '../models';

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
  [AwardsBody.PGA]: 'PGA',
  [AwardsBody.SAG]: 'SAG',
  [AwardsBody.WGA]: 'Writers Guild',
  [AwardsBody.COMMUNITY]: 'Award Expert Community',
};

export const SORTED_AWARDS_BODIES = [
  AwardsBody.ACADEMY_AWARDS,
  AwardsBody.SAG,
  AwardsBody.PGA,
  AwardsBody.BAFTA,
  AwardsBody.CRITICS_CHOICE,
  AwardsBody.GOLDEN_GLOBES,
  AwardsBody.COMMUNITY,
];

export const AWARDS_BODY_TO_PLURAL_STRING: {
  [key in AwardsBody]: string;
} = {
  ...AWARDS_BODY_TO_STRING,
  [AwardsBody.ACADEMY_AWARDS]: 'Academy Awards',
  [AwardsBody.GOLDEN_GLOBES]: 'Golden Globes',
};
