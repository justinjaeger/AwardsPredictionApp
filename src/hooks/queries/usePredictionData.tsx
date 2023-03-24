import { useCategory } from '../../context/CategoryContext';
import { iEvent } from '../../types';
import useQueryCommunityOrPersonalEvent from './getCommunityOrPersonalEvent';
import useQueryCommunityOrPersonalHistory from './getCommunityOrPersonalHistory';

// note: MUST pass tab through params
const usePredictionData = (tab: 'community' | 'personal', userId?: string) => {
  const { date, event: _event } = useCategory();

  const event = _event as iEvent;

  const today = new Date();
  // we don't want to show history for the current day
  const showHistory = date && date.getDate() !== today.getDate();

  // Contemporary predictions
  const {
    data: contemporaryData,
    isLoading: isLoadingComtemporary,
    refetch,
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
  const refreshData = showHistory ? async () => {} : refetch; // don't need to refresh on history
  const isLoading =
    isLoadingComtemporary || isLoadingHistory || predictionData === undefined;

  return { predictionData, isLoading, refreshData };
};

export default usePredictionData;
