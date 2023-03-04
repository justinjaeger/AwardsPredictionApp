/* eslint-disable sonarjs/prefer-immediate-return */
import {
  AwardsBody,
  CategoryIsShortlisted,
  CategoryName,
  CategoryType,
  ContenderVisibility,
  EventStatus,
  PredictionType,
} from '../../API';
import { iEvent, iPredictionSet, iUser } from '../../types';
import { sortPersonalPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';

const getUserProfile = async (
  id: string | undefined,
  authUserId: string | undefined,
): Promise<iUser | undefined> => {
  if (id === undefined) return undefined;
  const { data } = await ApiServices.getUserProfile(id, authUserId);
  const user = data?.getUser;
  if (!user) return undefined;
  const predictionSets: iPredictionSet[] =
    user?.predictionSets?.items.map((ps) => {
      const predictions = (ps?.predictions?.items || []).map((p) => ({
        ranking: p?.ranking || 0,
        accolade: p?.contender.accolade || undefined,
        visibility: p?.contender.visibility || ContenderVisibility.VISIBLE,
        predictionType: ps?.type || PredictionType.NOMINATION,
        contenderId: p?.contenderId || '',
        // @ts-ignore - the typescript isn't this nested
        contenderMovie: p?.contender.movie || undefined,
        // @ts-ignore - the typescript isn't this nested
        contenderPerson: p?.contender.person || undefined,
        // @ts-ignore - the typescript isn't this nested
        contenderSong: p?.contender.song || undefined,
        lastUpdated: p?.updatedAt || '',
      }));
      const event: iEvent = {
        id: ps?.event.id || '',
        awardsBody: ps?.event.awardsBody || AwardsBody.ACADEMY_AWARDS,
        year: ps?.event.year || 0,
        status: ps?.event.status || EventStatus.ARCHIVED,
        categories: {},
        nominationDateTime: ps?.event.nominationDateTime || undefined,
        winDateTime: ps?.event.winDateTime || undefined,
        createdAt: ps?.createdAt || '',
        liveAt: ps?.event.liveAt || undefined,
      };
      // orders the predictions
      const sortedPredictions = sortPersonalPredictions(predictions);
      return {
        id: ps?.id || '',
        category: {
          id: ps?.category?.id || '',
          name: ps?.category?.name || CategoryName.PICTURE, // fake values
          type: ps?.category?.type || CategoryType.FILM, // fake values
          isShortlisted: ps?.category?.isShortlisted || CategoryIsShortlisted.FALSE, // fake values
        },
        event,
        createdAt: ps?.createdAt || '',
        predictions: sortedPredictions,
      };
    }) || [];
  // format events data
  const userProfile = {
    id: user.id,
    email: user.email,
    username: user.username || undefined,
    name: user.name || undefined,
    bio: user.bio || undefined,
    image: user.image || undefined,
    role: user.role,
    predictionSets,
    authUserIsFollowing: (user?.followers?.items || []).length > 0,
    isFollowingAuthUser: (user?.following?.items || []).length > 0,
  };
  return userProfile;
};

export default getUserProfile;
