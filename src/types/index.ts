import {
  AwardsBody,
  CategoryName,
  CategoryType,
  ContenderAccolade,
  ContenderVisibility,
  CategoryIsShortlisted,
  EventStatus,
  UserRole,
  PredictionType,
} from '../API';

export enum QueryKeys {
  EVENTS = 'events',
  USER = 'user',
  PERSONAL_EVENT = 'personal-predictions-by-event',
  COMMUNITY_EVENT = 'community-predictions-by-event',
}

// ex: { 1: 142 } (ranking, numberPredictingRanking)
export type iIndexedRankings = {
  [ranking: number]: number;
};

// represents predictions for ONE predictionSet
export type iPrediction = {
  ranking: number; // PERSONAL ONLY
  visibility: ContenderVisibility;
  accolade: ContenderAccolade | undefined;
  predictionType: PredictionType;
  indexedRankings?: iIndexedRankings; // COMMUNITY ONLY
  contenderId: string;
  contenderMovie?:
    | {
        id: string;
        tmdbId: number;
        studio?: string | null | undefined;
      }
    | undefined;
  contenderPerson?:
    | {
        id: string;
        tmdbId: number;
      }
    | undefined;
  contenderSong?:
    | {
        id: string;
        title: string;
        artist: string;
      }
    | undefined;
};

export type iIndexedPredictionsByCategory = {
  [categoryId: string]: { updatedAt: string; predictions: iPrediction[] };
};

export type iCategory = {
  id: string;
  name: CategoryName;
  type: CategoryType;
  isShortlisted: CategoryIsShortlisted;
};

export type iIndexedCategories = {
  [categoryId: string]: iCategory;
};

export type iEvent = {
  id: string;
  categories: iIndexedCategories;
  awardsBody: AwardsBody;
  year: number;
  status: EventStatus;
  nominationDateTime: string | undefined;
  winDateTime: string | undefined;
  createdAt: string;
};

export type iIndexedEvents = {
  [eventId: string]: iEvent;
};

export type iPredictionSet = {
  id: string;
  event: {
    id: string;
    awardsBody: AwardsBody;
    year: number;
    status: EventStatus;
  };
  category: {
    id: string;
    name: CategoryName;
    type: CategoryType;
    isShortlisted: CategoryIsShortlisted;
  };
  predictions: iPrediction[];
  createdAt: string;
};

export type iUser = {
  id: string;
  email: string;
  username: string | undefined;
  name: string | undefined;
  bio: string | undefined;
  image: string | undefined;
  role: UserRole;
  predictionSets?: iPredictionSet[];
};
