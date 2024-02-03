import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../models';

const useQueryGetAllEvents = () => {
  const { userRole } = useAuth();
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () => {
      const { data: events } = await MongoApi.getEvents({});
      const filteredEvents = (events ?? []).filter((event) => {
        if (event.isHidden) {
          return userRole === UserRole.ADMIN;
        }
        return true;
      });
      return filteredEvents;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetAllEvents;
