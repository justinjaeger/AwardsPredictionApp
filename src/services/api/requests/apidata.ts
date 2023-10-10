import { ApiData, WithId } from '../../../types/api';
import api from '../api';

export const getApiData = async ({ eventYear }: { eventYear: number }) => {
  return await api.get<WithId<ApiData> | null>(`apidata?eventYear=${eventYear}`);
};
