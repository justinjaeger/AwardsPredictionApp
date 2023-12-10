import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Contender, WithId } from '../../types/api';
import MongoApi from '../../services/api/requests';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { iCreateContenderPayload } from '../../services/api/requests/contender';
import { useRouteParams } from '../useRouteParams';

const useMutationCreateContender = ({
  onSuccess,
}: {
  onSuccess: (response: WithId<Contender>) => void;
}) => {
  const { storeTmdbDataFromContender } = useTmdbDataStore();
  const { event: _event } = useRouteParams();
  const event = _event!;

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: iCreateContenderPayload) => {
      setIsComplete(false);
      return MongoApi.getOrCreateContender(params);
    },
    onSuccess: ({ data }) => {
      // put the movie data in the cache
      if (data && event) {
        storeTmdbDataFromContender(data, event.year);
        onSuccess(data);
      }
      setIsComplete(true);
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationCreateContender;
