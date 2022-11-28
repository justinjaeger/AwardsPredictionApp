import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ApiServices from '../services/graphql';
import { QueryKeys } from '../store/types';

const useMutationCreateActingContender = () => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: {
      eventId: string;
      categoryId: string;
      movieTmdbId: number;
      personTmdbId: number;
    }) => {
      setIsComplete(false);
      return ApiServices.createActingContender({
        eventId: params.eventId,
        categoryId: params.categoryId,
        movieTmdbId: params.movieTmdbId,
        personTmdbId: params.personTmdbId,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.COMMUNITY_EVENT] });
      setIsComplete(true);
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationCreateActingContender;
