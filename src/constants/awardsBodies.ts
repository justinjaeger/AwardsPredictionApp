import academyAward from '../assets/awardsBodies/academyAwards.png';
import bafta from '../assets/awardsBodies/bafta.png';
import criticsChoice from '../assets/awardsBodies/criticsChoice.png';
import goldenGlobes from '../assets/awardsBodies/goldenGlobes.png';
import pga from '../assets/awardsBodies/pga.png';
import sag from '../assets/awardsBodies/sag.png';
import academyAwardWhite from '../assets/awardsBodies/academyAwardsWhite.png';
import baftaWhite from '../assets/awardsBodies/baftaWhite.png';
import criticsChoiceWhite from '../assets/awardsBodies/criticsChoiceWhite.png';
import goldenGlobesWhite from '../assets/awardsBodies/goldenGlobesWhite.png';
import pgaWhite from '../assets/awardsBodies/pgaWhite.png';
import sagWhite from '../assets/awardsBodies/sagWhite.png';
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
  [AwardsBody.PGA]: 'Producers Guild',
  [AwardsBody.SAG]: 'Screen Actors Guild',
  [AwardsBody.WGA]: 'Writers Guild',
};

export const SORTED_AWARDS_BODIES = [
  AwardsBody.ACADEMY_AWARDS,
  AwardsBody.BAFTA,
  AwardsBody.CRITICS_CHOICE,
  AwardsBody.GOLDEN_GLOBES,
  AwardsBody.PGA,
  AwardsBody.SAG,
];

export const AWARDS_BODY_TO_PLURAL_STRING: {
  [key in AwardsBody]: string;
} = {
  ...AWARDS_BODY_TO_STRING,
  [AwardsBody.ACADEMY_AWARDS]: 'Academy Awards',
  [AwardsBody.GOLDEN_GLOBES]: 'Golden Globes',
};

export const AWARDS_BODY_TO_IMAGE: {
  [key in AwardsBody]: any | undefined;
} = {
  [AwardsBody.ACADEMY_AWARDS]: academyAward,
  [AwardsBody.ADG]: undefined,
  [AwardsBody.ASC]: undefined,
  [AwardsBody.BAFTA]: bafta,
  [AwardsBody.CDG]: undefined,
  [AwardsBody.CRITICS_CHOICE]: criticsChoice,
  [AwardsBody.DGA]: undefined,
  [AwardsBody.GOLDEN_GLOBES]: goldenGlobes,
  [AwardsBody.HCA]: undefined,
  [AwardsBody.MAKEUP_GUILD]: undefined,
  [AwardsBody.MPSE]: undefined,
  [AwardsBody.PGA]: pga,
  [AwardsBody.SAG]: sag,
  [AwardsBody.WGA]: undefined,
};

export const AWARDS_BODY_TO_IMAGE_WHITE: {
  [key in AwardsBody]: any | undefined;
} = {
  [AwardsBody.ACADEMY_AWARDS]: academyAwardWhite,
  [AwardsBody.ADG]: undefined,
  [AwardsBody.ASC]: undefined,
  [AwardsBody.BAFTA]: baftaWhite,
  [AwardsBody.CDG]: undefined,
  [AwardsBody.CRITICS_CHOICE]: criticsChoiceWhite,
  [AwardsBody.DGA]: undefined,
  [AwardsBody.GOLDEN_GLOBES]: goldenGlobesWhite,
  [AwardsBody.HCA]: undefined,
  [AwardsBody.MAKEUP_GUILD]: undefined,
  [AwardsBody.MPSE]: undefined,
  [AwardsBody.PGA]: pgaWhite,
  [AwardsBody.SAG]: sagWhite,
  [AwardsBody.WGA]: undefined,
};
