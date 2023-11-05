import { useState } from 'react';
import { version } from '../../package.json';
import MongoApi from '../services/api/requests';
import { useAsyncEffect } from '../util/hooks';

export const useForceUpdate = () => {
  const [forceUpdate, setForceUpdate] = useState<boolean>(false);

  useAsyncEffect(async () => {
    const { data: appInfo } = await MongoApi.getAppInfo();
    if (appInfo) {
      const currentVersion = parseFloat(version);
      const forceUpdateIfBelowVersion = parseFloat(appInfo.forceUpdateIfBelow);
      if (currentVersion < forceUpdateIfBelowVersion) {
        setForceUpdate(true);
      }
    }
  }, []);

  return forceUpdate;
};
