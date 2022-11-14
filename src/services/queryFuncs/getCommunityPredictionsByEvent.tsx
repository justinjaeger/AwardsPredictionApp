import { getCategorySlots } from '../../constants/categories';
import {
  iEvent,
  iIndexedPredictionsByCategory,
  iNumberPredicting,
  iPrediction,
} from '../../store/types';
import { sortCommunityPredictions } from '../../util/sortPredictions';
import ApiServices from '../graphql';

const getCommunityPredictionsByEvent = async (event: iEvent) => {
  const eventId = event.id;
  const { data: _contenders } = await ApiServices.getContendersByEvent(eventId);
  const contenders = _contenders?.listContenders?.items;
  if (!contenders) return;
  // Format the contenders
  const data: iIndexedPredictionsByCategory = {};
  contenders.forEach((con) => {
    if (!con) return;
    const categoryId = con.categoryContendersId || '';
    const categoryName = con.category.name;
    const contenderPredictions = con?.predictions?.items;
    if (!contenderPredictions) return;

    if (!categoryName) return; // shouldn't happen
    const slots = getCategorySlots(event.year, event.awardsBody, categoryName);

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
    if (!data[categoryId]) data[categoryId] = [];
    data[categoryId].push(communityPrediction);
  });
  // sort all prediction lists within categories
  const sortedData: iIndexedPredictionsByCategory = {};
  Object.entries(data).forEach(([catId, ps]) => {
    const sortedPs = sortCommunityPredictions(ps);
    sortedData[catId] = sortedPs;
  });
  return sortedData;
};

export default getCommunityPredictionsByEvent;
