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
  followedUser: User,
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
};

export type ModelPredictionSetConditionInput = {
  userId?: ModelIDInput | null,
  eventId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  and?: Array< ModelPredictionSetConditionInput | null > | null,
  or?: Array< ModelPredictionSetConditionInput | null > | null,
  not?: ModelPredictionSetConditionInput | null,
};

export type PredictionSet = {
  __typename: "PredictionSet",
  id: string,
  userId: string,
  eventId: string,
  categoryId: string,
  predictions?: ModelPredictionConnection | null,
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
  userId: string,
  predictionSetId: string,
  contenderId: string,
  contender: Contender,
  ranking: number,
  createdAt: string,
  updatedAt: string,
  predictionSetPredictionsId?: string | null,
  contenderPredictionsId?: string | null,
};

export type Contender = {
  __typename: "Contender",
  id: string,
  categoryId: string,
  category: Category,
  movie: Movie,
  person?: Person | null,
  song?: Song | null,
  predictions?: ModelPredictionConnection | null,
  didReceiveNominationOrWin?: boolean | null,
  numberOfUsersPredictingWin: number,
  numberOfUsersPredictingNom: number,
  numberOfUsersPredictingUnranked: number,
  createdAt: string,
  updatedAt: string,
  categoryContendersId?: string | null,
  contenderMovieId: string,
  contenderPersonId?: string | null,
  contenderSongId?: string | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  name: CategoryName,
  type: CategoryType,
  eventId: string,
  event: Event,
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


export enum CategoryType {
  FILM = "FILM",
  PERFORMANCE = "PERFORMANCE",
  SONG = "SONG",
}


export type Event = {
  __typename: "Event",
  id: string,
  categories?: ModelCategoryConnection | null,
  awardsBody: AwardsBody,
  year: number,
  type: EventType,
  expiration?: string | null,
  isActive?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
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


export type ModelContenderConnection = {
  __typename: "ModelContenderConnection",
  items:  Array<Contender | null >,
  nextToken?: string | null,
};

export type Movie = {
  __typename: "Movie",
  id: string,
  tmdbId: number,
  studio?: string | null,
  createdAt: string,
  updatedAt: string,
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
  title: string,
  artist: string,
  movie: Movie,
  createdAt: string,
  updatedAt: string,
  songMovieId: string,
};

export type UpdatePredictionSetInput = {
  id: string,
  userId?: string | null,
  eventId?: string | null,
  categoryId?: string | null,
};

export type DeletePredictionSetInput = {
  id: string,
};

export type CreatePredictionInput = {
  id?: string | null,
  userId: string,
  predictionSetId: string,
  contenderId: string,
  ranking: number,
  predictionSetPredictionsId?: string | null,
  contenderPredictionsId?: string | null,
};

export type ModelPredictionConditionInput = {
  userId?: ModelIDInput | null,
  predictionSetId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  and?: Array< ModelPredictionConditionInput | null > | null,
  or?: Array< ModelPredictionConditionInput | null > | null,
  not?: ModelPredictionConditionInput | null,
  predictionSetPredictionsId?: ModelIDInput | null,
  contenderPredictionsId?: ModelIDInput | null,
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
  userId?: string | null,
  predictionSetId?: string | null,
  contenderId?: string | null,
  ranking?: number | null,
  predictionSetPredictionsId?: string | null,
  contenderPredictionsId?: string | null,
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

export type CreateCategoryInput = {
  id?: string | null,
  name: CategoryName,
  type: CategoryType,
  eventId: string,
  eventCategoriesId?: string | null,
};

export type ModelCategoryConditionInput = {
  name?: ModelCategoryNameInput | null,
  type?: ModelCategoryTypeInput | null,
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

export type ModelCategoryTypeInput = {
  eq?: CategoryType | null,
  ne?: CategoryType | null,
};

export type UpdateCategoryInput = {
  id: string,
  name?: CategoryName | null,
  type?: CategoryType | null,
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
  numberOfUsersPredictingWin: number,
  numberOfUsersPredictingNom: number,
  numberOfUsersPredictingUnranked: number,
  categoryContendersId?: string | null,
  contenderMovieId: string,
  contenderPersonId?: string | null,
  contenderSongId?: string | null,
};

export type ModelContenderConditionInput = {
  categoryId?: ModelIDInput | null,
  didReceiveNominationOrWin?: ModelBooleanInput | null,
  numberOfUsersPredictingWin?: ModelIntInput | null,
  numberOfUsersPredictingNom?: ModelIntInput | null,
  numberOfUsersPredictingUnranked?: ModelIntInput | null,
  and?: Array< ModelContenderConditionInput | null > | null,
  or?: Array< ModelContenderConditionInput | null > | null,
  not?: ModelContenderConditionInput | null,
  categoryContendersId?: ModelIDInput | null,
  contenderMovieId?: ModelIDInput | null,
  contenderPersonId?: ModelIDInput | null,
  contenderSongId?: ModelIDInput | null,
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
  numberOfUsersPredictingWin?: number | null,
  numberOfUsersPredictingNom?: number | null,
  numberOfUsersPredictingUnranked?: number | null,
  categoryContendersId?: string | null,
  contenderMovieId: string,
  contenderPersonId?: string | null,
  contenderSongId?: string | null,
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
  title: string,
  artist: string,
  songMovieId: string,
};

export type ModelSongConditionInput = {
  title?: ModelStringInput | null,
  artist?: ModelStringInput | null,
  and?: Array< ModelSongConditionInput | null > | null,
  or?: Array< ModelSongConditionInput | null > | null,
  not?: ModelSongConditionInput | null,
  songMovieId?: ModelIDInput | null,
};

export type UpdateSongInput = {
  id: string,
  title?: string | null,
  artist?: string | null,
  songMovieId: string,
};

export type DeleteSongInput = {
  id: string,
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
  and?: Array< ModelPredictionSetFilterInput | null > | null,
  or?: Array< ModelPredictionSetFilterInput | null > | null,
  not?: ModelPredictionSetFilterInput | null,
};

export type ModelPredictionSetConnection = {
  __typename: "ModelPredictionSetConnection",
  items:  Array<PredictionSet | null >,
  nextToken?: string | null,
};

export type ModelPredictionFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  predictionSetId?: ModelIDInput | null,
  contenderId?: ModelIDInput | null,
  ranking?: ModelIntInput | null,
  and?: Array< ModelPredictionFilterInput | null > | null,
  or?: Array< ModelPredictionFilterInput | null > | null,
  not?: ModelPredictionFilterInput | null,
  predictionSetPredictionsId?: ModelIDInput | null,
  contenderPredictionsId?: ModelIDInput | null,
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

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelCategoryNameInput | null,
  type?: ModelCategoryTypeInput | null,
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
  numberOfUsersPredictingWin?: ModelIntInput | null,
  numberOfUsersPredictingNom?: ModelIntInput | null,
  numberOfUsersPredictingUnranked?: ModelIntInput | null,
  and?: Array< ModelContenderFilterInput | null > | null,
  or?: Array< ModelContenderFilterInput | null > | null,
  not?: ModelContenderFilterInput | null,
  categoryContendersId?: ModelIDInput | null,
  contenderMovieId?: ModelIDInput | null,
  contenderPersonId?: ModelIDInput | null,
  contenderSongId?: ModelIDInput | null,
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
  title?: ModelStringInput | null,
  artist?: ModelStringInput | null,
  and?: Array< ModelSongFilterInput | null > | null,
  or?: Array< ModelSongFilterInput | null > | null,
  not?: ModelSongFilterInput | null,
  songMovieId?: ModelIDInput | null,
};

export type ModelSongConnection = {
  __typename: "ModelSongConnection",
  items:  Array<Song | null >,
  nextToken?: string | null,
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
    userId: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      numberOfUsersPredictingWin: number,
      numberOfUsersPredictingNom: number,
      numberOfUsersPredictingUnranked: number,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId: string,
      contenderPersonId?: string | null,
      contenderSongId?: string | null,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
    contenderPredictionsId?: string | null,
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
    userId: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      numberOfUsersPredictingWin: number,
      numberOfUsersPredictingNom: number,
      numberOfUsersPredictingUnranked: number,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId: string,
      contenderPersonId?: string | null,
      contenderSongId?: string | null,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
    contenderPredictionsId?: string | null,
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
    userId: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      numberOfUsersPredictingWin: number,
      numberOfUsersPredictingNom: number,
      numberOfUsersPredictingUnranked: number,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId: string,
      contenderPersonId?: string | null,
      contenderSongId?: string | null,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
    contenderPredictionsId?: string | null,
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
    type: EventType,
    expiration?: string | null,
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
    awardsBody: AwardsBody,
    year: number,
    type: EventType,
    expiration?: string | null,
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
    awardsBody: AwardsBody,
    year: number,
    type: EventType,
    expiration?: string | null,
    isActive?: string | null,
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
    name: CategoryName,
    type: CategoryType,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    },
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
    type: CategoryType,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    },
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
    type: CategoryType,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    },
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
    category:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      type: CategoryType,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    },
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    song?:  {
      __typename: "Song",
      id: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
      songMovieId: string,
    } | null,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    numberOfUsersPredictingWin: number,
    numberOfUsersPredictingNom: number,
    numberOfUsersPredictingUnranked: number,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId: string,
    contenderPersonId?: string | null,
    contenderSongId?: string | null,
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
      name: CategoryName,
      type: CategoryType,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    },
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    song?:  {
      __typename: "Song",
      id: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
      songMovieId: string,
    } | null,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    numberOfUsersPredictingWin: number,
    numberOfUsersPredictingNom: number,
    numberOfUsersPredictingUnranked: number,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId: string,
    contenderPersonId?: string | null,
    contenderSongId?: string | null,
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
      name: CategoryName,
      type: CategoryType,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    },
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    song?:  {
      __typename: "Song",
      id: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
      songMovieId: string,
    } | null,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    numberOfUsersPredictingWin: number,
    numberOfUsersPredictingNom: number,
    numberOfUsersPredictingUnranked: number,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId: string,
    contenderPersonId?: string | null,
    contenderSongId?: string | null,
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
    title: string,
    artist: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    songMovieId: string,
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
    title: string,
    artist: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    songMovieId: string,
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
    title: string,
    artist: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    songMovieId: string,
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
    userId: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      numberOfUsersPredictingWin: number,
      numberOfUsersPredictingNom: number,
      numberOfUsersPredictingUnranked: number,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId: string,
      contenderPersonId?: string | null,
      contenderSongId?: string | null,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
    contenderPredictionsId?: string | null,
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
      userId: string,
      predictionSetId: string,
      contenderId: string,
      ranking: number,
      createdAt: string,
      updatedAt: string,
      predictionSetPredictionsId?: string | null,
      contenderPredictionsId?: string | null,
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
    type: EventType,
    expiration?: string | null,
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

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory?:  {
    __typename: "Category",
    id: string,
    name: CategoryName,
    type: CategoryType,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    },
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
      type: CategoryType,
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
    category:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      type: CategoryType,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    },
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    song?:  {
      __typename: "Song",
      id: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
      songMovieId: string,
    } | null,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    numberOfUsersPredictingWin: number,
    numberOfUsersPredictingNom: number,
    numberOfUsersPredictingUnranked: number,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId: string,
    contenderPersonId?: string | null,
    contenderSongId?: string | null,
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
      numberOfUsersPredictingWin: number,
      numberOfUsersPredictingNom: number,
      numberOfUsersPredictingUnranked: number,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId: string,
      contenderPersonId?: string | null,
      contenderSongId?: string | null,
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
    title: string,
    artist: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    songMovieId: string,
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
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
      songMovieId: string,
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

