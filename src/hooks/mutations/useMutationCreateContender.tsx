import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Contender, WithId } from '../../types/api';
import MongoApi from '../../services/api/requests';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { useEvent } from '../../context/EventContext';
import { iCreateContenderPayload } from '../../services/api/requests/contender';

const useMutationCreateFilmContender = () => {
  const { storeTmdbDataFromContender } = useTmdbDataStore();
  const { event } = useEvent();

  const [isComplete, setIsComplete] = useState<boolean>(true);
  const [response, setResponse] = useState<WithId<Contender> | undefined>(undefined);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: iCreateContenderPayload) => {
      setIsComplete(false);
      return MongoApi.getOrCreateContender(params);
    },
    onSuccess: ({ data }) => {
      // put the movie data in the cache
      if (data && event) {
        storeTmdbDataFromContender(data, event.year);
      }
      setResponse(data ?? undefined);
      setIsComplete(true);
    },
  });

  return { mutate, isLoading, isComplete, response };
};

export default useMutationCreateFilmContender;
