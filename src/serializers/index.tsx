import {
  AwardsBody,
  CategoryIsShortlisted,
  CategoryName,
  CategoryType,
  ContenderVisibility,
  EventStatus,
  PredictionType,
  UserRole,
} from '../API';
import { iCategory, iEvent, iPrediction, iUser } from '../types';

const predictionSerializer = (
  p: any, // __typename: "Prediction"
  predictionType?: PredictionType | undefined | null,
): iPrediction => {
  // Have to parse this because the field is a json stringified object
  const indexedRankings = (p?.indexedRankings ? JSON.parse(p?.indexedRankings) : {}) as {
    [key: number]: number;
  };
  return {
    ranking: p?.ranking || 0,
    accolade: p?.contender.accolade || undefined,
    visibility: p?.contender.visibility || ContenderVisibility.VISIBLE,
    predictionType: predictionType || PredictionType.NOMINATION,
    contenderId: p?.contenderId || '',
    contenderMovie: p?.contender.movie || undefined,
    contenderPerson: p?.contender.person || undefined,
    contenderSong: p?.contender.song || undefined,
    lastUpdated: p?.updatedAt || '',
    indexedRankings, // only on community predictions
  };
};

const predictionsSerializer = (
  predictions: any[], // __typename: "Prediction"
  predictionType?: PredictionType | undefined | null,
): iPrediction[] => predictions.map((p) => predictionSerializer(p, predictionType));

const historyPredictionSerializer = (
  p: any, // __typename: "HistoryPrediction"
  predictionType?: PredictionType | undefined | null,
): iPrediction => {
  const contender = p?.contender;
  // Have to parse this because the field is a json stringified object
  const indexedRankings = (p?.indexedRankings ? JSON.parse(p?.indexedRankings) : {}) as {
    [key: number]: number;
  };
  return {
    ranking: p?.ranking || 0,
    accolade: contender.accolade || undefined,
    predictionType: predictionType || PredictionType.NOMINATION,
    indexedRankings: indexedRankings,
    visibility: contender.visibility || ContenderVisibility.VISIBLE,
    contenderId: contender.id || '',
    contenderMovie: contender.movie || undefined,
    contenderPerson: contender.person || undefined,
    contenderSong: contender.song || undefined,
  };
};

const historyPredictionsSerializer = (
  predictions: any[], // __typename: "Prediction"
  predictionType?: PredictionType | undefined | null,
): iPrediction[] =>
  predictions.map((p) => historyPredictionSerializer(p, predictionType));

const userSerializer = (u: any): iUser => {
  return {
    id: u?.id || '',
    email: u?.email || '',
    role: u?.role || UserRole.USER,
    username: u?.username || undefined,
    name: u?.name || undefined,
    image: u?.image || undefined,
    bio: u?.bio || undefined,
  };
};

const usersSerializer = (
  users: any[], // __typename: "User"
): iUser[] => users.map((u) => userSerializer(u));

const getUsersWithIsFollowing = (
  users: any[], // __typename: "User"
  authFollowingUserIds: string[],
): iUser[] => {
  return users.map((u) => {
    const serialized = userSerializer(u);
    return {
      ...serialized,
      authUserIsFollowing: authFollowingUserIds.includes(serialized.id),
    };
  });
};

// NOTE: will return blank categories
const eventSerializer = (
  event: any, // __typename: "Event"
  createdAt?: string | undefined | null,
): iEvent => ({
  id: event.id || '',
  awardsBody: event.awardsBody || AwardsBody.ACADEMY_AWARDS,
  year: event.year || 0,
  status: event.status || EventStatus.ARCHIVED,
  categories: {},
  nominationDateTime: event.nominationDateTime || undefined,
  winDateTime: event.winDateTime || undefined,
  createdAt: createdAt || event.createdAt || '',
  liveAt: event.liveAt || undefined,
});

const categorySerializer = (
  category: any, // __typename: "Category"
): iCategory => ({
  id: category?.id || '',
  name: category?.name || CategoryName.PICTURE, // fake values
  type: category?.type || CategoryType.FILM, // fake values
  isShortlisted: category?.isShortlisted || CategoryIsShortlisted.FALSE, // fake values
});

const Serializers = {
  predictionSerializer,
  predictionsSerializer,
  historyPredictionSerializer,
  historyPredictionsSerializer,
  userSerializer,
  usersSerializer,
  getUsersWithIsFollowing,
  eventSerializer,
  categorySerializer,
};

export default Serializers;
