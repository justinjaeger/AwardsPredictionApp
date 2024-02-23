import { useEffect, useState } from 'react';

const getKey = (deps: any[]) => deps.map((d) => JSON.stringify(d)).join('.');

// Note: should just use flatlist. Look at implementation in DynamicHeaderFlatListWrapper
export const useIsTrueAfterJavaScriptUpdates = (deps: any[]) => {
  const newKey = getKey(deps);

  const [prevKey, setPrevKey] = useState<string>(newKey);

  useEffect(() => {
    setTimeout(() => setPrevKey(newKey), 0);
  }, deps);

  return prevKey === newKey;
};
