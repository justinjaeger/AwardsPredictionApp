import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import ApiServices from '../../services/graphql';
import { sortPersonalPredictions } from '../../util/sortPredictions';
import { getPersonalPredictionsByEvent } from '../reducers/predictions';
import { iEvent, iIndexedPredictionsByCategory } from '../types';

const getData = async (event: iEvent, userId: string) => {
  console.error('thunkGetPersonalPredictionsByEvent');
  const eventId = event.id;
  const { data: predictionSets } = await ApiServices.getPersonalPredictionsByEvent(
    eventId,
    userId,
  );
  const pSets = predictionSets?.listPredictionSets?.items;
  if (!pSets) return; // handle in some other way?
  // Format the prediction sets
  const data: iIndexedPredictionsByCategory = {};
  pSets.forEach((ps) => {
    const categoryId = ps?.predictionSetCategoryId || '';
    const predictions = (ps?.predictions?.items || []).map((p) => ({
      ranking: p?.ranking || 0,
      contenderId: p?.contenderPredictionsId || '',
      contenderMovie: p?.contender.movie || undefined,
      contenderPerson: p?.contender.person || undefined,
      contenderSongId: p?.contender.contenderSongId,
    }));
    const sortedPredictions = sortPersonalPredictions(predictions);
    data[categoryId] = sortedPredictions;
  });
  return data;
};

const thunkGetPersonalPredictionsByEvent = (
  event: iEvent,
  userId: string,
): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  const asyncReponse = await getData(event, userId);
  if (asyncReponse) {
    dispatch(
      getPersonalPredictionsByEvent({
        eventId: event.id,
        personalPredictionData: asyncReponse,
      }),
    );
  }
};

export default thunkGetPersonalPredictionsByEvent;
