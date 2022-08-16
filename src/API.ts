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
  followers?: ModelRelationshipsConnection | null,
  following?: ModelRelationshipsConnection | null,
  activePredictionsByEvent?: ModelPredictionSetConnection | null,
  activePredictionsByCategory?: ModelPredictionSetConnection | null,
  pastPredictionsByEvent?: ModelPredictionSetConnection | null,
  pastPredictionsByCategory?: ModelPredictionSetConnection | null,
  leaderboardScores?: ModelLeaderboardPositionConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelRelationshipsConnection = {
  __typename: "ModelRelationshipsConnection",
  items:  Array<Relationships | null >,
  nextToken?: string | null,
};

export type Relationships = {
  __typename: "Relationships",
  id: string,
  followedUserId: string,
  followingUserId: string,
  followedUser?: User | null,
  followingUser?: User | null,
  followedPredictionFeed?: ModelPredictionSetConnection | null,
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
  eventId: string,
  categoryId: string,
  predictions?: ModelPredictionConnection | null,
  isActive?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPredictionConnection = {
  __typename: "ModelPredictionConnection",
  items:  Array<Prediction | null >,
  nextToken?: string | null,
};

export type Prediction = {
  __typename: "Prediction",
  id: string,
  predictionSetId: string,
  userId: string,
  contenderId: string,
  contender?: Contender | null,
  ranking: number,
  isActive?: string | null,
  createdAt: string,
  updatedAt: string,
  predictionSetPredictionsId?: string | null,
};

export type Contender = {
  __typename: "Contender",
  id: string,
  categoryId: string,
  category?: Category | null,
  movie?: Movie | null,
  person?: Person | null,
  snapshots?: ModelContenderSnapshotConnection | null,
  activePredictions?: ModelPredictionConnection | null,
  activePredictionsRankings?: ModelPredictionConnection | null,
  predictionsByUser?: ModelPredictionConnection | null,
  didReceiveNominationOrWin?: boolean | null,
  createdAt: string,
  updatedAt: string,
  categoryContendersId?: string | null,
  contenderMovieId?: string | null,
  contenderPersonId?: string | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  name: CategoryName,
  eventId: string,
  event?: Event | null,
  contenders?: ModelContenderConnection | null,
  createdAt: string,
  updatedAt: string,
  eventCategoriesId?: string | null,
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
  SCIFI_HORROR_PICTURE = "SCIFI_HORROR_PICTURE",
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


export type Event = {
  __typename: "Event",
  id: string,
  categories?: ModelCategoryConnection | null,
  leaderboard?: ModelLeaderboardPositionConnection | null,
  awardsBody: AwardsBody,
  year: number,
  type: EventType,
  expiration?: string | null,
  usersPredicting?: ModelUserPredictingEventConnection | null,
  isActive?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
};

export type ModelLeaderboardPositionConnection = {
  __typename: "ModelLeaderboardPositionConnection",
  items:  Array<LeaderboardPosition | null >,
  nextToken?: string | null,
};

export type LeaderboardPosition = {
  __typename: "LeaderboardPosition",
  userId: string,
  eventId: string,
  event?: Event | null,
  user?: User | null,
  accuracy?: string | null,
  ranking?: number | null,
  createdAt: string,
  updatedAt: string,
  userLeaderboardScoresId?: string | null,
};

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


export enum EventType {
  WIN = "WIN",
  NOMINATION = "NOMINATION",
}


export type ModelUserPredictingEventConnection = {
  __typename: "ModelUserPredictingEventConnection",
  items:  Array<UserPredictingEvent | null >,
  nextToken?: string | null,
};

export type UserPredictingEvent = {
  __typename: "UserPredictingEvent",
  eventId: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
  eventUsersPredictingId?: string | null,
};

export type ModelContenderConnection = {
  __typename: "ModelContenderConnection",
  items:  Array<Contender | null >,
  nextToken?: string | null,
};

export type Movie = {
  __typename: "Movie",
  imdbId: string,
  year?: number | null,
  image?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Person = {
  __typename: "Person",
  imdbId: string,
  image?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelContenderSnapshotConnection = {
  __typename: "ModelContenderSnapshotConnection",
  items:  Array<ContenderSnapshot | null >,
  nextToken?: string | null,
};

export type ContenderSnapshot = {
  __typename: "ContenderSnapshot",
  id: string,
  contenderId: string,
  contender?: Contender | null,
  categoryId: string,
  category?: Category | null,
  numberOfUsersPredicting: number,
  numberOfUsersPredictingWin: number,
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

export type CreateRelationshipsInput = {
  id?: string | null,
  followedUserId: string,
  followingUserId: string,
};

export type ModelRelationshipsConditionInput = {
  followedUserId?: ModelIDInput | null,
  followingUserId?: ModelIDInput | null,
  and?: Array< ModelRelationshipsConditionInput | null > | null,
  or?: Array< ModelRelationshipsConditionInput | null > | null,
  not?: ModelRelationshipsConditionInput | null,
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

export type UpdateRelationshipsInput = {
  id: string,
  followedUserId?: string | null,
  followingUserId?: string | null,
};

export type DeleteRelationshipsInput = {
  id: string,
};

export type CreatePredictionSetInput = {
  id?: string | null,
  userId: string,
  eventId: string,
  categoryId: string,
  isActive?: string | null,
  createdAt?: string | null,
};

export type ModelPredictionSetConditionInput = {
  userId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  isActive?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPredictionSetConditionInput | null > | null,
  or?: Array< ModelPredictionSetConditionInput | null > | null,
  not?: ModelPredictionSetConditionInput | null,
};

export type UpdatePredictionSetInput = {
  id: string,
  userId?: string | null,
  eventId?: string | null,
  categoryId?: string | null,
  isActive?: string | null,
  createdAt?: string | null,
};

export type DeletePredictionSetInput = {
  id: string,
};

export type CreatePredictionInput = {
  id?: string | null,
  predictionSetId: string,
  userId: string,
  contenderId: string,
  ranking: number,
  isActive?: string | null,
  predictionSetPredictionsId?: string | null,
};

export type ModelPredictionConditionInput = {
  predictionSetId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  isActive?: ModelStringInput | null,
  and?: Array< ModelPredictionConditionInput | null > | null,
  or?: Array< ModelPredictionConditionInput | null > | null,
  not?: ModelPredictionConditionInput | null,
  predictionSetPredictionsId?: ModelIDInput | null,
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

export type UpdatePredictionInput = {
  id: string,
  predictionSetId?: string | null,
  userId?: string | null,
  contenderId?: string | null,
  ranking?: number | null,
  isActive?: string | null,
  predictionSetPredictionsId?: string | null,
};

export type DeletePredictionInput = {
  id: string,
};

export type CreateEventInput = {
  id?: string | null,
  awardsBody: AwardsBody,
  year: number,
  type: EventType,
  expiration?: string | null,
  isActive?: string | null,
};

export type ModelEventConditionInput = {
  awardsBody?: ModelAwardsBodyInput | null,
  year?: ModelIntInput | null,
  type?: ModelEventTypeInput | null,
  expiration?: ModelStringInput | null,
  isActive?: ModelStringInput | null,
  and?: Array< ModelEventConditionInput | null > | null,
  or?: Array< ModelEventConditionInput | null > | null,
  not?: ModelEventConditionInput | null,
};

export type ModelAwardsBodyInput = {
  eq?: AwardsBody | null,
  ne?: AwardsBody | null,
};

export type ModelEventTypeInput = {
  eq?: EventType | null,
  ne?: EventType | null,
};

export type UpdateEventInput = {
  id: string,
  awardsBody?: AwardsBody | null,
  year?: number | null,
  type?: EventType | null,
  expiration?: string | null,
  isActive?: string | null,
};

export type DeleteEventInput = {
  id: string,
};

export type CreateUserPredictingEventInput = {
  eventId: string,
  userId: string,
  eventUsersPredictingId?: string | null,
};

export type ModelUserPredictingEventConditionInput = {
  and?: Array< ModelUserPredictingEventConditionInput | null > | null,
  or?: Array< ModelUserPredictingEventConditionInput | null > | null,
  not?: ModelUserPredictingEventConditionInput | null,
  eventUsersPredictingId?: ModelIDInput | null,
};

export type UpdateUserPredictingEventInput = {
  eventId: string,
  userId: string,
  eventUsersPredictingId?: string | null,
};

export type DeleteUserPredictingEventInput = {
  eventId: string,
  userId: string,
};

export type CreateLeaderboardPositionInput = {
  userId: string,
  eventId: string,
  accuracy?: string | null,
  ranking?: number | null,
  userLeaderboardScoresId?: string | null,
};

export type ModelLeaderboardPositionConditionInput = {
  accuracy?: ModelStringInput | null,
  ranking?: ModelIntInput | null,
  and?: Array< ModelLeaderboardPositionConditionInput | null > | null,
  or?: Array< ModelLeaderboardPositionConditionInput | null > | null,
  not?: ModelLeaderboardPositionConditionInput | null,
  userLeaderboardScoresId?: ModelIDInput | null,
};

export type UpdateLeaderboardPositionInput = {
  userId: string,
  eventId: string,
  accuracy?: string | null,
  ranking?: number | null,
  userLeaderboardScoresId?: string | null,
};

export type DeleteLeaderboardPositionInput = {
  userId: string,
  eventId: string,
};

export type CreateCategoryInput = {
  id?: string | null,
  name: CategoryName,
  eventId: string,
  eventCategoriesId?: string | null,
};

export type ModelCategoryConditionInput = {
  name?: ModelCategoryNameInput | null,
  eventId?: ModelIDInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
  eventCategoriesId?: ModelIDInput | null,
};

export type ModelCategoryNameInput = {
  eq?: CategoryName | null,
  ne?: CategoryName | null,
};

export type UpdateCategoryInput = {
  id: string,
  name?: CategoryName | null,
  eventId?: string | null,
  eventCategoriesId?: string | null,
};

export type DeleteCategoryInput = {
  id: string,
};

export type CreateContenderInput = {
  id?: string | null,
  categoryId: string,
  didReceiveNominationOrWin?: boolean | null,
  categoryContendersId?: string | null,
  contenderMovieId?: string | null,
  contenderPersonId?: string | null,
};

export type ModelContenderConditionInput = {
  categoryId?: ModelIDInput | null,
  didReceiveNominationOrWin?: ModelBooleanInput | null,
  and?: Array< ModelContenderConditionInput | null > | null,
  or?: Array< ModelContenderConditionInput | null > | null,
  not?: ModelContenderConditionInput | null,
  categoryContendersId?: ModelIDInput | null,
  contenderMovieId?: ModelIDInput | null,
  contenderPersonId?: ModelIDInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateContenderInput = {
  id: string,
  categoryId?: string | null,
  didReceiveNominationOrWin?: boolean | null,
  categoryContendersId?: string | null,
  contenderMovieId?: string | null,
  contenderPersonId?: string | null,
};

export type DeleteContenderInput = {
  id: string,
};

export type CreateContenderSnapshotInput = {
  id?: string | null,
  contenderId: string,
  categoryId: string,
  numberOfUsersPredicting: number,
  numberOfUsersPredictingWin: number,
  createdAt?: string | null,
};

export type ModelContenderSnapshotConditionInput = {
  contenderId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  numberOfUsersPredicting?: ModelIntInput | null,
  numberOfUsersPredictingWin?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelContenderSnapshotConditionInput | null > | null,
  or?: Array< ModelContenderSnapshotConditionInput | null > | null,
  not?: ModelContenderSnapshotConditionInput | null,
};

export type UpdateContenderSnapshotInput = {
  id: string,
  contenderId?: string | null,
  categoryId?: string | null,
  numberOfUsersPredicting?: number | null,
  numberOfUsersPredictingWin?: number | null,
  createdAt?: string | null,
};

export type DeleteContenderSnapshotInput = {
  id: string,
};

export type CreateMovieInput = {
  imdbId: string,
  year?: number | null,
  image?: string | null,
};

export type ModelMovieConditionInput = {
  year?: ModelIntInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelMovieConditionInput | null > | null,
  or?: Array< ModelMovieConditionInput | null > | null,
  not?: ModelMovieConditionInput | null,
};

export type UpdateMovieInput = {
  imdbId: string,
  year?: number | null,
  image?: string | null,
};

export type DeleteMovieInput = {
  imdbId: string,
};

export type CreatePersonInput = {
  imdbId: string,
  image?: string | null,
};

export type ModelPersonConditionInput = {
  image?: ModelStringInput | null,
  and?: Array< ModelPersonConditionInput | null > | null,
  or?: Array< ModelPersonConditionInput | null > | null,
  not?: ModelPersonConditionInput | null,
};

export type UpdatePersonInput = {
  imdbId: string,
  image?: string | null,
};

export type DeletePersonInput = {
  imdbId: string,
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

export type ModelRelationshipsFilterInput = {
  id?: ModelIDInput | null,
  followedUserId?: ModelIDInput | null,
  followingUserId?: ModelIDInput | null,
  and?: Array< ModelRelationshipsFilterInput | null > | null,
  or?: Array< ModelRelationshipsFilterInput | null > | null,
  not?: ModelRelationshipsFilterInput | null,
};

export type ModelPredictionSetFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  isActive?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPredictionSetFilterInput | null > | null,
  or?: Array< ModelPredictionSetFilterInput | null > | null,
  not?: ModelPredictionSetFilterInput | null,
};

export type ModelPredictionFilterInput = {
  id?: ModelIDInput | null,
  predictionSetId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  isActive?: ModelStringInput | null,
  and?: Array< ModelPredictionFilterInput | null > | null,
  or?: Array< ModelPredictionFilterInput | null > | null,
  not?: ModelPredictionFilterInput | null,
  predictionSetPredictionsId?: ModelIDInput | null,
};

export type ModelEventFilterInput = {
  id?: ModelIDInput | null,
  awardsBody?: ModelAwardsBodyInput | null,
  year?: ModelIntInput | null,
  type?: ModelEventTypeInput | null,
  expiration?: ModelStringInput | null,
  isActive?: ModelStringInput | null,
  and?: Array< ModelEventFilterInput | null > | null,
  or?: Array< ModelEventFilterInput | null > | null,
  not?: ModelEventFilterInput | null,
};

export type ModelEventConnection = {
  __typename: "ModelEventConnection",
  items:  Array<Event | null >,
  nextToken?: string | null,
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

export type ModelUserPredictingEventFilterInput = {
  eventId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserPredictingEventFilterInput | null > | null,
  or?: Array< ModelUserPredictingEventFilterInput | null > | null,
  not?: ModelUserPredictingEventFilterInput | null,
  eventUsersPredictingId?: ModelIDInput | null,
};

export type ModelLeaderboardPositionFilterInput = {
  userId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  accuracy?: ModelStringInput | null,
  ranking?: ModelIntInput | null,
  and?: Array< ModelLeaderboardPositionFilterInput | null > | null,
  or?: Array< ModelLeaderboardPositionFilterInput | null > | null,
  not?: ModelLeaderboardPositionFilterInput | null,
  userLeaderboardScoresId?: ModelIDInput | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelCategoryNameInput | null,
  eventId?: ModelIDInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
  eventCategoriesId?: ModelIDInput | null,
};

export type ModelContenderFilterInput = {
  id?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  didReceiveNominationOrWin?: ModelBooleanInput | null,
  and?: Array< ModelContenderFilterInput | null > | null,
  or?: Array< ModelContenderFilterInput | null > | null,
  not?: ModelContenderFilterInput | null,
  categoryContendersId?: ModelIDInput | null,
  contenderMovieId?: ModelIDInput | null,
  contenderPersonId?: ModelIDInput | null,
};

export type ModelContenderSnapshotFilterInput = {
  id?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  numberOfUsersPredicting?: ModelIntInput | null,
  numberOfUsersPredictingWin?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelContenderSnapshotFilterInput | null > | null,
  or?: Array< ModelContenderSnapshotFilterInput | null > | null,
  not?: ModelContenderSnapshotFilterInput | null,
};

export type ModelMovieFilterInput = {
  imdbId?: ModelStringInput | null,
  year?: ModelIntInput | null,
  image?: ModelStringInput | null,
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
  imdbId?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelPersonFilterInput | null > | null,
  or?: Array< ModelPersonFilterInput | null > | null,
  not?: ModelPersonFilterInput | null,
};

export type ModelPersonConnection = {
  __typename: "ModelPersonConnection",
  items:  Array<Person | null >,
  nextToken?: string | null,
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

export type ModelPredictionSetByUserByEventActiveCompositeKeyConditionInput = {
  eq?: ModelPredictionSetByUserByEventActiveCompositeKeyInput | null,
  le?: ModelPredictionSetByUserByEventActiveCompositeKeyInput | null,
  lt?: ModelPredictionSetByUserByEventActiveCompositeKeyInput | null,
  ge?: ModelPredictionSetByUserByEventActiveCompositeKeyInput | null,
  gt?: ModelPredictionSetByUserByEventActiveCompositeKeyInput | null,
  between?: Array< ModelPredictionSetByUserByEventActiveCompositeKeyInput | null > | null,
  beginsWith?: ModelPredictionSetByUserByEventActiveCompositeKeyInput | null,
};

export type ModelPredictionSetByUserByEventActiveCompositeKeyInput = {
  eventId?: string | null,
  isActive?: string | null,
};

export type ModelPredictionSetByUserByEventByDateCompositeKeyConditionInput = {
  eq?: ModelPredictionSetByUserByEventByDateCompositeKeyInput | null,
  le?: ModelPredictionSetByUserByEventByDateCompositeKeyInput | null,
  lt?: ModelPredictionSetByUserByEventByDateCompositeKeyInput | null,
  ge?: ModelPredictionSetByUserByEventByDateCompositeKeyInput | null,
  gt?: ModelPredictionSetByUserByEventByDateCompositeKeyInput | null,
  between?: Array< ModelPredictionSetByUserByEventByDateCompositeKeyInput | null > | null,
  beginsWith?: ModelPredictionSetByUserByEventByDateCompositeKeyInput | null,
};

export type ModelPredictionSetByUserByEventByDateCompositeKeyInput = {
  eventId?: string | null,
  createdAt?: string | null,
};

export type ModelPredictionSetByUserByCategoryByActiveCompositeKeyConditionInput = {
  eq?: ModelPredictionSetByUserByCategoryByActiveCompositeKeyInput | null,
  le?: ModelPredictionSetByUserByCategoryByActiveCompositeKeyInput | null,
  lt?: ModelPredictionSetByUserByCategoryByActiveCompositeKeyInput | null,
  ge?: ModelPredictionSetByUserByCategoryByActiveCompositeKeyInput | null,
  gt?: ModelPredictionSetByUserByCategoryByActiveCompositeKeyInput | null,
  between?: Array< ModelPredictionSetByUserByCategoryByActiveCompositeKeyInput | null > | null,
  beginsWith?: ModelPredictionSetByUserByCategoryByActiveCompositeKeyInput | null,
};

export type ModelPredictionSetByUserByCategoryByActiveCompositeKeyInput = {
  categoryId?: string | null,
  isActive?: string | null,
};

export type ModelPredictionSetByUserByCategoryByDateCompositeKeyConditionInput = {
  eq?: ModelPredictionSetByUserByCategoryByDateCompositeKeyInput | null,
  le?: ModelPredictionSetByUserByCategoryByDateCompositeKeyInput | null,
  lt?: ModelPredictionSetByUserByCategoryByDateCompositeKeyInput | null,
  ge?: ModelPredictionSetByUserByCategoryByDateCompositeKeyInput | null,
  gt?: ModelPredictionSetByUserByCategoryByDateCompositeKeyInput | null,
  between?: Array< ModelPredictionSetByUserByCategoryByDateCompositeKeyInput | null > | null,
  beginsWith?: ModelPredictionSetByUserByCategoryByDateCompositeKeyInput | null,
};

export type ModelPredictionSetByUserByCategoryByDateCompositeKeyInput = {
  categoryId?: string | null,
  createdAt?: string | null,
};

export type ModelPredictionByContenderByActiveByRankingCompositeKeyConditionInput = {
  eq?: ModelPredictionByContenderByActiveByRankingCompositeKeyInput | null,
  le?: ModelPredictionByContenderByActiveByRankingCompositeKeyInput | null,
  lt?: ModelPredictionByContenderByActiveByRankingCompositeKeyInput | null,
  ge?: ModelPredictionByContenderByActiveByRankingCompositeKeyInput | null,
  gt?: ModelPredictionByContenderByActiveByRankingCompositeKeyInput | null,
  between?: Array< ModelPredictionByContenderByActiveByRankingCompositeKeyInput | null > | null,
  beginsWith?: ModelPredictionByContenderByActiveByRankingCompositeKeyInput | null,
};

export type ModelPredictionByContenderByActiveByRankingCompositeKeyInput = {
  isActive?: string | null,
  ranking?: number | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
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
    followers?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    leaderboardScores?:  {
      __typename: "ModelLeaderboardPositionConnection",
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
    followers?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    leaderboardScores?:  {
      __typename: "ModelLeaderboardPositionConnection",
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
    followers?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    leaderboardScores?:  {
      __typename: "ModelLeaderboardPositionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRelationshipsMutationVariables = {
  input: CreateRelationshipsInput,
  condition?: ModelRelationshipsConditionInput | null,
};

export type CreateRelationshipsMutation = {
  createRelationships?:  {
    __typename: "Relationships",
    id: string,
    followedUserId: string,
    followingUserId: string,
    followedUser?:  {
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
    } | null,
    followingUser?:  {
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
    } | null,
    followedPredictionFeed?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRelationshipsMutationVariables = {
  input: UpdateRelationshipsInput,
  condition?: ModelRelationshipsConditionInput | null,
};

export type UpdateRelationshipsMutation = {
  updateRelationships?:  {
    __typename: "Relationships",
    id: string,
    followedUserId: string,
    followingUserId: string,
    followedUser?:  {
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
    } | null,
    followingUser?:  {
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
    } | null,
    followedPredictionFeed?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRelationshipsMutationVariables = {
  input: DeleteRelationshipsInput,
  condition?: ModelRelationshipsConditionInput | null,
};

export type DeleteRelationshipsMutation = {
  deleteRelationships?:  {
    __typename: "Relationships",
    id: string,
    followedUserId: string,
    followingUserId: string,
    followedUser?:  {
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
    } | null,
    followingUser?:  {
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
    } | null,
    followedPredictionFeed?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
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
    eventId: string,
    categoryId: string,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
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
    eventId: string,
    categoryId: string,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
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
    eventId: string,
    categoryId: string,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
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
    userId: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    ranking: number,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
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
    userId: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    ranking: number,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
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
    userId: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    ranking: number,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
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
    leaderboard?:  {
      __typename: "ModelLeaderboardPositionConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    type: EventType,
    expiration?: string | null,
    usersPredicting?:  {
      __typename: "ModelUserPredictingEventConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
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
    leaderboard?:  {
      __typename: "ModelLeaderboardPositionConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    type: EventType,
    expiration?: string | null,
    usersPredicting?:  {
      __typename: "ModelUserPredictingEventConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
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
    leaderboard?:  {
      __typename: "ModelLeaderboardPositionConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    type: EventType,
    expiration?: string | null,
    usersPredicting?:  {
      __typename: "ModelUserPredictingEventConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserPredictingEventMutationVariables = {
  input: CreateUserPredictingEventInput,
  condition?: ModelUserPredictingEventConditionInput | null,
};

export type CreateUserPredictingEventMutation = {
  createUserPredictingEvent?:  {
    __typename: "UserPredictingEvent",
    eventId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    eventUsersPredictingId?: string | null,
  } | null,
};

export type UpdateUserPredictingEventMutationVariables = {
  input: UpdateUserPredictingEventInput,
  condition?: ModelUserPredictingEventConditionInput | null,
};

export type UpdateUserPredictingEventMutation = {
  updateUserPredictingEvent?:  {
    __typename: "UserPredictingEvent",
    eventId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    eventUsersPredictingId?: string | null,
  } | null,
};

export type DeleteUserPredictingEventMutationVariables = {
  input: DeleteUserPredictingEventInput,
  condition?: ModelUserPredictingEventConditionInput | null,
};

export type DeleteUserPredictingEventMutation = {
  deleteUserPredictingEvent?:  {
    __typename: "UserPredictingEvent",
    eventId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    eventUsersPredictingId?: string | null,
  } | null,
};

export type CreateLeaderboardPositionMutationVariables = {
  input: CreateLeaderboardPositionInput,
  condition?: ModelLeaderboardPositionConditionInput | null,
};

export type CreateLeaderboardPositionMutation = {
  createLeaderboardPosition?:  {
    __typename: "LeaderboardPosition",
    userId: string,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
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
    } | null,
    accuracy?: string | null,
    ranking?: number | null,
    createdAt: string,
    updatedAt: string,
    userLeaderboardScoresId?: string | null,
  } | null,
};

export type UpdateLeaderboardPositionMutationVariables = {
  input: UpdateLeaderboardPositionInput,
  condition?: ModelLeaderboardPositionConditionInput | null,
};

export type UpdateLeaderboardPositionMutation = {
  updateLeaderboardPosition?:  {
    __typename: "LeaderboardPosition",
    userId: string,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
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
    } | null,
    accuracy?: string | null,
    ranking?: number | null,
    createdAt: string,
    updatedAt: string,
    userLeaderboardScoresId?: string | null,
  } | null,
};

export type DeleteLeaderboardPositionMutationVariables = {
  input: DeleteLeaderboardPositionInput,
  condition?: ModelLeaderboardPositionConditionInput | null,
};

export type DeleteLeaderboardPositionMutation = {
  deleteLeaderboardPosition?:  {
    __typename: "LeaderboardPosition",
    userId: string,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
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
    } | null,
    accuracy?: string | null,
    ranking?: number | null,
    createdAt: string,
    updatedAt: string,
    userLeaderboardScoresId?: string | null,
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
    name: CategoryName,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    eventCategoriesId?: string | null,
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
    name: CategoryName,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    eventCategoriesId?: string | null,
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
    name: CategoryName,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    eventCategoriesId?: string | null,
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
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    movie?:  {
      __typename: "Movie",
      imdbId: string,
      year?: number | null,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    person?:  {
      __typename: "Person",
      imdbId: string,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    snapshots?:  {
      __typename: "ModelContenderSnapshotConnection",
      nextToken?: string | null,
    } | null,
    activePredictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsRankings?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    predictionsByUser?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId?: string | null,
    contenderPersonId?: string | null,
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
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    movie?:  {
      __typename: "Movie",
      imdbId: string,
      year?: number | null,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    person?:  {
      __typename: "Person",
      imdbId: string,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    snapshots?:  {
      __typename: "ModelContenderSnapshotConnection",
      nextToken?: string | null,
    } | null,
    activePredictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsRankings?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    predictionsByUser?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId?: string | null,
    contenderPersonId?: string | null,
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
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    movie?:  {
      __typename: "Movie",
      imdbId: string,
      year?: number | null,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    person?:  {
      __typename: "Person",
      imdbId: string,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    snapshots?:  {
      __typename: "ModelContenderSnapshotConnection",
      nextToken?: string | null,
    } | null,
    activePredictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsRankings?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    predictionsByUser?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId?: string | null,
    contenderPersonId?: string | null,
  } | null,
};

export type CreateContenderSnapshotMutationVariables = {
  input: CreateContenderSnapshotInput,
  condition?: ModelContenderSnapshotConditionInput | null,
};

export type CreateContenderSnapshotMutation = {
  createContenderSnapshot?:  {
    __typename: "ContenderSnapshot",
    id: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    categoryId: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    numberOfUsersPredicting: number,
    numberOfUsersPredictingWin: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateContenderSnapshotMutationVariables = {
  input: UpdateContenderSnapshotInput,
  condition?: ModelContenderSnapshotConditionInput | null,
};

export type UpdateContenderSnapshotMutation = {
  updateContenderSnapshot?:  {
    __typename: "ContenderSnapshot",
    id: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    categoryId: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    numberOfUsersPredicting: number,
    numberOfUsersPredictingWin: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteContenderSnapshotMutationVariables = {
  input: DeleteContenderSnapshotInput,
  condition?: ModelContenderSnapshotConditionInput | null,
};

export type DeleteContenderSnapshotMutation = {
  deleteContenderSnapshot?:  {
    __typename: "ContenderSnapshot",
    id: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    categoryId: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    numberOfUsersPredicting: number,
    numberOfUsersPredictingWin: number,
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
    imdbId: string,
    year?: number | null,
    image?: string | null,
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
    imdbId: string,
    year?: number | null,
    image?: string | null,
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
    imdbId: string,
    year?: number | null,
    image?: string | null,
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
    imdbId: string,
    image?: string | null,
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
    imdbId: string,
    image?: string | null,
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
    imdbId: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
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
    followers?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    leaderboardScores?:  {
      __typename: "ModelLeaderboardPositionConnection",
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

export type GetRelationshipsQueryVariables = {
  id: string,
};

export type GetRelationshipsQuery = {
  getRelationships?:  {
    __typename: "Relationships",
    id: string,
    followedUserId: string,
    followingUserId: string,
    followedUser?:  {
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
    } | null,
    followingUser?:  {
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
    } | null,
    followedPredictionFeed?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRelationshipsQueryVariables = {
  id?: string | null,
  filter?: ModelRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRelationshipsQuery = {
  listRelationships?:  {
    __typename: "ModelRelationshipsConnection",
    items:  Array< {
      __typename: "Relationships",
      id: string,
      followedUserId: string,
      followingUserId: string,
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
    eventId: string,
    categoryId: string,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
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
      isActive?: string | null,
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
    userId: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    ranking: number,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
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
      userId: string,
      contenderId: string,
      ranking: number,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
      predictionSetPredictionsId?: string | null,
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
    leaderboard?:  {
      __typename: "ModelLeaderboardPositionConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    type: EventType,
    expiration?: string | null,
    usersPredicting?:  {
      __typename: "ModelUserPredictingEventConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
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
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserPredictingEventQueryVariables = {
  eventId: string,
  userId: string,
};

export type GetUserPredictingEventQuery = {
  getUserPredictingEvent?:  {
    __typename: "UserPredictingEvent",
    eventId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    eventUsersPredictingId?: string | null,
  } | null,
};

export type ListUserPredictingEventsQueryVariables = {
  eventId?: string | null,
  userId?: ModelIDKeyConditionInput | null,
  filter?: ModelUserPredictingEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserPredictingEventsQuery = {
  listUserPredictingEvents?:  {
    __typename: "ModelUserPredictingEventConnection",
    items:  Array< {
      __typename: "UserPredictingEvent",
      eventId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      eventUsersPredictingId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLeaderboardPositionQueryVariables = {
  userId: string,
  eventId: string,
};

export type GetLeaderboardPositionQuery = {
  getLeaderboardPosition?:  {
    __typename: "LeaderboardPosition",
    userId: string,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
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
    } | null,
    accuracy?: string | null,
    ranking?: number | null,
    createdAt: string,
    updatedAt: string,
    userLeaderboardScoresId?: string | null,
  } | null,
};

export type ListLeaderboardPositionsQueryVariables = {
  userId?: string | null,
  eventId?: ModelIDKeyConditionInput | null,
  filter?: ModelLeaderboardPositionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListLeaderboardPositionsQuery = {
  listLeaderboardPositions?:  {
    __typename: "ModelLeaderboardPositionConnection",
    items:  Array< {
      __typename: "LeaderboardPosition",
      userId: string,
      eventId: string,
      accuracy?: string | null,
      ranking?: number | null,
      createdAt: string,
      updatedAt: string,
      userLeaderboardScoresId?: string | null,
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
    name: CategoryName,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    eventCategoriesId?: string | null,
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
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
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
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    movie?:  {
      __typename: "Movie",
      imdbId: string,
      year?: number | null,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    person?:  {
      __typename: "Person",
      imdbId: string,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    snapshots?:  {
      __typename: "ModelContenderSnapshotConnection",
      nextToken?: string | null,
    } | null,
    activePredictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsRankings?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    predictionsByUser?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId?: string | null,
    contenderPersonId?: string | null,
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
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetContenderSnapshotQueryVariables = {
  id: string,
};

export type GetContenderSnapshotQuery = {
  getContenderSnapshot?:  {
    __typename: "ContenderSnapshot",
    id: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    categoryId: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    numberOfUsersPredicting: number,
    numberOfUsersPredictingWin: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListContenderSnapshotsQueryVariables = {
  id?: string | null,
  filter?: ModelContenderSnapshotFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListContenderSnapshotsQuery = {
  listContenderSnapshots?:  {
    __typename: "ModelContenderSnapshotConnection",
    items:  Array< {
      __typename: "ContenderSnapshot",
      id: string,
      contenderId: string,
      categoryId: string,
      numberOfUsersPredicting: number,
      numberOfUsersPredictingWin: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMovieQueryVariables = {
  imdbId: string,
};

export type GetMovieQuery = {
  getMovie?:  {
    __typename: "Movie",
    imdbId: string,
    year?: number | null,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMoviesQueryVariables = {
  imdbId?: string | null,
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
      imdbId: string,
      year?: number | null,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPersonQueryVariables = {
  imdbId: string,
};

export type GetPersonQuery = {
  getPerson?:  {
    __typename: "Person",
    imdbId: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPeopleQueryVariables = {
  imdbId?: string | null,
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
      imdbId: string,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryRelationshipsByFollowedUserQueryVariables = {
  followedUserId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryRelationshipsByFollowedUserQuery = {
  queryRelationshipsByFollowedUser?:  {
    __typename: "ModelRelationshipsConnection",
    items:  Array< {
      __typename: "Relationships",
      id: string,
      followedUserId: string,
      followingUserId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryRelationshipsByFollowingUserQueryVariables = {
  followingUserId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryRelationshipsByFollowingUserQuery = {
  queryRelationshipsByFollowingUser?:  {
    __typename: "ModelRelationshipsConnection",
    items:  Array< {
      __typename: "Relationships",
      id: string,
      followedUserId: string,
      followingUserId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryPredictionSetByUserByActiveQueryVariables = {
  userId: string,
  isActive?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryPredictionSetByUserByActiveQuery = {
  queryPredictionSetByUserByActive?:  {
    __typename: "ModelPredictionSetConnection",
    items:  Array< {
      __typename: "PredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryPredictionSetByUserByEventByActiveQueryVariables = {
  userId: string,
  eventIdIsActive?: ModelPredictionSetByUserByEventActiveCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryPredictionSetByUserByEventByActiveQuery = {
  queryPredictionSetByUserByEventByActive?:  {
    __typename: "ModelPredictionSetConnection",
    items:  Array< {
      __typename: "PredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryPredictionSetByUserByEventByCreatedAtQueryVariables = {
  userId: string,
  eventIdCreatedAt?: ModelPredictionSetByUserByEventByDateCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryPredictionSetByUserByEventByCreatedAtQuery = {
  queryPredictionSetByUserByEventByCreatedAt?:  {
    __typename: "ModelPredictionSetConnection",
    items:  Array< {
      __typename: "PredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryPredictionSetByUserByCategoryByActiveQueryVariables = {
  userId: string,
  categoryIdIsActive?: ModelPredictionSetByUserByCategoryByActiveCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryPredictionSetByUserByCategoryByActiveQuery = {
  queryPredictionSetByUserByCategoryByActive?:  {
    __typename: "ModelPredictionSetConnection",
    items:  Array< {
      __typename: "PredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryPredictionSetByUserByCategoryByCreatedAtQueryVariables = {
  userId: string,
  categoryIdCreatedAt?: ModelPredictionSetByUserByCategoryByDateCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryPredictionSetByUserByCategoryByCreatedAtQuery = {
  queryPredictionSetByUserByCategoryByCreatedAt?:  {
    __typename: "ModelPredictionSetConnection",
    items:  Array< {
      __typename: "PredictionSet",
      id: string,
      userId: string,
      eventId: string,
      categoryId: string,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryPredictionByContenderByUserQueryVariables = {
  contenderId: string,
  userId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryPredictionByContenderByUserQuery = {
  queryPredictionByContenderByUser?:  {
    __typename: "ModelPredictionConnection",
    items:  Array< {
      __typename: "Prediction",
      id: string,
      predictionSetId: string,
      userId: string,
      contenderId: string,
      ranking: number,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
      predictionSetPredictionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryPredictionByContenderByActiveQueryVariables = {
  contenderId: string,
  isActive?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryPredictionByContenderByActiveQuery = {
  queryPredictionByContenderByActive?:  {
    __typename: "ModelPredictionConnection",
    items:  Array< {
      __typename: "Prediction",
      id: string,
      predictionSetId: string,
      userId: string,
      contenderId: string,
      ranking: number,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
      predictionSetPredictionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryPredictionByContenderByRankingQueryVariables = {
  contenderId: string,
  isActiveRanking?: ModelPredictionByContenderByActiveByRankingCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPredictionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryPredictionByContenderByRankingQuery = {
  queryPredictionByContenderByRanking?:  {
    __typename: "ModelPredictionConnection",
    items:  Array< {
      __typename: "Prediction",
      id: string,
      predictionSetId: string,
      userId: string,
      contenderId: string,
      ranking: number,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
      predictionSetPredictionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryLeaderboardPositionByEventByRankingQueryVariables = {
  eventId: string,
  ranking?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLeaderboardPositionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryLeaderboardPositionByEventByRankingQuery = {
  queryLeaderboardPositionByEventByRanking?:  {
    __typename: "ModelLeaderboardPositionConnection",
    items:  Array< {
      __typename: "LeaderboardPosition",
      userId: string,
      eventId: string,
      accuracy?: string | null,
      ranking?: number | null,
      createdAt: string,
      updatedAt: string,
      userLeaderboardScoresId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QueryContenderSnapshotByContenderByDateQueryVariables = {
  contenderId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelContenderSnapshotFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryContenderSnapshotByContenderByDateQuery = {
  queryContenderSnapshotByContenderByDate?:  {
    __typename: "ModelContenderSnapshotConnection",
    items:  Array< {
      __typename: "ContenderSnapshot",
      id: string,
      contenderId: string,
      categoryId: string,
      numberOfUsersPredicting: number,
      numberOfUsersPredictingWin: number,
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
    followers?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    leaderboardScores?:  {
      __typename: "ModelLeaderboardPositionConnection",
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
    followers?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    leaderboardScores?:  {
      __typename: "ModelLeaderboardPositionConnection",
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
    followers?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByEvent?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    pastPredictionsByCategory?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    leaderboardScores?:  {
      __typename: "ModelLeaderboardPositionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRelationshipsSubscription = {
  onCreateRelationships?:  {
    __typename: "Relationships",
    id: string,
    followedUserId: string,
    followingUserId: string,
    followedUser?:  {
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
    } | null,
    followingUser?:  {
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
    } | null,
    followedPredictionFeed?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRelationshipsSubscription = {
  onUpdateRelationships?:  {
    __typename: "Relationships",
    id: string,
    followedUserId: string,
    followingUserId: string,
    followedUser?:  {
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
    } | null,
    followingUser?:  {
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
    } | null,
    followedPredictionFeed?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRelationshipsSubscription = {
  onDeleteRelationships?:  {
    __typename: "Relationships",
    id: string,
    followedUserId: string,
    followingUserId: string,
    followedUser?:  {
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
    } | null,
    followingUser?:  {
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
    } | null,
    followedPredictionFeed?:  {
      __typename: "ModelPredictionSetConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePredictionSetSubscription = {
  onCreatePredictionSet?:  {
    __typename: "PredictionSet",
    id: string,
    userId: string,
    eventId: string,
    categoryId: string,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePredictionSetSubscription = {
  onUpdatePredictionSet?:  {
    __typename: "PredictionSet",
    id: string,
    userId: string,
    eventId: string,
    categoryId: string,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePredictionSetSubscription = {
  onDeletePredictionSet?:  {
    __typename: "PredictionSet",
    id: string,
    userId: string,
    eventId: string,
    categoryId: string,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePredictionSubscription = {
  onCreatePrediction?:  {
    __typename: "Prediction",
    id: string,
    predictionSetId: string,
    userId: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    ranking: number,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
  } | null,
};

export type OnUpdatePredictionSubscription = {
  onUpdatePrediction?:  {
    __typename: "Prediction",
    id: string,
    predictionSetId: string,
    userId: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    ranking: number,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
  } | null,
};

export type OnDeletePredictionSubscription = {
  onDeletePrediction?:  {
    __typename: "Prediction",
    id: string,
    predictionSetId: string,
    userId: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    ranking: number,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
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
    leaderboard?:  {
      __typename: "ModelLeaderboardPositionConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    type: EventType,
    expiration?: string | null,
    usersPredicting?:  {
      __typename: "ModelUserPredictingEventConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
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
    leaderboard?:  {
      __typename: "ModelLeaderboardPositionConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    type: EventType,
    expiration?: string | null,
    usersPredicting?:  {
      __typename: "ModelUserPredictingEventConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
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
    leaderboard?:  {
      __typename: "ModelLeaderboardPositionConnection",
      nextToken?: string | null,
    } | null,
    awardsBody: AwardsBody,
    year: number,
    type: EventType,
    expiration?: string | null,
    usersPredicting?:  {
      __typename: "ModelUserPredictingEventConnection",
      nextToken?: string | null,
    } | null,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserPredictingEventSubscription = {
  onCreateUserPredictingEvent?:  {
    __typename: "UserPredictingEvent",
    eventId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    eventUsersPredictingId?: string | null,
  } | null,
};

export type OnUpdateUserPredictingEventSubscription = {
  onUpdateUserPredictingEvent?:  {
    __typename: "UserPredictingEvent",
    eventId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    eventUsersPredictingId?: string | null,
  } | null,
};

export type OnDeleteUserPredictingEventSubscription = {
  onDeleteUserPredictingEvent?:  {
    __typename: "UserPredictingEvent",
    eventId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    eventUsersPredictingId?: string | null,
  } | null,
};

export type OnCreateLeaderboardPositionSubscription = {
  onCreateLeaderboardPosition?:  {
    __typename: "LeaderboardPosition",
    userId: string,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
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
    } | null,
    accuracy?: string | null,
    ranking?: number | null,
    createdAt: string,
    updatedAt: string,
    userLeaderboardScoresId?: string | null,
  } | null,
};

export type OnUpdateLeaderboardPositionSubscription = {
  onUpdateLeaderboardPosition?:  {
    __typename: "LeaderboardPosition",
    userId: string,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
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
    } | null,
    accuracy?: string | null,
    ranking?: number | null,
    createdAt: string,
    updatedAt: string,
    userLeaderboardScoresId?: string | null,
  } | null,
};

export type OnDeleteLeaderboardPositionSubscription = {
  onDeleteLeaderboardPosition?:  {
    __typename: "LeaderboardPosition",
    userId: string,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    user?:  {
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
    } | null,
    accuracy?: string | null,
    ranking?: number | null,
    createdAt: string,
    updatedAt: string,
    userLeaderboardScoresId?: string | null,
  } | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    name: CategoryName,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    eventCategoriesId?: string | null,
  } | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?:  {
    __typename: "Category",
    id: string,
    name: CategoryName,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    eventCategoriesId?: string | null,
  } | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?:  {
    __typename: "Category",
    id: string,
    name: CategoryName,
    eventId: string,
    event?:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    contenders?:  {
      __typename: "ModelContenderConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    eventCategoriesId?: string | null,
  } | null,
};

export type OnCreateContenderSubscription = {
  onCreateContender?:  {
    __typename: "Contender",
    id: string,
    categoryId: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    movie?:  {
      __typename: "Movie",
      imdbId: string,
      year?: number | null,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    person?:  {
      __typename: "Person",
      imdbId: string,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    snapshots?:  {
      __typename: "ModelContenderSnapshotConnection",
      nextToken?: string | null,
    } | null,
    activePredictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsRankings?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    predictionsByUser?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId?: string | null,
    contenderPersonId?: string | null,
  } | null,
};

export type OnUpdateContenderSubscription = {
  onUpdateContender?:  {
    __typename: "Contender",
    id: string,
    categoryId: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    movie?:  {
      __typename: "Movie",
      imdbId: string,
      year?: number | null,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    person?:  {
      __typename: "Person",
      imdbId: string,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    snapshots?:  {
      __typename: "ModelContenderSnapshotConnection",
      nextToken?: string | null,
    } | null,
    activePredictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsRankings?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    predictionsByUser?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId?: string | null,
    contenderPersonId?: string | null,
  } | null,
};

export type OnDeleteContenderSubscription = {
  onDeleteContender?:  {
    __typename: "Contender",
    id: string,
    categoryId: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    movie?:  {
      __typename: "Movie",
      imdbId: string,
      year?: number | null,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    person?:  {
      __typename: "Person",
      imdbId: string,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    snapshots?:  {
      __typename: "ModelContenderSnapshotConnection",
      nextToken?: string | null,
    } | null,
    activePredictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    activePredictionsRankings?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    predictionsByUser?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId?: string | null,
    contenderPersonId?: string | null,
  } | null,
};

export type OnCreateContenderSnapshotSubscription = {
  onCreateContenderSnapshot?:  {
    __typename: "ContenderSnapshot",
    id: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    categoryId: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    numberOfUsersPredicting: number,
    numberOfUsersPredictingWin: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateContenderSnapshotSubscription = {
  onUpdateContenderSnapshot?:  {
    __typename: "ContenderSnapshot",
    id: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    categoryId: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    numberOfUsersPredicting: number,
    numberOfUsersPredictingWin: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteContenderSnapshotSubscription = {
  onDeleteContenderSnapshot?:  {
    __typename: "ContenderSnapshot",
    id: string,
    contenderId: string,
    contender?:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId?: string | null,
      contenderPersonId?: string | null,
    } | null,
    categoryId: string,
    category?:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    } | null,
    numberOfUsersPredicting: number,
    numberOfUsersPredictingWin: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMovieSubscription = {
  onCreateMovie?:  {
    __typename: "Movie",
    imdbId: string,
    year?: number | null,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMovieSubscription = {
  onUpdateMovie?:  {
    __typename: "Movie",
    imdbId: string,
    year?: number | null,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMovieSubscription = {
  onDeleteMovie?:  {
    __typename: "Movie",
    imdbId: string,
    year?: number | null,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePersonSubscription = {
  onCreatePerson?:  {
    __typename: "Person",
    imdbId: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePersonSubscription = {
  onUpdatePerson?:  {
    __typename: "Person",
    imdbId: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePersonSubscription = {
  onDeletePerson?:  {
    __typename: "Person",
    imdbId: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
