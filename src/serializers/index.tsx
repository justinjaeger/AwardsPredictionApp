import { ContenderVisibility, PredictionType, UserRole } from '../API';
import { iPrediction, iUser } from '../types';

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
    // some of these values we don't care about or use so they can be default
    console.log(
      'authFollowingUserIds.includes(serialized.id)',
      authFollowingUserIds.includes(serialized.id),
    );
    console.log('authFollowingUserIds', authFollowingUserIds);
    return {
      ...serialized,
      authUserIsFollowing: authFollowingUserIds.includes(serialized.id),
    };
  });
};

const Serializers = {
  predictionSerializer,
  predictionsSerializer,
  historyPredictionSerializer,
  historyPredictionsSerializer,
  userSerializer,
  usersSerializer,
  getUsersWithIsFollowing,
};

export default Serializers;
