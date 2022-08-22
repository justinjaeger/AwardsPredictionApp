import { useEffect } from 'react';

export const useAsyncEffect = (effect: () => Promise<void>, deps: any[]) => {
  useEffect(() => {
    (async () => {
      await effect();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
