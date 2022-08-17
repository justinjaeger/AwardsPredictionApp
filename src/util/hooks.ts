import { useEffect } from 'react';

export const useAsyncEffect = (effect: () => Promise<void>, deps: any[]) => {
  useEffect(() => {
    (async () => {
      await effect();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const useAsync = (
  asyncFn: () => Promise<void>,
  onSuccess: (args: any) => void,
) => {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((data: any) => {
      if (isActive) onSuccess(data);
    });
    return () => {
      isActive = false;
    };
  }, [asyncFn, onSuccess]);
};
