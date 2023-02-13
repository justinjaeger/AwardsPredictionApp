import {
  AwardsBody,
  CategoryIsShortlisted,
  CategoryName,
  CategoryType,
  ContenderVisibility,
  EventStatus,
  PredictionType,
} from '../../API';
import {
  iCategory,
  iEvent,
  iIndexedCategories,
  iPredictionSet,
  iUser,
} from '../../types';
import { sortPersonalPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';

const getUserProfile = async (
  id: string | undefined,
  authUserId: string | undefined,
): Promise<iUser | undefined> => {
  if (id === undefined || authUserId === undefined) return undefined;
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
      const indexedCategories: iIndexedCategories = {};
      const categories = ps?.event.categories?.items || [];
      categories.forEach((c) => {
        if (!c) return undefined;
        const cat: iCategory = {
          id: c.id,
          type: c.type,
          name: c.name,
          isShortlisted: c.isShortlisted || CategoryIsShortlisted.FALSE,
        };
        indexedCategories[c.id] = cat;
      });
      const event: iEvent = {
        id: ps?.event.id || '',
        awardsBody: ps?.event.awardsBody || AwardsBody.ACADEMY_AWARDS,
        year: ps?.event.year || 0,
        status: ps?.event.status || EventStatus.ARCHIVED,
        categories: indexedCategories,
        nominationDateTime: ps?.event.nominationDateTime || undefined,
        winDateTime: ps?.event.winDateTime || undefined,
        createdAt: ps?.createdAt || '',
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
  console.log('userProfile', user.followers);
  return userProfile;
};

export default getUserProfile;
