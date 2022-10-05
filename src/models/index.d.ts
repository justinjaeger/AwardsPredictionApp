import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
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
  MPSE = "MPSE"
}

export enum EventType {
  WIN = "WIN",
  NOMINATION = "NOMINATION"
}

export enum CategoryType {
  FILM = "FILM",
  PERFORMANCE = "PERFORMANCE",
  SONG = "SONG"
}

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
  BREAKTHROUGH = "BREAKTHROUGH"
}

export enum CateogrySet {
  ACADEMY_AWARDS_2023 = "ACADEMY_AWARDS_2023"
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RelationshipsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LeaderboardPositionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EventMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ContenderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MovieMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PersonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SongMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ContenderSnapshotMetaData = {
  readOnlyFields: 'updatedAt';
}

type PredictionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserPredictingEventMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PredictionSetMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly username?: string | null;
  readonly name?: string | null;
  readonly bio?: string | null;
  readonly image?: string | null;
  readonly role: UserRole | keyof typeof UserRole;
  readonly followers?: (Relationships | null)[] | null;
  readonly following?: (Relationships | null)[] | null;
  readonly leaderboardScores?: (LeaderboardPosition | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Relationships {
  readonly id: string;
  readonly followedUser: User;
  readonly followingUser: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Relationships, RelationshipsMetaData>);
  static copyOf(source: Relationships, mutator: (draft: MutableModel<Relationships, RelationshipsMetaData>) => MutableModel<Relationships, RelationshipsMetaData> | void): Relationships;
}

export declare class LeaderboardPosition {
  readonly id: string;
  readonly event: Event;
  readonly user: User;
  readonly accuracy?: string | null;
  readonly ranking?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userLeaderboardScoresId?: string | null;
  constructor(init: ModelInit<LeaderboardPosition, LeaderboardPositionMetaData>);
  static copyOf(source: LeaderboardPosition, mutator: (draft: MutableModel<LeaderboardPosition, LeaderboardPositionMetaData>) => MutableModel<LeaderboardPosition, LeaderboardPositionMetaData> | void): LeaderboardPosition;
}

export declare class Event {
  readonly id: string;
  readonly categories?: (Category | null)[] | null;
  readonly leaderboard?: (LeaderboardPosition | null)[] | null;
  readonly awardsBody: AwardsBody | keyof typeof AwardsBody;
  readonly year: number;
  readonly type: EventType | keyof typeof EventType;
  readonly expiration?: string | null;
  readonly usersPredicting?: (UserPredictingEvent | null)[] | null;
  readonly isActive?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Event, EventMetaData>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event, EventMetaData>) => MutableModel<Event, EventMetaData> | void): Event;
}

export declare class Category {
  readonly id: string;
  readonly name: CategoryName | keyof typeof CategoryName;
  readonly type: CategoryType | keyof typeof CategoryType;
  readonly event: Event;
  readonly contenders?: (Contender | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly eventCategoriesId?: string | null;
  constructor(init: ModelInit<Category, CategoryMetaData>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category, CategoryMetaData>) => MutableModel<Category, CategoryMetaData> | void): Category;
}

export declare class Contender {
  readonly id: string;
  readonly category: Category;
  readonly movie: Movie;
  readonly person?: Person | null;
  readonly song?: Song | null;
  readonly snapshots?: (ContenderSnapshot | null)[] | null;
  readonly predictions?: (Prediction | null)[] | null;
  readonly didReceiveNominationOrWin?: boolean | null;
  readonly numberOfUsersPredictingNom?: number | null;
  readonly numberOfUsersPredictingUnranked?: number | null;
  readonly numberOfUsersPredictingWin?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly categoryContendersId?: string | null;
  readonly contenderMovieId: string;
  readonly contenderPersonId?: string | null;
  readonly contenderSongId?: string | null;
  constructor(init: ModelInit<Contender, ContenderMetaData>);
  static copyOf(source: Contender, mutator: (draft: MutableModel<Contender, ContenderMetaData>) => MutableModel<Contender, ContenderMetaData> | void): Contender;
}

export declare class Movie {
  readonly id: string;
  readonly tmdbId: number;
  readonly studio?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Movie, MovieMetaData>);
  static copyOf(source: Movie, mutator: (draft: MutableModel<Movie, MovieMetaData>) => MutableModel<Movie, MovieMetaData> | void): Movie;
}

export declare class Person {
  readonly id: string;
  readonly tmdbId: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Person, PersonMetaData>);
  static copyOf(source: Person, mutator: (draft: MutableModel<Person, PersonMetaData>) => MutableModel<Person, PersonMetaData> | void): Person;
}

export declare class Song {
  readonly id: string;
  readonly title: string;
  readonly artist: string;
  readonly movie: Movie;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly songMovieId: string;
  constructor(init: ModelInit<Song, SongMetaData>);
  static copyOf(source: Song, mutator: (draft: MutableModel<Song, SongMetaData>) => MutableModel<Song, SongMetaData> | void): Song;
}

export declare class ContenderSnapshot {
  readonly id: string;
  readonly contender: Contender;
  readonly categoryId: string;
  readonly category: Category;
  readonly numberOfUsersPredictingNom?: number | null;
  readonly numberOfUsersPredictingUnranked?: number | null;
  readonly numberOfUsersPredictingWin?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ContenderSnapshot, ContenderSnapshotMetaData>);
  static copyOf(source: ContenderSnapshot, mutator: (draft: MutableModel<ContenderSnapshot, ContenderSnapshotMetaData>) => MutableModel<ContenderSnapshot, ContenderSnapshotMetaData> | void): ContenderSnapshot;
}

export declare class Prediction {
  readonly id: string;
  readonly userId: string;
  readonly predictionSetId: string;
  readonly contender: Contender;
  readonly ranking: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly contenderPredictionsId?: string | null;
  readonly predictionSetPredictionsId?: string | null;
  constructor(init: ModelInit<Prediction, PredictionMetaData>);
  static copyOf(source: Prediction, mutator: (draft: MutableModel<Prediction, PredictionMetaData>) => MutableModel<Prediction, PredictionMetaData> | void): Prediction;
}

export declare class UserPredictingEvent {
  readonly id: string;
  readonly eventId: string;
  readonly userId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly eventUsersPredictingId?: string | null;
  constructor(init: ModelInit<UserPredictingEvent, UserPredictingEventMetaData>);
  static copyOf(source: UserPredictingEvent, mutator: (draft: MutableModel<UserPredictingEvent, UserPredictingEventMetaData>) => MutableModel<UserPredictingEvent, UserPredictingEventMetaData> | void): UserPredictingEvent;
}

export declare class PredictionSet {
  readonly id: string;
  readonly userId: string;
  readonly eventId: string;
  readonly categoryId: string;
  readonly predictions?: (Prediction | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PredictionSet, PredictionSetMetaData>);
  static copyOf(source: PredictionSet, mutator: (draft: MutableModel<PredictionSet, PredictionSetMetaData>) => MutableModel<PredictionSet, PredictionSetMetaData> | void): PredictionSet;
}