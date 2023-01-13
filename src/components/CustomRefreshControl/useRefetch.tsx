import { useCallback, useState } from 'react';

export const useRefresh = (callback: () => Promise<any>) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    callback()
      .catch((err) => {
        console.error('refresh error', err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  return { refreshing, onRefresh };
};
