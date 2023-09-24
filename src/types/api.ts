type ObjectId = string;

export type WithId<T> = T & {
  _id: ObjectId;
};

/**
 * Keep in sync between client and server
 */

export enum Phase {
  CLOSED = 'CLOSED',
  SHORTLIST = 'SHORTLIST',
  NOMINATION = 'NOMINATION',
  WINNER = 'WINNER',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  TESTER = 'TESTER',
  USER = 'USER',
}

export enum AwardsBody {
  ACADEMY_AWARDS = 'ACADEMY_AWARDS',
  GOLDEN_GLOBES = 'GOLDEN_GLOBES',
  CRITICS_CHOICE = 'CRITICS_CHOICE',
  BAFTA = 'BAFTA',
  HCA = 'HCA',
  PGA = 'PGA',
  SAG = 'SAG',
  DGA = 'DGA',
  WGA = 'WGA',
  ADG = 'ADG',
  MAKEUP_GUILD = 'MAKEUP_GUILD',
  CDG = 'CDG',
  ASC = 'ASC',
  MPSE = 'MPSE',
}

export enum EventStatus {
  NOMS_STAGING = 'NOMS_STAGING', // before nominations go public
  NOMS_LIVE = 'NOMS_LIVE', // when everyone can predict nominations
  WINS_STAGING = 'WINS_STAGING', // when nominations are being announced + prepared
  WINS_LIVE = 'WINS_LIVE', // when everyone can predict wins
  ARCHIVED = 'ARCHIVED', // when winners have been announced and such
}

export enum CategoryType {
  FILM = 'FILM',
  PERFORMANCE = 'PERFORMANCE',
  SONG = 'SONG',
}

export enum CategoryName {
  PICTURE = 'PICTURE',
  DIRECTOR = 'DIRECTOR',
  ACTOR = 'ACTOR',
  ACTRESS = 'ACTRESS',
  SUPPORTING_ACTOR = 'SUPPORTING_ACTOR',
  SUPPORTING_ACTRESS = 'SUPPORTING_ACTRESS',
  ORIGINAL_SCREENPLAY = 'ORIGINAL_SCREENPLAY',
  ADAPTED_SCREENPLAY = 'ADAPTED_SCREENPLAY',
  SCREENPLAY = 'SCREENPLAY',
  INTERNATIONAL = 'INTERNATIONAL',
  ANIMATED = 'ANIMATED',
  DOCUMENTARY = 'DOCUMENTARY',
  EDITING = 'EDITING',
  CINEMATOGRAPHY = 'CINEMATOGRAPHY',
  PRODUCTION_DESIGN = 'PRODUCTION_DESIGN',
  COSTUMES = 'COSTUMES',
  MAKEUP = 'MAKEUP',
  VISUAL_EFFECTS = 'VISUAL_EFFECTS',
  SOUND = 'SOUND',
  SCORE = 'SCORE',
  SONG = 'SONG',
  SHORT_ANIMATED = 'SHORT_ANIMATED',
  SHORT_DOCUMENTARY = 'SHORT_DOCUMENTARY',
  SHORT_LIVE_ACTION = 'SHORT_LIVE_ACTION',
  ENSEMBLE = 'ENSEMBLE',
  COMEDY_PICTURE = 'COMEDY_PICTURE',
  COMEDY_ACTOR = 'COMEDY_ACTOR',
  COMEDY_ACTRESS = 'COMEDY_ACTRESS',
  ACTION_PICTURE = 'ACTION_PICTURE',
  YOUNG_ACTOR = 'YOUNG_ACTOR',
  RISING_STAR = 'RISING_STAR',
  DEBUT = 'DEBUT',
  FIRST_SCREENPLAY = 'FIRST_SCREENPLAY',
  BRITISH_PICTURE = 'BRITISH_PICTURE',
  ANIMATED_PERFORMANCE = 'ANIMATED_PERFORMANCE',
  BLOCKBUSTER = 'BLOCKBUSTER',
  ACTING_ACHIEVEMENT = 'ACTING_ACHIEVEMENT',
  FEMALE_DIRECTOR = 'FEMALE_DIRECTOR',
  MALE_DIRECTOR = 'MALE_DIRECTOR',
  INDIE_PICTURE = 'INDIE_PICTURE',
  BREAKTHROUGH = 'BREAKTHROUGH',
}

export type CategoryUpdateLog = {
  userId: ObjectId;
  eventId: ObjectId;
  category: CategoryName;
  yyyymmddUpdates: Record<number, boolean>;
};

export type Contender = {
  eventId: ObjectId;
  movieId: ObjectId;
  category: CategoryName;
  isHidden?: boolean;
  accolade?: Phase;
  songId?: ObjectId;
  personId?: ObjectId;
  numPredicting?: Record<number, number>; // for community predictions only
  amplify_id?: string;
};

export type iCategories = Record<
  CategoryName,
  {
    type: CategoryType;
    name: string;
    slots?: number; // 5 by default
    phase?: Phase;
    shortlistDateTime?: Date;
    hideUntilShortlisted?: boolean;
  }
>;

export type EventModel = {
  categories: iCategories;
  awardsBody: AwardsBody;
  year: number;
  status: EventStatus;
  liveAt?: Date;
  nomDateTime?: Date;
  winDateTime?: Date;
  amplify_id?: string;
};

export type IMovieCategoryCredit =
  | 'directing'
  | 'screenplay'
  | 'cinematography'
  | 'costumes'
  | 'editing'
  | 'productionDesign'
  | 'score'
  | 'vfx';

export type Movie = {
  tmdbId: number;
  title?: string;
  year?: number;
  studio?: string;
  plot?: string;
  imdbId?: string;
  cast?: string;
  posterPath?: string;
  backdropPath?: string;
  categoryCredits: Record<IMovieCategoryCredit, string[]>;
  amplify_id?: string;
};

export type Person = {
  tmdbId: number;
  imdbId?: string;
  name?: string;
  posterPath?: string;
  amplify_id?: string;
};

export type iPredictions = Array<{
  contenderId: ObjectId;
  ranking: number;
  movieId: ObjectId;
  personId?: ObjectId;
  songId?: ObjectId;
  numPredicting?: Record<number, number>; // only applies to community predictions
}>;

export type iCategoryPrediction = {
  type: CategoryType;
  createdAt: Date;
  predictions: iPredictions;
  phase?: Phase | undefined;
};

export type PredictionSet = {
  userId: ObjectId | 'community';
  eventId: ObjectId;
  yyyymmdd: number;
  categories: {
    [key in CategoryName]: iCategoryPrediction;
  };
  amplify_id?: string;
};

export type Relationship = {
  followedUserId: ObjectId;
  followingUserId: ObjectId;
  amplify_id?: string;
};

export type RelationshipWithUser = Relationship & {
  followedUserList: User[];
  followingUserList: User[];
};

export type Song = {
  movieId: ObjectId;
  title: string;
  artist?: string;
  amplify_id?: string;
};

export type Token = {
  userId: ObjectId;
  token: string;
};

export type iRecentPredictions = Array<{
  awardsBody: string;
  category: string;
  year: number;
  predictionSetId: ObjectId;
  createdAt: Date;
  topPredictions: iPredictions;
}>;

export type User = {
  email: string;
  oauthId?: string;
  username?: string;
  name?: string;
  bio?: string;
  role?: UserRole;
  image?: string;
  followingCount?: number;
  followerCount?: number;
  eventsPredicting?: ObjectId[];
  recentPredictionSets?: iRecentPredictions;
  amplify_id?: string;
};
