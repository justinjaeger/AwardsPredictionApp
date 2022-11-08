import { getCategorySlots } from '../../constants/categories';
import { iCategory, iNumberPredicting, iPrediction } from '../../store/types';
import ApiServices from '../graphql';

const getCommunityPredictionsByCategory = async (
  category: iCategory,
): Promise<iPrediction[]> => {
  const categoryName = category.name;
  const { data: _contenders } = await ApiServices.getContendersByCategory(category.id);
  const contenders = _contenders?.listContenders?.items;
  if (!contenders) return [];
  // Format the contenders
  const data: iPrediction[] = [];
  contenders.forEach((con) => {
    if (!con) return;
    const contenderPredictions = con?.predictions?.items;
    if (!contenderPredictions) return;

    const slots = getCategorySlots(con.event.year, con.event.awardsBody, categoryName);

    const np: iNumberPredicting = {
      predictingWin: 0,
      predictingNom: 0,
      predictingUnranked: 0,
    };
    contenderPredictions.forEach((cp) => {
      const someUsersRanking = cp?.ranking || 0;
      if (someUsersRanking === 1) {
        np.predictingWin += 1;
      } else if (someUsersRanking <= slots) {
        np.predictingNom += 1;
      } else {
        np.predictingUnranked += 1;
      }
    });
    const communityPrediction: iPrediction = {
      ranking: 0,
      communityRankings: np,
      contenderId: con.id || '', // won't happpen
      contenderMovie: con.movie || undefined, // won't happen
      contenderPerson: con.person || undefined,
      contenderSong: con.song || undefined,
    };
    data.push(communityPrediction);
  });
  return data;
};

export default getCommunityPredictionsByCategory;
