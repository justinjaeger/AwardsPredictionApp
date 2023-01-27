import {
  AwardsBody,
  CategoryIsShortlisted,
  CategoryName,
  CategoryType,
  ContenderVisibility,
  EventStatus,
  PredictionType,
} from '../../API';
import { iPredictionSet, iUser } from '../../types';
import ApiServices from '../graphql';

const getUser = async (id: string | undefined): Promise<iUser | undefined> => {
  if (id === undefined) return undefined;
  const { data } = await ApiServices.getUser(id);
  const user = data?.getUser;
  if (!user) return undefined;
  // TODO: These predictions are not in order
  const predictionSets: iPredictionSet[] =
    user?.predictionSets?.items.map((ps) => ({
      id: ps?.id || '',
      category: {
        id: ps?.category?.id || '',
        name: ps?.category?.name || CategoryName.PICTURE, // fake values
        type: ps?.category?.type || CategoryType.FILM, // fake values
        isShortlisted: ps?.category?.isShortlisted || CategoryIsShortlisted.FALSE, // fake values
      },
      event: {
        id: ps?.category?.id || '',
        awardsBody: ps?.event.awardsBody || AwardsBody.ACADEMY_AWARDS,
        year: ps?.event.year || 0,
        status: ps?.event.status || EventStatus.ARCHIVED,
      },
      createdAt: ps?.createdAt || '',
      predictions: (ps?.predictions?.items || []).map((p) => ({
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
      })),
    })) || [];
  // format events data
  return {
    id: user.id,
    email: user.email,
    username: user.username || undefined,
    name: user.name || undefined,
    bio: user.bio || undefined,
    image: user.image || undefined,
    role: user.role,
    predictionSets,
  };
};

export default getUser;
