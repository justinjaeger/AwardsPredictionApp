import { AwardsBody, CategoryName, CategoryType, EventType } from '../API';

export enum QueryKeys {
  EVENTS = 'events',
  PERSONAL_CATEGORY = 'personal-predictions-by-category',
  PERSONAL_EVENT = 'personal-predictions-by-event',
  COMMUNITY_CATEGORY = 'community-predictions-by-category',
  COMMUNITY_EVENT = 'community-predictions-by-event',
}

export type iNumberPredicting = {
  predictingWin: number;
  predictingNom: number;
  predictingUnranked: number;
};

// represents predictions for ONE predictionSet
export type iPrediction = {
  ranking: number; // PERSONAL ONLY
  communityRankings?: iNumberPredicting; // COMMUNITY ONLY
  contenderId: string;
  contenderMovie:
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
  [categoryId: string]: iPrediction[];
};

export type iIndexedPredictionsByEvent = {
  [eventId: string]: iIndexedPredictionsByCategory;
};

export type iCategory = {
  id: string;
  name: CategoryName;
  type: CategoryType;
};

export type iIndexedCategories = {
  [categoryId: string]: iCategory;
};

export type iEvent = {
  id: string;
  categories: iIndexedCategories;
  awardsBody: AwardsBody;
  year: number;
  type: EventType;
  expiration: string;
  isActive: string | undefined;
};

export type iIndexedEvents = {
  [eventId: string]: iEvent;
};
