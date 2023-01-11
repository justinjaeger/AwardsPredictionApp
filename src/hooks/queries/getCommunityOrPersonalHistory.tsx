import { useState } from 'react';
import getCommunityHistory from '../../services/queryFuncs/getCommunityHistory';
import getPersonalHistory from '../../services/queryFuncs/getPersonalHistory';
import { iEvent, iIndexedPredictionsByCategory } from '../../types';
import { useAsyncEffect } from '../../util/hooks';

const useQueryCommunityOrPersonalHistory = (
  tab: 'personal' | 'community',
  params: { event: iEvent; date: Date | undefined; userId?: string | undefined },
) => {
  const { event, date, userId } = params;

  const [historyData, setHistoryData] = useState<
    iIndexedPredictionsByCategory | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // if date is enabled, fetch history
  useAsyncEffect(async () => {
    if (date) {
      setIsLoading(true);
      const data =
        tab === 'community'
          ? await getCommunityHistory(event, date)
          : userId
          ? await getPersonalHistory(event.id, userId, date)
          : undefined;
      setIsLoading(false);
      setHistoryData(data);
    }
  }, [date]);

  return { historyData, isLoading };
};

export default useQueryCommunityOrPersonalHistory;
