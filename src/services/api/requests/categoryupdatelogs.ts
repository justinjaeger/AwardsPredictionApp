import api from '../api';

export const getCategoryUpdateLogs = async ({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) => {
  return await api.get<Record<number, boolean>>(
    `categoryupdatelogs/${userId}/${eventId}`,
  );
};
