/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  email: string,
  username?: string | null,
  name?: string | null,
  bio?: string | null,
  image?: string | null,
  role: UserRole,
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}


export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  name?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  image?: ModelStringInput | null,
  role?: ModelUserRoleInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelUserRoleInput = {
  eq?: UserRole | null,
  ne?: UserRole | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  username?: string | null,
  name?: string | null,
  bio?: string | null,
  image?: string | null,
  role: UserRole,
  predictionSets?: ModelPredictionSetConnection | null,
  historyPredictionSets?: ModelHistoryPredictionSetConnection | null,
  followers?: ModelRelationshipConnection | null,
  following?: ModelRelationshipConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPredictionSetConnection = {
  __typename: "ModelPredictionSetConnection",
  items:  Array<PredictionSet | null >,
  nextToken?: string | null,
};

export type PredictionSet = {
  __typename: "PredictionSet",
  id: string,
  userId: string,
  user: User,
  eventId: string,
  event: Event,
  categoryId: string,
  category: Category,
  predictions?: ModelPredictionConnection | null,
  type?: PredictionType | null,
  comment?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Event = {
  __typename: "Event",
  id: string,
  categories?: ModelCategoryConnection | null,
  awardsBody: AwardsBody,
  year: number,
  nominationDateTime?: string | null,
  winDateTime?: string | null,
  status?: EventStatus | null,
  predictionSets?: ModelPredictionSetConnection | null,
  historyPredictions?: ModelHistoryPredictionSetConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  eventId: string,
  event: Event,
  name: CategoryName,
  type: CategoryType,
  isShortlisted?: CategoryIsShortlisted | null,
  predictionSets?: ModelPredictionSetConnection | null,
  historyPredictions?: ModelHistoryPredictionSetConnection | null,
  createdAt: string,
  updatedAt: string,
};

export enum CategoryName {
  PICTURE = "PICTURE",
  DIRECTOR = "DIRECTOR",
  ACTOR = "ACTOR",
  ACTRESS = "ACTRESS",
  SUPPORTING_ACTOR = "SUPPORTING_ACTOR",
  SUPPORTING_ACTRESS = "SUPPORTING_ACTRESS",
  ORIGINAL_SCREENPLAY = "ORIGINAL_SCREENPLAY",
  ADAPTED_SCREENPLAY = "ADAPTED_SCREENPLAY",
  SCREENPLAY = "SCREENPLAY",
  INTERNATIONAL = "INTERNATIONAL",
  ANIMATED = "ANIMATED",
  DOCUMENTARY = "DOCUMENTARY",
  EDITING = "EDITING",
  CINEMATOGRAPHY = "CINEMATOGRAPHY",
  PRODUCTION_DESIGN = "PRODUCTION_DESIGN",
  COSTUMES = "COSTUMES",
  MAKEUP = "MAKEUP",
  VISUAL_EFFECTS = "VISUAL_EFFECTS",
  SOUND = "SOUND",
  SCORE = "SCORE",
  SONG = "SONG",
  SHORT_ANIMATED = "SHORT_ANIMATED",
  SHORT_DOCUMENTARY = "SHORT_DOCUMENTARY",
  SHORT_LIVE_ACTION = "SHORT_LIVE_ACTION",
  ENSEMBLE = "ENSEMBLE",
  COMEDY_PICTURE = "COMEDY_PICTURE",
  COMEDY_ACTOR = "COMEDY_ACTOR",
  COMEDY_ACTRESS = "COMEDY_ACTRESS",
  ACTION_PICTURE = "ACTION_PICTURE",
  YOUNG_ACTOR = "YOUNG_ACTOR",
  RISING_STAR = "RISING_STAR",
  DEBUT = "DEBUT",
  FIRST_SCREENPLAY = "FIRST_SCREENPLAY",
  BRITISH_PICTURE = "BRITISH_PICTURE",
  ANIMATED_PERFORMANCE = "ANIMATED_PERFORMANCE",
  BLOCKBUSTER = "BLOCKBUSTER",
  ACTING_ACHIEVEMENT = "ACTING_ACHIEVEMENT",
  FEMALE_DIRECTOR = "FEMALE_DIRECTOR",
  MALE_DIRECTOR = "MALE_DIRECTOR",
  INDIE_PICTURE = "INDIE_PICTURE",
  BREAKTHROUGH = "BREAKTHROUGH",
}


export enum CategoryType {
  FILM = "FILM",
  PERFORMANCE = "PERFORMANCE",
  SONG = "SONG",
}


export enum CategoryIsShortlisted {
  TRUE = "TRUE",
  FALSE = "FALSE",
}


export type ModelHistoryPredictionSetConnection = {
  __typename: "ModelHistoryPredictionSetConnection",
  items:  Array<HistoryPredictionSet | null >,
  nextToken?: string | null,
};

export type HistoryPredictionSet = {
  __typename: "HistoryPredictionSet",
  id: string,
  userId: string,
  user: User,
  eventId: string,
  event: Event,
  categoryId: string,
  category: Category,
  predictions?: ModelHistoryPredictionConnection | null,
  type?: PredictionType | null,
  comment?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelHistoryPredictionConnection = {
  __typename: "ModelHistoryPredictionConnection",
  items:  Array<HistoryPrediction | null >,
  nextToken?: string | null,
};

export type HistoryPrediction = {
  __typename: "HistoryPrediction",
  id: string,
  historyPredictionSetId: string,
  contenderId: string,
  contender: Contender,
  categoryId: string,
  category: Category,
  ranking: number,
  createdAt: string,
  updatedAt: string,
};

export type Contender = {
  __typename: "Contender",
  id: string,
  categoryId: string,
  category: Category,
  eventId: string,
  event: Event,
  movieId: string,
  movie: Movie,
  personId?: string | null,
  person?: Person | null,
  songId?: string | null,
  song?: Song | null,
  visibility?: ContenderVisibility | null,
  accolade?: ContenderAccolade | null,
  createdAt: string,
  updatedAt: string,
};

export type Movie = {
  __typename: "Movie",
  id: string,
  contenders?: ModelContenderConnection | null,
  tmdbId: number,
  studio?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelContenderConnection = {
  __typename: "ModelContenderConnection",
  items:  Array<Contender | null >,
  nextToken?: string | null,
};

export type Person = {
  __typename: "Person",
  id: string,
  tmdbId: number,
  createdAt: string,
  updatedAt: string,
};

export type Song = {
  __typename: "Song",
  id: string,
  movieId: string,
  movie: Movie,
  title: string,
  artist: string,
  createdAt: string,
  updatedAt: string,
};

export enum ContenderVisibility {
  HIDDEN = "HIDDEN",
  VISIBLE = "VISIBLE",
}


export enum ContenderAccolade {
  WINNER = "WINNER",
  NOMINEE = "NOMINEE",
  SHORTLISTED = "SHORTLISTED",
}


export enum PredictionType {
  WIN = "WIN",
  NOMINATION = "NOMINATION",
}


export enum AwardsBody {
  ACADEMY_AWARDS = "ACADEMY_AWARDS",
  GOLDEN_GLOBES = "GOLDEN_GLOBES",
  CRITICS_CHOICE = "CRITICS_CHOICE",
  BAFTA = "BAFTA",
  HCA = "HCA",
  PGA = "PGA",
  SAG = "SAG",
  DGA = "DGA",
  WGA = "WGA",
  ADG = "ADG",
  MAKEUP_GUILD = "MAKEUP_GUILD",
  CDG = "CDG",
  ASC = "ASC",
  MPSE = "MPSE",
}


export enum EventStatus {
  NOMS_STAGING = "NOMS_STAGING",
  NOMS_LIVE = "NOMS_LIVE",
  WINS_STAGING = "WINS_STAGING",
  WINS_LIVE = "WINS_LIVE",
  ARCHIVED = "ARCHIVED",
}


export type ModelPredictionConnection = {
  __typename: "ModelPredictionConnection",
  items:  Array<Prediction | null >,
  nextToken?: string | null,
};

export type Prediction = {
  __typename: "Prediction",
  id: string,
  predictionSetId: string,
  contenderId: string,
  contender: Contender,
  ranking: number,
  createdAt: string,
  updatedAt: string,
};

export type ModelRelationshipConnection = {
  __typename: "ModelRelationshipConnection",
  items:  Array<Relationship | null >,
  nextToken?: string | null,
};

export type Relationship = {
  __typename: "Relationship",
  id: string,
  followedUserId: string,
  followedUser: User,
  followingUserId: string,
  followingUser: User,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  username?: string | null,
  name?: string | null,
  bio?: string | null,
  image?: string | null,
  role?: UserRole | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateRelationshipInput = {
  id?: string | null,
  followedUserId: string,
  followingUserId: string,
};

export type ModelRelationshipConditionInput = {
  followedUserId?: ModelIDInput | null,
  followingUserId?: ModelIDInput | null,
  and?: Array< ModelRelationshipConditionInput | null > | null,
  or?: Array< ModelRelationshipConditionInput | null > | null,
  not?: ModelRelationshipConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateRelationshipInput = {
  id: string,
  followedUserId?: string | null,
  followingUserId?: string | null,
};

export type DeleteRelationshipInput = {
  id: string,
};

export type CreateEventInput = {
  id?: string | null,
  awardsBody: AwardsBody,
  year: number,
  nominationDateTime?: string | null,
  winDateTime?: string | null,
  status?: EventStatus | null,
};

export type ModelEventConditionInput = {
  awardsBody?: ModelAwardsBodyInput | null,
  year?: ModelIntInput | null,
  nominationDateTime?: ModelStringInput | null,
  winDateTime?: ModelStringInput | null,
  status?: ModelEventStatusInput | null,
  and?: Array< ModelEventConditionInput | null > | null,
  or?: Array< ModelEventConditionInput | null > | null,
  not?: ModelEventConditionInput | null,
};

export type ModelAwardsBodyInput = {
  eq?: AwardsBody | null,
  ne?: AwardsBody | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelEventStatusInput = {
  eq?: EventStatus | null,
  ne?: EventStatus | null,
};

export type UpdateEventInput = {
  id: string,
  awardsBody?: AwardsBody | null,
  year?: number | null,
  nominationDateTime?: string | null,
  winDateTime?: string | null,
  status?: EventStatus | null,
};

export type DeleteEventInput = {
  id: string,
};

export type CreateCategoryInput = {
  id?: string | null,
  eventId: string,
  name: CategoryName,
  type: CategoryType,
  isShortlisted?: CategoryIsShortlisted | null,
};

export type ModelCategoryConditionInput = {
  eventId?: ModelIDInput | null,
  name?: ModelCategoryNameInput | null,
  type?: ModelCategoryTypeInput | null,
  isShortlisted?: ModelCategoryIsShortlistedInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type ModelCategoryNameInput = {
  eq?: CategoryName | null,
  ne?: CategoryName | null,
};

export type ModelCategoryTypeInput = {
  eq?: CategoryType | null,
  ne?: CategoryType | null,
};

export type ModelCategoryIsShortlistedInput = {
  eq?: CategoryIsShortlisted | null,
  ne?: CategoryIsShortlisted | null,
};

export type UpdateCategoryInput = {
  id: string,
  eventId?: string | null,
  name?: CategoryName | null,
  type?: CategoryType | null,
  isShortlisted?: CategoryIsShortlisted | null,
};

export type DeleteCategoryInput = {
  id: string,
};

export type CreateContenderInput = {
  id?: string | null,
  categoryId: string,
  eventId: string,
  movieId: string,
  personId?: string | null,
  songId?: string | null,
  visibility?: ContenderVisibility | null,
  accolade?: ContenderAccolade | null,
};

export type ModelContenderConditionInput = {
  categoryId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  movieId?: ModelIDInput | null,
  personId?: ModelIDInput | null,
  songId?: ModelIDInput | null,
  visibility?: ModelContenderVisibilityInput | null,
  accolade?: ModelContenderAccoladeInput | null,
  and?: Array< ModelContenderConditionInput | null > | null,
  or?: Array< ModelContenderConditionInput | null > | null,
  not?: ModelContenderConditionInput | null,
};

export type ModelContenderVisibilityInput = {
  eq?: ContenderVisibility | null,
  ne?: ContenderVisibility | null,
};

export type ModelContenderAccoladeInput = {
  eq?: ContenderAccolade | null,
  ne?: ContenderAccolade | null,
};

export type UpdateContenderInput = {
  id: string,
  categoryId?: string | null,
  eventId?: string | null,
  movieId?: string | null,
  personId?: string | null,
  songId?: string | null,
  visibility?: ContenderVisibility | null,
  accolade?: ContenderAccolade | null,
};

export type DeleteContenderInput = {
  id: string,
};

export type CreateMovieInput = {
  id?: string | null,
  tmdbId: number,
  studio?: string | null,
};

export type ModelMovieConditionInput = {
  tmdbId?: ModelIntInput | null,
  studio?: ModelStringInput | null,
  and?: Array< ModelMovieConditionInput | null > | null,
  or?: Array< ModelMovieConditionInput | null > | null,
  not?: ModelMovieConditionInput | null,
};

export type UpdateMovieInput = {
  id: string,
  tmdbId?: number | null,
  studio?: string | null,
};

export type DeleteMovieInput = {
  id: string,
};

export type CreatePersonInput = {
  id?: string | null,
  tmdbId: number,
};

export type ModelPersonConditionInput = {
  tmdbId?: ModelIntInput | null,
  and?: Array< ModelPersonConditionInput | null > | null,
  or?: Array< ModelPersonConditionInput | null > | null,
  not?: ModelPersonConditionInput | null,
};

export type UpdatePersonInput = {
  id: string,
  tmdbId?: number | null,
};

export type DeletePersonInput = {
  id: string,
};

export type CreateSongInput = {
  id?: string | null,
  movieId: string,
  title: string,
  artist: string,
};

export type ModelSongConditionInput = {
  movieId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  artist?: ModelStringInput | null,
  and?: Array< ModelSongConditionInput | null > | null,
  or?: Array< ModelSongConditionInput | null > | null,
  not?: ModelSongConditionInput | null,
};

export type UpdateSongInput = {
  id: string,
  movieId?: string | null,
  title?: string | null,
  artist?: string | null,
};

export type DeleteSongInput = {
  id: string,
};

export type CreatePredictionSetInput = {
  id?: string | null,
  userId: string,
  eventId: string,
  categoryId: string,
  type?: PredictionType | null,
  comment?: string | null,
  createdAt?: string | null,
};

export type ModelPredictionSetConditionInput = {
  userId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  type?: ModelPredictionTypeInput | null,
  comment?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPredictionSetConditionInput | null > | null,
  or?: Array< ModelPredictionSetConditionInput | null > | null,
  not?: ModelPredictionSetConditionInput | null,
};

export type ModelPredictionTypeInput = {
  eq?: PredictionType | null,
  ne?: PredictionType | null,
};

export type UpdatePredictionSetInput = {
  id: string,
  userId?: string | null,
  eventId?: string | null,
  categoryId?: string | null,
  type?: PredictionType | null,
  comment?: string | null,
  createdAt?: string | null,
};

export type DeletePredictionSetInput = {
  id: string,
};

export type CreatePredictionInput = {
  id?: string | null,
  predictionSetId: string,
  contenderId: string,
  ranking: number,
};

export type ModelPredictionConditionInput = {
  predictionSetId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  and?: Array< ModelPredictionConditionInput | null > | null,
  or?: Array< ModelPredictionConditionInput | null > | null,
  not?: ModelPredictionConditionInput | null,
};

export type UpdatePredictionInput = {
  id: string,
  predictionSetId?: string | null,
  contenderId?: string | null,
  ranking?: number | null,
};

export type DeletePredictionInput = {
  id: string,
};

export type CreateHistoryPredictionSetInput = {
  id?: string | null,
  userId: string,
  eventId: string,
  categoryId: string,
  type?: PredictionType | null,
  comment?: string | null,
  createdAt?: string | null,
};

export type ModelHistoryPredictionSetConditionInput = {
  userId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  type?: ModelPredictionTypeInput | null,
  comment?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelHistoryPredictionSetConditionInput | null > | null,
  or?: Array< ModelHistoryPredictionSetConditionInput | null > | null,
  not?: ModelHistoryPredictionSetConditionInput | null,
};

export type UpdateHistoryPredictionSetInput = {
  id: string,
  userId?: string | null,
  eventId?: string | null,
  categoryId?: string | null,
  type?: PredictionType | null,
  comment?: string | null,
  createdAt?: string | null,
};

export type DeleteHistoryPredictionSetInput = {
  id: string,
};

export type CreateHistoryPredictionInput = {
  id?: string | null,
  historyPredictionSetId: string,
  contenderId: string,
  categoryId: string,
  ranking: number,
};

export type ModelHistoryPredictionConditionInput = {
  historyPredictionSetId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  and?: Array< ModelHistoryPredictionConditionInput | null > | null,
  or?: Array< ModelHistoryPredictionConditionInput | null > | null,
  not?: ModelHistoryPredictionConditionInput | null,
};

export type UpdateHistoryPredictionInput = {
  id: string,
  historyPredictionSetId?: string | null,
  contenderId?: string | null,
  categoryId?: string | null,
  ranking?: number | null,
};

export type DeleteHistoryPredictionInput = {
  id: string,
};

export type CreateCommunityPredictionSetInput = {
  id?: string | null,
  eventId: string,
  categoryId: string,
  type?: PredictionType | null,
};

export type ModelCommunityPredictionSetConditionInput = {
  eventId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  type?: ModelPredictionTypeInput | null,
  and?: Array< ModelCommunityPredictionSetConditionInput | null > | null,
  or?: Array< ModelCommunityPredictionSetConditionInput | null > | null,
  not?: ModelCommunityPredictionSetConditionInput | null,
};

export type CommunityPredictionSet = {
  __typename: "CommunityPredictionSet",
  id: string,
  eventId: string,
  event: Event,
  categoryId: string,
  category: Category,
  predictions?: ModelCommunityPredictionConnection | null,
  type?: PredictionType | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCommunityPredictionConnection = {
  __typename: "ModelCommunityPredictionConnection",
  items:  Array<CommunityPrediction | null >,
  nextToken?: string | null,
};

export type CommunityPrediction = {
  __typename: "CommunityPrediction",
  id: string,
  communityPredictionSetId: string,
  contenderId: string,
  contender: Contender,
  ranking: number,
  indexedRankings?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCommunityPredictionSetInput = {
  id: string,
  eventId?: string | null,
  categoryId?: string | null,
  type?: PredictionType | null,
};

export type DeleteCommunityPredictionSetInput = {
  id: string,
};

export type CreateCommunityPredictionInput = {
  id?: string | null,
  communityPredictionSetId: string,
  contenderId: string,
  ranking: number,
  indexedRankings?: string | null,
};

export type ModelCommunityPredictionConditionInput = {
  communityPredictionSetId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  indexedRankings?: ModelStringInput | null,
  and?: Array< ModelCommunityPredictionConditionInput | null > | null,
  or?: Array< ModelCommunityPredictionConditionInput | null > | null,
  not?: ModelCommunityPredictionConditionInput | null,
};

export type UpdateCommunityPredictionInput = {
  id: string,
  communityPredictionSetId?: string | null,
  contenderId?: string | null,
  ranking?: number | null,
  indexedRankings?: string | null,
};

export type DeleteCommunityPredictionInput = {
  id: string,
};

export type CreateCommunityHistoryPredictionSetInput = {
  id?: string | null,
  eventId: string,
  categoryId: string,
  type?: PredictionType | null,
  createdAt?: string | null,
};

export type ModelCommunityHistoryPredictionSetConditionInput = {
  eventId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  type?: ModelPredictionTypeInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCommunityHistoryPredictionSetConditionInput | null > | null,
  or?: Array< ModelCommunityHistoryPredictionSetConditionInput | null > | null,
  not?: ModelCommunityHistoryPredictionSetConditionInput | null,
};

export type CommunityHistoryPredictionSet = {
  __typename: "CommunityHistoryPredictionSet",
  id: string,
  eventId: string,
  event: Event,
  categoryId: string,
  category: Category,
  predictions?: ModelCommunityHistoryPredictionConnection | null,
  type?: PredictionType | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCommunityHistoryPredictionConnection = {
  __typename: "ModelCommunityHistoryPredictionConnection",
  items:  Array<CommunityHistoryPrediction | null >,
  nextToken?: string | null,
};

export type CommunityHistoryPrediction = {
  __typename: "CommunityHistoryPrediction",
  id: string,
  communityHistoryPredictionSetId: string,
  contenderId: string,
  contender: Contender,
  categoryId: string,
  category: Category,
  ranking: number,
  indexedRankings?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCommunityHistoryPredictionSetInput = {
  id: string,
  eventId?: string | null,
  categoryId?: string | null,
  type?: PredictionType | null,
  createdAt?: string | null,
};

export type DeleteCommunityHistoryPredictionSetInput = {
  id: string,
};

export type CreateCommunityHistoryPredictionInput = {
  id?: string | null,
  communityHistoryPredictionSetId: string,
  contenderId: string,
  categoryId: string,
  ranking: number,
  indexedRankings?: string | null,
};

export type ModelCommunityHistoryPredictionConditionInput = {
  communityHistoryPredictionSetId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  indexedRankings?: ModelStringInput | null,
  and?: Array< ModelCommunityHistoryPredictionConditionInput | null > | null,
  or?: Array< ModelCommunityHistoryPredictionConditionInput | null > | null,
  not?: ModelCommunityHistoryPredictionConditionInput | null,
};

export type UpdateCommunityHistoryPredictionInput = {
  id: string,
  communityHistoryPredictionSetId?: string | null,
  contenderId?: string | null,
  categoryId?: string | null,
  ranking?: number | null,
  indexedRankings?: string | null,
};

export type DeleteCommunityHistoryPredictionInput = {
  id: string,
};

export type SearchableUserFilterInput = {
  id?: SearchableIDFilterInput | null,
  email?: SearchableStringFilterInput | null,
  username?: SearchableStringFilterInput | null,
  name?: SearchableStringFilterInput | null,
  bio?: SearchableStringFilterInput | null,
  image?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  role?: SearchableStringFilterInput | null,
  and?: Array< SearchableUserFilterInput | null > | null,
  or?: Array< SearchableUserFilterInput | null > | null,
  not?: SearchableUserFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableUserSortInput = {
  field?: SearchableUserSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableUserSortableFields {
  id = "id",
  email = "email",
  username = "username",
  name = "name",
  bio = "bio",
  image = "image",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableUserAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableUserAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchableUserAggregateField {
  id = "id",
  email = "email",
  username = "username",
  name = "name",
  bio = "bio",
  image = "image",
  role = "role",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableUserConnection = {
  __typename: "SearchableUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  name?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  image?: ModelStringInput | null,
  role?: ModelUserRoleInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelRelationshipFilterInput = {
  id?: ModelIDInput | null,
  followedUserId?: ModelIDInput | null,
  followingUserId?: ModelIDInput | null,
  and?: Array< ModelRelationshipFilterInput | null > | null,
  or?: Array< ModelRelationshipFilterInput | null > | null,
  not?: ModelRelationshipFilterInput | null,
};

export type ModelEventFilterInput = {
  id?: ModelIDInput | null,
  awardsBody?: ModelAwardsBodyInput | null,
  year?: ModelIntInput | null,
  nominationDateTime?: ModelStringInput | null,
  winDateTime?: ModelStringInput | null,
  status?: ModelEventStatusInput | null,
  and?: Array< ModelEventFilterInput | null > | null,
  or?: Array< ModelEventFilterInput | null > | null,
  not?: ModelEventFilterInput | null,
};

export type ModelEventConnection = {
  __typename: "ModelEventConnection",
  items:  Array<Event | null >,
  nextToken?: string | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  name?: ModelCategoryNameInput | null,
  type?: ModelCategoryTypeInput | null,
  isShortlisted?: ModelCategoryIsShortlistedInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelContenderFilterInput = {
  id?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  movieId?: ModelIDInput | null,
  personId?: ModelIDInput | null,
  songId?: ModelIDInput | null,
  visibility?: ModelContenderVisibilityInput | null,
  accolade?: ModelContenderAccoladeInput | null,
  and?: Array< ModelContenderFilterInput | null > | null,
  or?: Array< ModelContenderFilterInput | null > | null,
  not?: ModelContenderFilterInput | null,
};

export type ModelMovieFilterInput = {
  id?: ModelIDInput | null,
  tmdbId?: ModelIntInput | null,
  studio?: ModelStringInput | null,
  and?: Array< ModelMovieFilterInput | null > | null,
  or?: Array< ModelMovieFilterInput | null > | null,
  not?: ModelMovieFilterInput | null,
};

export type ModelMovieConnection = {
  __typename: "ModelMovieConnection",
  items:  Array<Movie | null >,
  nextToken?: string | null,
};

export type ModelPersonFilterInput = {
  id?: ModelIDInput | null,
  tmdbId?: ModelIntInput | null,
  and?: Array< ModelPersonFilterInput | null > | null,
  or?: Array< ModelPersonFilterInput | null > | null,
  not?: ModelPersonFilterInput | null,
};

export type ModelPersonConnection = {
  __typename: "ModelPersonConnection",
  items:  Array<Person | null >,
  nextToken?: string | null,
};

export type ModelSongFilterInput = {
  id?: ModelIDInput | null,
  movieId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  artist?: ModelStringInput | null,
  and?: Array< ModelSongFilterInput | null > | null,
  or?: Array< ModelSongFilterInput | null > | null,
  not?: ModelSongFilterInput | null,
};

export type ModelSongConnection = {
  __typename: "ModelSongConnection",
  items:  Array<Song | null >,
  nextToken?: string | null,
};

export type ModelPredictionSetFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  type?: ModelPredictionTypeInput | null,
  comment?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPredictionSetFilterInput | null > | null,
  or?: Array< ModelPredictionSetFilterInput | null > | null,
  not?: ModelPredictionSetFilterInput | null,
};

export type ModelPredictionFilterInput = {
  id?: ModelIDInput | null,
  predictionSetId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  and?: Array< ModelPredictionFilterInput | null > | null,
  or?: Array< ModelPredictionFilterInput | null > | null,
  not?: ModelPredictionFilterInput | null,
};

export type ModelHistoryPredictionSetFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  type?: ModelPredictionTypeInput | null,
  comment?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelHistoryPredictionSetFilterInput | null > | null,
  or?: Array< ModelHistoryPredictionSetFilterInput | null > | null,
  not?: ModelHistoryPredictionSetFilterInput | null,
};

export type ModelHistoryPredictionFilterInput = {
  id?: ModelIDInput | null,
  historyPredictionSetId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  and?: Array< ModelHistoryPredictionFilterInput | null > | null,
  or?: Array< ModelHistoryPredictionFilterInput | null > | null,
  not?: ModelHistoryPredictionFilterInput | null,
};

export type ModelCommunityPredictionSetFilterInput = {
  id?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  type?: ModelPredictionTypeInput | null,
  and?: Array< ModelCommunityPredictionSetFilterInput | null > | null,
  or?: Array< ModelCommunityPredictionSetFilterInput | null > | null,
  not?: ModelCommunityPredictionSetFilterInput | null,
};

export type ModelCommunityPredictionSetConnection = {
  __typename: "ModelCommunityPredictionSetConnection",
  items:  Array<CommunityPredictionSet | null >,
  nextToken?: string | null,
};

export type ModelCommunityPredictionFilterInput = {
  id?: ModelIDInput | null,
  communityPredictionSetId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  indexedRankings?: ModelStringInput | null,
  and?: Array< ModelCommunityPredictionFilterInput | null > | null,
  or?: Array< ModelCommunityPredictionFilterInput | null > | null,
  not?: ModelCommunityPredictionFilterInput | null,
};

export type ModelCommunityHistoryPredictionSetFilterInput = {
  id?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  type?: ModelPredictionTypeInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCommunityHistoryPredictionSetFilterInput | null > | null,
  or?: Array< ModelCommunityHistoryPredictionSetFilterInput | null > | null,
  not?: ModelCommunityHistoryPredictionSetFilterInput | null,
};

export type ModelCommunityHistoryPredictionSetConnection = {
  __typename: "ModelCommunityHistoryPredictionSetConnection",
  items:  Array<CommunityHistoryPredictionSet | null >,
  nextToken?: string | null,
};

export type ModelCommunityHistoryPredictionFilterInput = {
  id?: ModelIDInput | null,
  communityHistoryPredictionSetId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  indexedRankings?: ModelStringInput | null,
  and?: Array< ModelCommunityHistoryPredictionFilterInput | null > | null,
  or?: Array< ModelCommunityHistoryPredictionFilterInput | null > | null,
  not?: ModelCommunityHistoryPredictionFilterInput | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyConditionInput = {
  eq?: ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyInput | null,
  le?: ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyInput | null,
  lt?: ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyInput | null,
  ge?: ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyInput | null,
  gt?: ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyInput | null,
  between?: Array< ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyInput | null > | null,
  beginsWith?: ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyInput | null,
};

export type ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyInput = {
  eventId?: string | null,
  createdAt?: string | null,
};

export type ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndCategoryIdAndCreatedAtCompositeKeyConditionInput = {
  eq?: ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndCategoryIdAndCreatedAtCompositeKeyInput | null,
  le?: ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndCategoryIdAndCreatedAtCompositeKeyInput | null,
  lt?: ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndCategoryIdAndCreatedAtCompositeKeyInput | null,
  ge?: ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndCategoryIdAndCreatedAtCompositeKeyInput | null,
  gt?: ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndCategoryIdAndCreatedAtCompositeKeyInput | null,
  between?: Array< ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndCategoryIdAndCreatedAtCompositeKeyInput | null > | null,
  beginsWith?: ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndCategoryIdAndCreatedAtCompositeKeyInput | null,
};

export type ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndCategoryIdAndCreatedAtCompositeKeyInput = {
  categoryId?: string | null,
  createdAt?: string | null,
};

export type UpdateCommunityPredictionsMutationVariables = {
  msg?: string | null,
};

export type UpdateCommunityPredictionsMutation = {
  updateCommunityPredictions?: string | null,
};

export type UpdateCommunityHistoryMutationVariables = {
  msg?: string | null,
};

export type UpdateCommunityHistoryMutation = {
  updateCommunityHistory?: string | null,
};

export type UpdatePersonalHistoryMutationVariables = {
  msg?: string | null,
};

export type UpdatePersonalHistoryMutation = {
  updatePersonalHistory?: string | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username?: string | null,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    role: UserRole,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictionSets?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    followers?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username?: string | null,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    role: UserRole,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictionSets?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    followers?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username?: string | null,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    role: UserRole,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictionSets?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    followers?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRelationshipMutationVariables = {
  input: CreateRelationshipInput,
  condition?: ModelRelationshipConditionInput | null,
};

export type CreateRelationshipMutation = {
  createRelationship?:  {
    __typename: "Relationship",
    id: string,
    followedUserId: string,
    followedUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    followingUserId: string,
    followingUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRelationshipMutationVariables = {
  input: UpdateRelationshipInput,
  condition?: ModelRelationshipConditionInput | null,
};

export type UpdateRelationshipMutation = {
  updateRelationship?:  {
    __typename: "Relationship",
    id: string,
    followedUserId: string,
    followedUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    followingUserId: string,
    followingUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRelationshipMutationVariables = {
  input: DeleteRelationshipInput,
  condition?: ModelRelationshipConditionInput | null,
};

export type DeleteRelationshipMutation = {
  deleteRelationship?:  {
    __typename: "Relationship",
    id: string,
    followedUserId: string,
    followedUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    followingUserId: string,
    followingUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateEventMutationVariables = {
  input: CreateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type CreateEventMutation = {
  createEvent?:  {
    __typename: "Event",
    id: string,
    categories?:  {
      __typename: "ModelCategoryConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    nominationDateTime?: string | null,
    winDateTime?: string | null,
    status?: EventStatus | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEventMutationVariables = {
  input: UpdateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type UpdateEventMutation = {
  updateEvent?:  {
    __typename: "Event",
    id: string,
    categories?:  {
      __typename: "ModelCategoryConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    nominationDateTime?: string | null,
    winDateTime?: string | null,
    status?: EventStatus | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEventMutationVariables = {
  input: DeleteEventInput,
  condition?: ModelEventConditionInput | null,
};

export type DeleteEventMutation = {
  deleteEvent?:  {
    __typename: "Event",
    id: string,
    categories?:  {
      __typename: "ModelCategoryConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    nominationDateTime?: string | null,
    winDateTime?: string | null,
    status?: EventStatus | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    name: CategoryName,
    type: CategoryType,
    isShortlisted?: CategoryIsShortlisted | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory?:  {
    __typename: "Category",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    name: CategoryName,
    type: CategoryType,
    isShortlisted?: CategoryIsShortlisted | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory?:  {
    __typename: "Category",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    name: CategoryName,
    type: CategoryType,
    isShortlisted?: CategoryIsShortlisted | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateContenderMutationVariables = {
  input: CreateContenderInput,
  condition?: ModelContenderConditionInput | null,
};

export type CreateContenderMutation = {
  createContender?:  {
    __typename: "Contender",
    id: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    personId?: string | null,
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    songId?: string | null,
    song?:  {
      __typename: "Song",
      id: string,
      movieId: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    visibility?: ContenderVisibility | null,
    accolade?: ContenderAccolade | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateContenderMutationVariables = {
  input: UpdateContenderInput,
  condition?: ModelContenderConditionInput | null,
};

export type UpdateContenderMutation = {
  updateContender?:  {
    __typename: "Contender",
    id: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    personId?: string | null,
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    songId?: string | null,
    song?:  {
      __typename: "Song",
      id: string,
      movieId: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    visibility?: ContenderVisibility | null,
    accolade?: ContenderAccolade | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteContenderMutationVariables = {
  input: DeleteContenderInput,
  condition?: ModelContenderConditionInput | null,
};

export type DeleteContenderMutation = {
  deleteContender?:  {
    __typename: "Contender",
    id: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    personId?: string | null,
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    songId?: string | null,
    song?:  {
      __typename: "Song",
      id: string,
      movieId: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    visibility?: ContenderVisibility | null,
    accolade?: ContenderAccolade | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMovieMutationVariables = {
  input: CreateMovieInput,
  condition?: ModelMovieConditionInput | null,
};

export type CreateMovieMutation = {
  createMovie?:  {
    __typename: "Movie",
    id: string,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    tmdbId: number,
    studio?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMovieMutationVariables = {
  input: UpdateMovieInput,
  condition?: ModelMovieConditionInput | null,
};

export type UpdateMovieMutation = {
  updateMovie?:  {
    __typename: "Movie",
    id: string,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    tmdbId: number,
    studio?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMovieMutationVariables = {
  input: DeleteMovieInput,
  condition?: ModelMovieConditionInput | null,
};

export type DeleteMovieMutation = {
  deleteMovie?:  {
    __typename: "Movie",
    id: string,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    tmdbId: number,
    studio?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePersonMutationVariables = {
  input: CreatePersonInput,
  condition?: ModelPersonConditionInput | null,
};

export type CreatePersonMutation = {
  createPerson?:  {
    __typename: "Person",
    id: string,
    tmdbId: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePersonMutationVariables = {
  input: UpdatePersonInput,
  condition?: ModelPersonConditionInput | null,
};

export type UpdatePersonMutation = {
  updatePerson?:  {
    __typename: "Person",
    id: string,
    tmdbId: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePersonMutationVariables = {
  input: DeletePersonInput,
  condition?: ModelPersonConditionInput | null,
};

export type DeletePersonMutation = {
  deletePerson?:  {
    __typename: "Person",
    id: string,
    tmdbId: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSongMutationVariables = {
  input: CreateSongInput,
  condition?: ModelSongConditionInput | null,
};

export type CreateSongMutation = {
  createSong?:  {
    __typename: "Song",
    id: string,
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    title: string,
    artist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSongMutationVariables = {
  input: UpdateSongInput,
  condition?: ModelSongConditionInput | null,
};

export type UpdateSongMutation = {
  updateSong?:  {
    __typename: "Song",
    id: string,
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    title: string,
    artist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSongMutationVariables = {
  input: DeleteSongInput,
  condition?: ModelSongConditionInput | null,
};

export type DeleteSongMutation = {
  deleteSong?:  {
    __typename: "Song",
    id: string,
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    title: string,
    artist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePredictionSetMutationVariables = {
  input: CreatePredictionSetInput,
  condition?: ModelPredictionSetConditionInput | null,
};

export type CreatePredictionSetMutation = {
  createPredictionSet?:  {
    __typename: "PredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePredictionSetMutationVariables = {
  input: UpdatePredictionSetInput,
  condition?: ModelPredictionSetConditionInput | null,
};

export type UpdatePredictionSetMutation = {
  updatePredictionSet?:  {
    __typename: "PredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePredictionSetMutationVariables = {
  input: DeletePredictionSetInput,
  condition?: ModelPredictionSetConditionInput | null,
};

export type DeletePredictionSetMutation = {
  deletePredictionSet?:  {
    __typename: "PredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePredictionMutationVariables = {
  input: CreatePredictionInput,
  condition?: ModelPredictionConditionInput | null,
};

export type CreatePredictionMutation = {
  createPrediction?:  {
    __typename: "Prediction",
    id: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePredictionMutationVariables = {
  input: UpdatePredictionInput,
  condition?: ModelPredictionConditionInput | null,
};

export type UpdatePredictionMutation = {
  updatePrediction?:  {
    __typename: "Prediction",
    id: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePredictionMutationVariables = {
  input: DeletePredictionInput,
  condition?: ModelPredictionConditionInput | null,
};

export type DeletePredictionMutation = {
  deletePrediction?:  {
    __typename: "Prediction",
    id: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateHistoryPredictionSetMutationVariables = {
  input: CreateHistoryPredictionSetInput,
  condition?: ModelHistoryPredictionSetConditionInput | null,
};

export type CreateHistoryPredictionSetMutation = {
  createHistoryPredictionSet?:  {
    __typename: "HistoryPredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateHistoryPredictionSetMutationVariables = {
  input: UpdateHistoryPredictionSetInput,
  condition?: ModelHistoryPredictionSetConditionInput | null,
};

export type UpdateHistoryPredictionSetMutation = {
  updateHistoryPredictionSet?:  {
    __typename: "HistoryPredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteHistoryPredictionSetMutationVariables = {
  input: DeleteHistoryPredictionSetInput,
  condition?: ModelHistoryPredictionSetConditionInput | null,
};

export type DeleteHistoryPredictionSetMutation = {
  deleteHistoryPredictionSet?:  {
    __typename: "HistoryPredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateHistoryPredictionMutationVariables = {
  input: CreateHistoryPredictionInput,
  condition?: ModelHistoryPredictionConditionInput | null,
};

export type CreateHistoryPredictionMutation = {
  createHistoryPrediction?:  {
    __typename: "HistoryPrediction",
    id: string,
    historyPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateHistoryPredictionMutationVariables = {
  input: UpdateHistoryPredictionInput,
  condition?: ModelHistoryPredictionConditionInput | null,
};

export type UpdateHistoryPredictionMutation = {
  updateHistoryPrediction?:  {
    __typename: "HistoryPrediction",
    id: string,
    historyPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteHistoryPredictionMutationVariables = {
  input: DeleteHistoryPredictionInput,
  condition?: ModelHistoryPredictionConditionInput | null,
};

export type DeleteHistoryPredictionMutation = {
  deleteHistoryPrediction?:  {
    __typename: "HistoryPrediction",
    id: string,
    historyPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCommunityPredictionSetMutationVariables = {
  input: CreateCommunityPredictionSetInput,
  condition?: ModelCommunityPredictionSetConditionInput | null,
};

export type CreateCommunityPredictionSetMutation = {
  createCommunityPredictionSet?:  {
    __typename: "CommunityPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCommunityPredictionSetMutationVariables = {
  input: UpdateCommunityPredictionSetInput,
  condition?: ModelCommunityPredictionSetConditionInput | null,
};

export type UpdateCommunityPredictionSetMutation = {
  updateCommunityPredictionSet?:  {
    __typename: "CommunityPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCommunityPredictionSetMutationVariables = {
  input: DeleteCommunityPredictionSetInput,
  condition?: ModelCommunityPredictionSetConditionInput | null,
};

export type DeleteCommunityPredictionSetMutation = {
  deleteCommunityPredictionSet?:  {
    __typename: "CommunityPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCommunityPredictionMutationVariables = {
  input: CreateCommunityPredictionInput,
  condition?: ModelCommunityPredictionConditionInput | null,
};

export type CreateCommunityPredictionMutation = {
  createCommunityPrediction?:  {
    __typename: "CommunityPrediction",
    id: string,
    communityPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCommunityPredictionMutationVariables = {
  input: UpdateCommunityPredictionInput,
  condition?: ModelCommunityPredictionConditionInput | null,
};

export type UpdateCommunityPredictionMutation = {
  updateCommunityPrediction?:  {
    __typename: "CommunityPrediction",
    id: string,
    communityPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCommunityPredictionMutationVariables = {
  input: DeleteCommunityPredictionInput,
  condition?: ModelCommunityPredictionConditionInput | null,
};

export type DeleteCommunityPredictionMutation = {
  deleteCommunityPrediction?:  {
    __typename: "CommunityPrediction",
    id: string,
    communityPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCommunityHistoryPredictionSetMutationVariables = {
  input: CreateCommunityHistoryPredictionSetInput,
  condition?: ModelCommunityHistoryPredictionSetConditionInput | null,
};

export type CreateCommunityHistoryPredictionSetMutation = {
  createCommunityHistoryPredictionSet?:  {
    __typename: "CommunityHistoryPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCommunityHistoryPredictionSetMutationVariables = {
  input: UpdateCommunityHistoryPredictionSetInput,
  condition?: ModelCommunityHistoryPredictionSetConditionInput | null,
};

export type UpdateCommunityHistoryPredictionSetMutation = {
  updateCommunityHistoryPredictionSet?:  {
    __typename: "CommunityHistoryPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCommunityHistoryPredictionSetMutationVariables = {
  input: DeleteCommunityHistoryPredictionSetInput,
  condition?: ModelCommunityHistoryPredictionSetConditionInput | null,
};

export type DeleteCommunityHistoryPredictionSetMutation = {
  deleteCommunityHistoryPredictionSet?:  {
    __typename: "CommunityHistoryPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCommunityHistoryPredictionMutationVariables = {
  input: CreateCommunityHistoryPredictionInput,
  condition?: ModelCommunityHistoryPredictionConditionInput | null,
};

export type CreateCommunityHistoryPredictionMutation = {
  createCommunityHistoryPrediction?:  {
    __typename: "CommunityHistoryPrediction",
    id: string,
    communityHistoryPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCommunityHistoryPredictionMutationVariables = {
  input: UpdateCommunityHistoryPredictionInput,
  condition?: ModelCommunityHistoryPredictionConditionInput | null,
};

export type UpdateCommunityHistoryPredictionMutation = {
  updateCommunityHistoryPrediction?:  {
    __typename: "CommunityHistoryPrediction",
    id: string,
    communityHistoryPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCommunityHistoryPredictionMutationVariables = {
  input: DeleteCommunityHistoryPredictionInput,
  condition?: ModelCommunityHistoryPredictionConditionInput | null,
};

export type DeleteCommunityHistoryPredictionMutation = {
  deleteCommunityHistoryPrediction?:  {
    __typename: "CommunityHistoryPrediction",
    id: string,
    communityHistoryPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SearchUsersQueryVariables = {
  filter?: SearchableUserFilterInput | null,
  sort?: Array< SearchableUserSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableUserAggregationInput | null > | null,
};

export type SearchUsersQuery = {
  searchUsers?:  {
    __typename: "SearchableUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username?: string | null,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    role: UserRole,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictionSets?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    followers?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  id?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRelationshipQueryVariables = {
  id: string,
};

export type GetRelationshipQuery = {
  getRelationship?:  {
    __typename: "Relationship",
    id: string,
    followedUserId: string,
    followedUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    followingUserId: string,
    followingUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRelationshipsQueryVariables = {
  id?: string | null,
  filter?: ModelRelationshipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRelationshipsQuery = {
  listRelationships?:  {
    __typename: "ModelRelationshipConnection",
    items:  Array< {
      __typename: "Relationship",
      id: string,
      followedUserId: string,
      followingUserId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEventQueryVariables = {
  id: string,
};

export type GetEventQuery = {
  getEvent?:  {
    __typename: "Event",
    id: string,
    categories?:  {
      __typename: "ModelCategoryConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    nominationDateTime?: string | null,
    winDateTime?: string | null,
    status?: EventStatus | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEventsQueryVariables = {
  id?: string | null,
  filter?: ModelEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListEventsQuery = {
  listEvents?:  {
    __typename: "ModelEventConnection",
    items:  Array< {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory?:  {
    __typename: "Category",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    name: CategoryName,
    type: CategoryType,
    isShortlisted?: CategoryIsShortlisted | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategoriesQueryVariables = {
  id?: string | null,
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetContenderQueryVariables = {
  id: string,
};

export type GetContenderQuery = {
  getContender?:  {
    __typename: "Contender",
    id: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    personId?: string | null,
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    songId?: string | null,
    song?:  {
      __typename: "Song",
      id: string,
      movieId: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    visibility?: ContenderVisibility | null,
    accolade?: ContenderAccolade | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListContendersQueryVariables = {
  id?: string | null,
  filter?: ModelContenderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListContendersQuery = {
  listContenders?:  {
    __typename: "ModelContenderConnection",
    items:  Array< {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMovieQueryVariables = {
  id: string,
};

export type GetMovieQuery = {
  getMovie?:  {
    __typename: "Movie",
    id: string,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    tmdbId: number,
    studio?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMoviesQueryVariables = {
  id?: string | null,
  filter?: ModelMovieFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListMoviesQuery = {
  listMovies?:  {
    __typename: "ModelMovieConnection",
    items:  Array< {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPersonQueryVariables = {
  id: string,
};

export type GetPersonQuery = {
  getPerson?:  {
    __typename: "Person",
    id: string,
    tmdbId: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPeopleQueryVariables = {
  id?: string | null,
  filter?: ModelPersonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPeopleQuery = {
  listPeople?:  {
    __typename: "ModelPersonConnection",
    items:  Array< {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSongQueryVariables = {
  id: string,
};

export type GetSongQuery = {
  getSong?:  {
    __typename: "Song",
    id: string,
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    title: string,
    artist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSongsQueryVariables = {
  id?: string | null,
  filter?: ModelSongFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListSongsQuery = {
  listSongs?:  {
    __typename: "ModelSongConnection",
    items:  Array< {
      __typename: "Song",
      id: string,
      movieId: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPredictionSetQueryVariables = {
  id: string,
};

export type GetPredictionSetQuery = {
  getPredictionSet?:  {
    __typename: "PredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPredictionSetsQueryVariables = {
  id?: string | null,
  filter?: ModelPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPredictionSetsQuery = {
  listPredictionSets?:  {
    __typename: "ModelPredictionSetConnection",
    items:  Array< {
      __typename: "PredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPredictionQueryVariables = {
  id: string,
};

export type GetPredictionQuery = {
  getPrediction?:  {
    __typename: "Prediction",
    id: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPredictionsQueryVariables = {
  id?: string | null,
  filter?: ModelPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPredictionsQuery = {
  listPredictions?:  {
    __typename: "ModelPredictionConnection",
    items:  Array< {
      __typename: "Prediction",
      id: string,
      predictionSetId: string,
      contenderId: string,
      ranking: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetHistoryPredictionSetQueryVariables = {
  id: string,
};

export type GetHistoryPredictionSetQuery = {
  getHistoryPredictionSet?:  {
    __typename: "HistoryPredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListHistoryPredictionSetsQueryVariables = {
  id?: string | null,
  filter?: ModelHistoryPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListHistoryPredictionSetsQuery = {
  listHistoryPredictionSets?:  {
    __typename: "ModelHistoryPredictionSetConnection",
    items:  Array< {
      __typename: "HistoryPredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetHistoryPredictionQueryVariables = {
  id: string,
};

export type GetHistoryPredictionQuery = {
  getHistoryPrediction?:  {
    __typename: "HistoryPrediction",
    id: string,
    historyPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListHistoryPredictionsQueryVariables = {
  id?: string | null,
  filter?: ModelHistoryPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListHistoryPredictionsQuery = {
  listHistoryPredictions?:  {
    __typename: "ModelHistoryPredictionConnection",
    items:  Array< {
      __typename: "HistoryPrediction",
      id: string,
      historyPredictionSetId: string,
      contenderId: string,
      categoryId: string,
      ranking: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommunityPredictionSetQueryVariables = {
  id: string,
};

export type GetCommunityPredictionSetQuery = {
  getCommunityPredictionSet?:  {
    __typename: "CommunityPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCommunityPredictionSetsQueryVariables = {
  id?: string | null,
  filter?: ModelCommunityPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCommunityPredictionSetsQuery = {
  listCommunityPredictionSets?:  {
    __typename: "ModelCommunityPredictionSetConnection",
    items:  Array< {
      __typename: "CommunityPredictionSet",
      id: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommunityPredictionQueryVariables = {
  id: string,
};

export type GetCommunityPredictionQuery = {
  getCommunityPrediction?:  {
    __typename: "CommunityPrediction",
    id: string,
    communityPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCommunityPredictionsQueryVariables = {
  id?: string | null,
  filter?: ModelCommunityPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCommunityPredictionsQuery = {
  listCommunityPredictions?:  {
    __typename: "ModelCommunityPredictionConnection",
    items:  Array< {
      __typename: "CommunityPrediction",
      id: string,
      communityPredictionSetId: string,
      contenderId: string,
      ranking: number,
      indexedRankings?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommunityHistoryPredictionSetQueryVariables = {
  id: string,
};

export type GetCommunityHistoryPredictionSetQuery = {
  getCommunityHistoryPredictionSet?:  {
    __typename: "CommunityHistoryPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCommunityHistoryPredictionSetsQueryVariables = {
  id?: string | null,
  filter?: ModelCommunityHistoryPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCommunityHistoryPredictionSetsQuery = {
  listCommunityHistoryPredictionSets?:  {
    __typename: "ModelCommunityHistoryPredictionSetConnection",
    items:  Array< {
      __typename: "CommunityHistoryPredictionSet",
      id: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommunityHistoryPredictionQueryVariables = {
  id: string,
};

export type GetCommunityHistoryPredictionQuery = {
  getCommunityHistoryPrediction?:  {
    __typename: "CommunityHistoryPrediction",
    id: string,
    communityHistoryPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCommunityHistoryPredictionsQueryVariables = {
  id?: string | null,
  filter?: ModelCommunityHistoryPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCommunityHistoryPredictionsQuery = {
  listCommunityHistoryPredictions?:  {
    __typename: "ModelCommunityHistoryPredictionConnection",
    items:  Array< {
      __typename: "CommunityHistoryPrediction",
      id: string,
      communityHistoryPredictionSetId: string,
      contenderId: string,
      categoryId: string,
      ranking: number,
      indexedRankings?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RelationshipByFollowedUserIdQueryVariables = {
  followedUserId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationshipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RelationshipByFollowedUserIdQuery = {
  relationshipByFollowedUserId?:  {
    __typename: "ModelRelationshipConnection",
    items:  Array< {
      __typename: "Relationship",
      id: string,
      followedUserId: string,
      followingUserId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RelationshipByFollowingUserIdQueryVariables = {
  followingUserId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationshipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RelationshipByFollowingUserIdQuery = {
  relationshipByFollowingUserId?:  {
    __typename: "ModelRelationshipConnection",
    items:  Array< {
      __typename: "Relationship",
      id: string,
      followedUserId: string,
      followingUserId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CategoryByEventQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CategoryByEventQuery = {
  categoryByEvent?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ContenderByMovieQueryVariables = {
  movieId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelContenderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ContenderByMovieQuery = {
  contenderByMovie?:  {
    __typename: "ModelContenderConnection",
    items:  Array< {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PredictionSetByUserIdAndEventIdQueryVariables = {
  userId: string,
  eventId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PredictionSetByUserIdAndEventIdQuery = {
  predictionSetByUserIdAndEventId?:  {
    __typename: "ModelPredictionSetConnection",
    items:  Array< {
      __typename: "PredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PredictionSetByUserIdAndCategoryIdQueryVariables = {
  userId: string,
  categoryId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PredictionSetByUserIdAndCategoryIdQuery = {
  predictionSetByUserIdAndCategoryId?:  {
    __typename: "ModelPredictionSetConnection",
    items:  Array< {
      __typename: "PredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PredictionSetByUserIdAndCreatedAtQueryVariables = {
  userId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PredictionSetByUserIdAndCreatedAtQuery = {
  predictionSetByUserIdAndCreatedAt?:  {
    __typename: "ModelPredictionSetConnection",
    items:  Array< {
      __typename: "PredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PredictionSetByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PredictionSetByEventIdQuery = {
  predictionSetByEventId?:  {
    __typename: "ModelPredictionSetConnection",
    items:  Array< {
      __typename: "PredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PredictionByPredictionSetIdQueryVariables = {
  predictionSetId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PredictionByPredictionSetIdQuery = {
  predictionByPredictionSetId?:  {
    __typename: "ModelPredictionConnection",
    items:  Array< {
      __typename: "Prediction",
      id: string,
      predictionSetId: string,
      contenderId: string,
      ranking: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type HistoryPredictionSetByUserIdAndCreatedAtQueryVariables = {
  userId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelHistoryPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type HistoryPredictionSetByUserIdAndCreatedAtQuery = {
  historyPredictionSetByUserIdAndCreatedAt?:  {
    __typename: "ModelHistoryPredictionSetConnection",
    items:  Array< {
      __typename: "HistoryPredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type HistoryPredictionSetByUserIdAndEventIdAndCreatedAtQueryVariables = {
  userId: string,
  eventIdCreatedAt?: ModelHistoryPredictionSetHistoryPredictionSetsbyUserIdAndEventIdAndCreatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelHistoryPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type HistoryPredictionSetByUserIdAndEventIdAndCreatedAtQuery = {
  historyPredictionSetByUserIdAndEventIdAndCreatedAt?:  {
    __typename: "ModelHistoryPredictionSetConnection",
    items:  Array< {
      __typename: "HistoryPredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type HistoryPredictionSetByUserIdAndCategoryIdAndCreatedAtQueryVariables = {
  userId: string,
  categoryIdCreatedAt?: ModelHistoryPredictionSetHistoryPredictionSetsByUserIdAndCategoryIdAndCreatedAtCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelHistoryPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type HistoryPredictionSetByUserIdAndCategoryIdAndCreatedAtQuery = {
  historyPredictionSetByUserIdAndCategoryIdAndCreatedAt?:  {
    __typename: "ModelHistoryPredictionSetConnection",
    items:  Array< {
      __typename: "HistoryPredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type HistoryPredictionSetByCategoryIdQueryVariables = {
  categoryId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelHistoryPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type HistoryPredictionSetByCategoryIdQuery = {
  historyPredictionSetByCategoryId?:  {
    __typename: "ModelHistoryPredictionSetConnection",
    items:  Array< {
      __typename: "HistoryPredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type HistoryPredictionByHistoryPredictionSetIdQueryVariables = {
  historyPredictionSetId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelHistoryPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type HistoryPredictionByHistoryPredictionSetIdQuery = {
  historyPredictionByHistoryPredictionSetId?:  {
    __typename: "ModelHistoryPredictionConnection",
    items:  Array< {
      __typename: "HistoryPrediction",
      id: string,
      historyPredictionSetId: string,
      contenderId: string,
      categoryId: string,
      ranking: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type HistoryPredictionByCategoryIdQueryVariables = {
  categoryId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelHistoryPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type HistoryPredictionByCategoryIdQuery = {
  historyPredictionByCategoryId?:  {
    __typename: "ModelHistoryPredictionConnection",
    items:  Array< {
      __typename: "HistoryPrediction",
      id: string,
      historyPredictionSetId: string,
      contenderId: string,
      categoryId: string,
      ranking: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CommunityPredictionSetByEventIdQueryVariables = {
  eventId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommunityPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommunityPredictionSetByEventIdQuery = {
  communityPredictionSetByEventId?:  {
    __typename: "ModelCommunityPredictionSetConnection",
    items:  Array< {
      __typename: "CommunityPredictionSet",
      id: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CommunityPredictionByCommunityPredictionSetIdQueryVariables = {
  communityPredictionSetId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommunityPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommunityPredictionByCommunityPredictionSetIdQuery = {
  communityPredictionByCommunityPredictionSetId?:  {
    __typename: "ModelCommunityPredictionConnection",
    items:  Array< {
      __typename: "CommunityPrediction",
      id: string,
      communityPredictionSetId: string,
      contenderId: string,
      ranking: number,
      indexedRankings?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CommunityHistoryPredictionSetsByEventIdAndCreatedAtQueryVariables = {
  eventId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommunityHistoryPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommunityHistoryPredictionSetsByEventIdAndCreatedAtQuery = {
  communityHistoryPredictionSetsByEventIdAndCreatedAt?:  {
    __typename: "ModelCommunityHistoryPredictionSetConnection",
    items:  Array< {
      __typename: "CommunityHistoryPredictionSet",
      id: string,
      eventId: string,
      categoryId: string,
      type?: PredictionType | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CommunityHistoryPredictionByCommunityHistoryPredictionSetIdQueryVariables = {
  communityHistoryPredictionSetId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommunityHistoryPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommunityHistoryPredictionByCommunityHistoryPredictionSetIdQuery = {
  communityHistoryPredictionByCommunityHistoryPredictionSetId?:  {
    __typename: "ModelCommunityHistoryPredictionConnection",
    items:  Array< {
      __typename: "CommunityHistoryPrediction",
      id: string,
      communityHistoryPredictionSetId: string,
      contenderId: string,
      categoryId: string,
      ranking: number,
      indexedRankings?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CommunityHistoryPredictionByCategoryIdQueryVariables = {
  categoryId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommunityHistoryPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommunityHistoryPredictionByCategoryIdQuery = {
  communityHistoryPredictionByCategoryId?:  {
    __typename: "ModelCommunityHistoryPredictionConnection",
    items:  Array< {
      __typename: "CommunityHistoryPrediction",
      id: string,
      communityHistoryPredictionSetId: string,
      contenderId: string,
      categoryId: string,
      ranking: number,
      indexedRankings?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username?: string | null,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    role: UserRole,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictionSets?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    followers?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username?: string | null,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    role: UserRole,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictionSets?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    followers?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username?: string | null,
    name?: string | null,
    bio?: string | null,
    image?: string | null,
    role: UserRole,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictionSets?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    followers?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRelationshipSubscription = {
  onCreateRelationship?:  {
    __typename: "Relationship",
    id: string,
    followedUserId: string,
    followedUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    followingUserId: string,
    followingUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRelationshipSubscription = {
  onUpdateRelationship?:  {
    __typename: "Relationship",
    id: string,
    followedUserId: string,
    followedUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    followingUserId: string,
    followingUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRelationshipSubscription = {
  onDeleteRelationship?:  {
    __typename: "Relationship",
    id: string,
    followedUserId: string,
    followedUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    followingUserId: string,
    followingUser:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateEventSubscription = {
  onCreateEvent?:  {
    __typename: "Event",
    id: string,
    categories?:  {
      __typename: "ModelCategoryConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    nominationDateTime?: string | null,
    winDateTime?: string | null,
    status?: EventStatus | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?:  {
    __typename: "Event",
    id: string,
    categories?:  {
      __typename: "ModelCategoryConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    nominationDateTime?: string | null,
    winDateTime?: string | null,
    status?: EventStatus | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEventSubscription = {
  onDeleteEvent?:  {
    __typename: "Event",
    id: string,
    categories?:  {
      __typename: "ModelCategoryConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    nominationDateTime?: string | null,
    winDateTime?: string | null,
    status?: EventStatus | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    name: CategoryName,
    type: CategoryType,
    isShortlisted?: CategoryIsShortlisted | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?:  {
    __typename: "Category",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    name: CategoryName,
    type: CategoryType,
    isShortlisted?: CategoryIsShortlisted | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?:  {
    __typename: "Category",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    name: CategoryName,
    type: CategoryType,
    isShortlisted?: CategoryIsShortlisted | null,
    predictionSets?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    historyPredictions?:  {
      __typename: "ModelHistoryPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateContenderSubscription = {
  onCreateContender?:  {
    __typename: "Contender",
    id: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    personId?: string | null,
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    songId?: string | null,
    song?:  {
      __typename: "Song",
      id: string,
      movieId: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    visibility?: ContenderVisibility | null,
    accolade?: ContenderAccolade | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateContenderSubscription = {
  onUpdateContender?:  {
    __typename: "Contender",
    id: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    personId?: string | null,
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    songId?: string | null,
    song?:  {
      __typename: "Song",
      id: string,
      movieId: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    visibility?: ContenderVisibility | null,
    accolade?: ContenderAccolade | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteContenderSubscription = {
  onDeleteContender?:  {
    __typename: "Contender",
    id: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    personId?: string | null,
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    songId?: string | null,
    song?:  {
      __typename: "Song",
      id: string,
      movieId: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    visibility?: ContenderVisibility | null,
    accolade?: ContenderAccolade | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMovieSubscription = {
  onCreateMovie?:  {
    __typename: "Movie",
    id: string,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    tmdbId: number,
    studio?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMovieSubscription = {
  onUpdateMovie?:  {
    __typename: "Movie",
    id: string,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    tmdbId: number,
    studio?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMovieSubscription = {
  onDeleteMovie?:  {
    __typename: "Movie",
    id: string,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    tmdbId: number,
    studio?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePersonSubscription = {
  onCreatePerson?:  {
    __typename: "Person",
    id: string,
    tmdbId: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePersonSubscription = {
  onUpdatePerson?:  {
    __typename: "Person",
    id: string,
    tmdbId: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePersonSubscription = {
  onDeletePerson?:  {
    __typename: "Person",
    id: string,
    tmdbId: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSongSubscription = {
  onCreateSong?:  {
    __typename: "Song",
    id: string,
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    title: string,
    artist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSongSubscription = {
  onUpdateSong?:  {
    __typename: "Song",
    id: string,
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    title: string,
    artist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSongSubscription = {
  onDeleteSong?:  {
    __typename: "Song",
    id: string,
    movieId: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    title: string,
    artist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePredictionSetSubscription = {
  onCreatePredictionSet?:  {
    __typename: "PredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePredictionSetSubscription = {
  onUpdatePredictionSet?:  {
    __typename: "PredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePredictionSetSubscription = {
  onDeletePredictionSet?:  {
    __typename: "PredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePredictionSubscription = {
  onCreatePrediction?:  {
    __typename: "Prediction",
    id: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePredictionSubscription = {
  onUpdatePrediction?:  {
    __typename: "Prediction",
    id: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePredictionSubscription = {
  onDeletePrediction?:  {
    __typename: "Prediction",
    id: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHistoryPredictionSetSubscription = {
  onCreateHistoryPredictionSet?:  {
    __typename: "HistoryPredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHistoryPredictionSetSubscription = {
  onUpdateHistoryPredictionSet?:  {
    __typename: "HistoryPredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteHistoryPredictionSetSubscription = {
  onDeleteHistoryPredictionSet?:  {
    __typename: "HistoryPredictionSet",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      username?: string | null,
      name?: string | null,
      bio?: string | null,
      image?: string | null,
      role: UserRole,
      createdAt: string,
      updatedAt: string,
    },
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    comment?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHistoryPredictionSubscription = {
  onCreateHistoryPrediction?:  {
    __typename: "HistoryPrediction",
    id: string,
    historyPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHistoryPredictionSubscription = {
  onUpdateHistoryPrediction?:  {
    __typename: "HistoryPrediction",
    id: string,
    historyPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteHistoryPredictionSubscription = {
  onDeleteHistoryPrediction?:  {
    __typename: "HistoryPrediction",
    id: string,
    historyPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCommunityPredictionSetSubscription = {
  onCreateCommunityPredictionSet?:  {
    __typename: "CommunityPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommunityPredictionSetSubscription = {
  onUpdateCommunityPredictionSet?:  {
    __typename: "CommunityPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommunityPredictionSetSubscription = {
  onDeleteCommunityPredictionSet?:  {
    __typename: "CommunityPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCommunityPredictionSubscription = {
  onCreateCommunityPrediction?:  {
    __typename: "CommunityPrediction",
    id: string,
    communityPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommunityPredictionSubscription = {
  onUpdateCommunityPrediction?:  {
    __typename: "CommunityPrediction",
    id: string,
    communityPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommunityPredictionSubscription = {
  onDeleteCommunityPrediction?:  {
    __typename: "CommunityPrediction",
    id: string,
    communityPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCommunityHistoryPredictionSetSubscription = {
  onCreateCommunityHistoryPredictionSet?:  {
    __typename: "CommunityHistoryPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommunityHistoryPredictionSetSubscription = {
  onUpdateCommunityHistoryPredictionSet?:  {
    __typename: "CommunityHistoryPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommunityHistoryPredictionSetSubscription = {
  onDeleteCommunityHistoryPredictionSet?:  {
    __typename: "CommunityHistoryPredictionSet",
    id: string,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      nominationDateTime?: string | null,
      winDateTime?: string | null,
      status?: EventStatus | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    predictions?:  {
      __typename: "ModelCommunityHistoryPredictionConnection",
      nextToken?: string | null,
    } | null,
    type?: PredictionType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCommunityHistoryPredictionSubscription = {
  onCreateCommunityHistoryPrediction?:  {
    __typename: "CommunityHistoryPrediction",
    id: string,
    communityHistoryPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommunityHistoryPredictionSubscription = {
  onUpdateCommunityHistoryPrediction?:  {
    __typename: "CommunityHistoryPrediction",
    id: string,
    communityHistoryPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommunityHistoryPredictionSubscription = {
  onDeleteCommunityHistoryPrediction?:  {
    __typename: "CommunityHistoryPrediction",
    id: string,
    communityHistoryPredictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      eventId: string,
      movieId: string,
      personId?: string | null,
      songId?: string | null,
      visibility?: ContenderVisibility | null,
      accolade?: ContenderAccolade | null,
      createdAt: string,
      updatedAt: string,
    },
    categoryId: string,
    category:  {
      __typename: "Category",
      id: string,
      eventId: string,
      name: CategoryName,
      type: CategoryType,
      isShortlisted?: CategoryIsShortlisted | null,
      createdAt: string,
      updatedAt: string,
    },
    ranking: number,
    indexedRankings?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
