// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserRole = {
  "ADMIN": "ADMIN",
  "USER": "USER"
};

const AwardsBody = {
  "ACADEMY_AWARDS": "ACADEMY_AWARDS",
  "GOLDEN_GLOBES": "GOLDEN_GLOBES",
  "CRITICS_CHOICE": "CRITICS_CHOICE",
  "BAFTA": "BAFTA",
  "HCA": "HCA",
  "PGA": "PGA",
  "SAG": "SAG",
  "DGA": "DGA",
  "WGA": "WGA",
  "ADG": "ADG",
  "MAKEUP_GUILD": "MAKEUP_GUILD",
  "CDG": "CDG",
  "ASC": "ASC",
  "MPSE": "MPSE"
};

const EventType = {
  "WIN": "WIN",
  "NOMINATION": "NOMINATION"
};

const ContenderType = {
  "DEFAULT": "DEFAULT",
  "ACTOR": "ACTOR",
  "SONG": "SONG"
};

const CategoryName = {
  "PICTURE": "PICTURE",
  "DIRECTOR": "DIRECTOR",
  "ACTOR": "ACTOR",
  "ACTRESS": "ACTRESS",
  "SUPPORTING_ACTOR": "SUPPORTING_ACTOR",
  "SUPPORTING_ACTRESS": "SUPPORTING_ACTRESS",
  "ORIGINAL_SCREENPLAY": "ORIGINAL_SCREENPLAY",
  "ADAPTED_SCREENPLAY": "ADAPTED_SCREENPLAY",
  "SCREENPLAY": "SCREENPLAY",
  "INTERNATIONAL": "INTERNATIONAL",
  "ANIMATED": "ANIMATED",
  "DOCUMENTARY": "DOCUMENTARY",
  "EDITING": "EDITING",
  "CINEMATOGRAPHY": "CINEMATOGRAPHY",
  "PRODUCTION_DESIGN": "PRODUCTION_DESIGN",
  "COSTUMES": "COSTUMES",
  "MAKEUP": "MAKEUP",
  "VISUAL_EFFECTS": "VISUAL_EFFECTS",
  "SOUND": "SOUND",
  "SCORE": "SCORE",
  "SONG": "SONG",
  "SHORT_ANIMATED": "SHORT_ANIMATED",
  "SHORT_DOCUMENTARY": "SHORT_DOCUMENTARY",
  "SHORT_LIVE_ACTION": "SHORT_LIVE_ACTION",
  "ENSEMBLE": "ENSEMBLE",
  "COMEDY_PICTURE": "COMEDY_PICTURE",
  "COMEDY_ACTOR": "COMEDY_ACTOR",
  "COMEDY_ACTRESS": "COMEDY_ACTRESS",
  "ACTION_PICTURE": "ACTION_PICTURE",
  "SCIFI_HORROR_PICTURE": "SCIFI_HORROR_PICTURE",
  "YOUNG_ACTOR": "YOUNG_ACTOR",
  "RISING_STAR": "RISING_STAR",
  "DEBUT": "DEBUT",
  "FIRST_SCREENPLAY": "FIRST_SCREENPLAY",
  "BRITISH_PICTURE": "BRITISH_PICTURE",
  "ANIMATED_PERFORMANCE": "ANIMATED_PERFORMANCE",
  "BLOCKBUSTER": "BLOCKBUSTER",
  "ACTING_ACHIEVEMENT": "ACTING_ACHIEVEMENT",
  "FEMALE_DIRECTOR": "FEMALE_DIRECTOR",
  "MALE_DIRECTOR": "MALE_DIRECTOR",
  "INDIE_PICTURE": "INDIE_PICTURE",
  "BREAKTHROUGH": "BREAKTHROUGH"
};

const CateogrySet = {
  "ACADEMY_AWARDS_2023": "ACADEMY_AWARDS_2023"
};

const { User, Relationships, PredictionSet, Prediction, Contender, Category, Event, LeaderboardPosition, UserPredictingEvent, Movie, Person, Song, ContenderSnapshot } = initSchema(schema);

export {
  User,
  Relationships,
  PredictionSet,
  Prediction,
  Contender,
  Category,
  Event,
  LeaderboardPosition,
  UserPredictingEvent,
  Movie,
  Person,
  Song,
  ContenderSnapshot,
  UserRole,
  AwardsBody,
  EventType,
  ContenderType,
  CategoryName,
  CateogrySet
};