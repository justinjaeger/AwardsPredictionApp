import { useCategory } from '../../context/CategoryContext';
import { useAuth } from '../../context/UserContext';
import { iEvent } from '../../types';
import useQueryCommunityOrPersonalEvent from './getCommunityOrPersonalEvent';
import useQueryCommunityOrPersonalHistory from './getCommunityOrPersonalHistory';

// note: MUST pass tab through params
const usePredictionData = (tab: 'community' | 'personal') => {
  const { date, event: _event } = useCategory();
  const { userId: _userId } = useAuth();

  const event = _event as iEvent;
  const userId = _userId as string;

  const today = new Date();
  // we don't want to show history for the current day
  const showHistory = date && date.getDay() !== today.getDay();

  // Contemporary predictions
  const {
    data: contemporaryData,
    isLoading: isLoadingComtemporary,
  } = useQueryCommunityOrPersonalEvent(tab, !!userId, { event, userId });

  // Past predictions
  const { historyData, isLoading: isLoadingHistory } = useQueryCommunityOrPersonalHistory(
    tab,
    {
      event,
      date: showHistory ? date : undefined,
      userId,
    },
  );

  const predictionData = showHistory ? historyData : contemporaryData;
  const isLoading = isLoadingComtemporary || isLoadingHistory;

  return { predictionData, isLoading };
};

export default usePredictionData;