export type OnUpdateRelationshipsSubscription = {
  onUpdateRelationships?:  {
    __typename: "Relationships",
    id: string,
    followedUserId: string,
    followingUserId: string,
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

export type OnDeleteRelationshipsSubscription = {
  onDeleteRelationships?:  {
    __typename: "Relationships",
    id: string,
    followedUserId: string,
    followingUserId: string,
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
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePredictionSubscription = {
  onCreatePrediction?:  {
    __typename: "Prediction",
    id: string,
    userId: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      numberOfUsersPredictingWin: number,
      numberOfUsersPredictingNom: number,
      numberOfUsersPredictingUnranked: number,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId: string,
      contenderPersonId?: string | null,
      contenderSongId?: string | null,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
    contenderPredictionsId?: string | null,
  } | null,
};

export type OnUpdatePredictionSubscription = {
  onUpdatePrediction?:  {
    __typename: "Prediction",
    id: string,
    userId: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      numberOfUsersPredictingWin: number,
      numberOfUsersPredictingNom: number,
      numberOfUsersPredictingUnranked: number,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId: string,
      contenderPersonId?: string | null,
      contenderSongId?: string | null,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
    contenderPredictionsId?: string | null,
  } | null,
};

export type OnDeletePredictionSubscription = {
  onDeletePrediction?:  {
    __typename: "Prediction",
    id: string,
    userId: string,
    predictionSetId: string,
    contenderId: string,
    contender:  {
      __typename: "Contender",
      id: string,
      categoryId: string,
      didReceiveNominationOrWin?: boolean | null,
      numberOfUsersPredictingWin: number,
      numberOfUsersPredictingNom: number,
      numberOfUsersPredictingUnranked: number,
      createdAt: string,
      updatedAt: string,
      categoryContendersId?: string | null,
      contenderMovieId: string,
      contenderPersonId?: string | null,
      contenderSongId?: string | null,
    },
    ranking: number,
    createdAt: string,
    updatedAt: string,
    predictionSetPredictionsId?: string | null,
    contenderPredictionsId?: string | null,
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
    type: EventType,
    expiration?: string | null,
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
    awardsBody: AwardsBody,
    year: number,
    type: EventType,
    expiration?: string | null,
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
    awardsBody: AwardsBody,
    year: number,
    type: EventType,
    expiration?: string | null,
    isActive?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    name: CategoryName,
    type: CategoryType,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    },
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
    type: CategoryType,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    },
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
    type: CategoryType,
    eventId: string,
    event:  {
      __typename: "Event",
      id: string,
      awardsBody: AwardsBody,
      year: number,
      type: EventType,
      expiration?: string | null,
      isActive?: string | null,
      createdAt: string,
      updatedAt: string,
    },
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
    category:  {
      __typename: "Category",
      id: string,
      name: CategoryName,
      type: CategoryType,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    },
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    song?:  {
      __typename: "Song",
      id: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
      songMovieId: string,
    } | null,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    numberOfUsersPredictingWin: number,
    numberOfUsersPredictingNom: number,
    numberOfUsersPredictingUnranked: number,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId: string,
    contenderPersonId?: string | null,
    contenderSongId?: string | null,
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
      name: CategoryName,
      type: CategoryType,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    },
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    song?:  {
      __typename: "Song",
      id: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
      songMovieId: string,
    } | null,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    numberOfUsersPredictingWin: number,
    numberOfUsersPredictingNom: number,
    numberOfUsersPredictingUnranked: number,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId: string,
    contenderPersonId?: string | null,
    contenderSongId?: string | null,
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
      name: CategoryName,
      type: CategoryType,
      eventId: string,
      createdAt: string,
      updatedAt: string,
      eventCategoriesId?: string | null,
    },
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    person?:  {
      __typename: "Person",
      id: string,
      tmdbId: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    song?:  {
      __typename: "Song",
      id: string,
      title: string,
      artist: string,
      createdAt: string,
      updatedAt: string,
      songMovieId: string,
    } | null,
    predictions?:  {
      __typename: "ModelPredictionConnection",
      nextToken?: string | null,
    } | null,
    didReceiveNominationOrWin?: boolean | null,
    numberOfUsersPredictingWin: number,
    numberOfUsersPredictingNom: number,
    numberOfUsersPredictingUnranked: number,
    createdAt: string,
    updatedAt: string,
    categoryContendersId?: string | null,
    contenderMovieId: string,
    contenderPersonId?: string | null,
    contenderSongId?: string | null,
  } | null,
};

export type OnCreateMovieSubscription = {
  onCreateMovie?:  {
    __typename: "Movie",
    id: string,
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
    title: string,
    artist: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    songMovieId: string,
  } | null,
};

export type OnUpdateSongSubscription = {
  onUpdateSong?:  {
    __typename: "Song",
    id: string,
    title: string,
    artist: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    songMovieId: string,
  } | null,
};

export type OnDeleteSongSubscription = {
  onDeleteSong?:  {
    __typename: "Song",
    id: string,
    title: string,
    artist: string,
    movie:  {
      __typename: "Movie",
      id: string,
      tmdbId: number,
      studio?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    songMovieId: string,
  } | null,
};
