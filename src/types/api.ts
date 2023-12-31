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
  NO_AUTH = 'NO_AUTH',
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

export type EventUpdateLog = {
  userId: ObjectId;
  eventId: ObjectId;
  yyyymmddUpdates: Record<number, boolean>;
};

export type Contender = {
  eventId: ObjectId;
  category: CategoryName;
  movieTmdbId: number;
  personTmdbId?: number;
  songId?: string;
  isHidden?: boolean;
  accolade?: Phase;
  numPredicting?: Record<number, number>; // for community predictions only
  amplify_id?: string;
};

export type iCategory = {
  type: CategoryType;
  name: string;
  slots?: number; // 5 by default
  shortlistSlots?: number;
  winSlots?: number; // 1 by default, just in case there's a tie
  isShortlisted?: boolean;
  isHidden?: boolean;
  isHiddenBeforeShortlist?: boolean;
  isHiddenBeforeNoms?: boolean;
};

export type iLeaderboard = {
  phase: Phase;
  noShorts: boolean;
  numPredicted: number;
  topPercentageAccuracy: number;
  medianPercentageAccuracy: number;
  percentageAccuracyDistribution: { [percentageAccuracy: number]: number };
};

export type iIndexedEventLeaderboards = {
  [key: string]: iLeaderboard;
};

export type EventModel = {
  categories: Record<CategoryName, iCategory>;
  awardsBody: AwardsBody;
  year: number;
  status: EventStatus;
  liveAt?: Date;
  shortlistDateTime?: Date;
  nomDateTime?: Date;
  winDateTime?: Date;
  leaderboards?: iIndexedEventLeaderboards;
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

export type iPrediction = {
  contenderId: ObjectId;
  ranking: number;
  movieTmdbId: number;
  personTmdbId?: number;
  songId?: string;
  numPredicting?: Record<number, number>; // only applies to community predictions
};

export type iCategoryPrediction = {
  createdAt: Date;
  predictions: iPrediction[];
  totalUsersPredicting?: number; // only applies to community predictions
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
  movieTmdbId: number;
  title: string;
  artist?: string;
  amplify_id?: string;
};

export type Token = {
  userId: ObjectId;
  token: string;
};

export type iRecentPrediction = {
  awardsBody: string;
  category: string;
  year: number;
  predictionSetId: ObjectId;
  createdAt: Date;
  topPredictions: iPrediction[];
};

export type iCategoriesPredicting = {
  [eventId: string]: {
    [categoryName: string]: {
      createdAt: Date;
    };
  };
};

export type iLeaderboardRanking = {
  eventId: ObjectId;
  phase: Phase;
  noShorts: boolean;
  rank: number;
  percentageAccuracy: number;
  riskiness: number;
  predictionSetId: ObjectId;
};

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
  eventsPredicting?: Record<string, string[]>; // key is event, value is array of categories
  categoriesPredicting?: iCategoriesPredicting; // ...and replace with this
  recentPredictionSets?: iRecentPrediction[];
  leaderboardRankings?: iLeaderboardRanking[];
  amplify_id?: string;
};

export type ApiData = {
  eventYear: number;
} & Record<string, ((Movie | Person | Song) & { type: CategoryType }) | number>;

export type AppInfo = {
  latestVersion: string;
  forceUpdateIfBelow: string;
  alert: string;
};
