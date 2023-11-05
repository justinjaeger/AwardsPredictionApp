import { AppInfo } from '../../../types/api';
import api from '../api';

export const getAppInfo = async () => {
  return await api.get<AppInfo>('appinfo');
};
