import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ApiServices from '../../services/graphql';
import { QueryKeys } from '../../types';

const useMutationCreateContender = () => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: {
      eventId: string;
      categoryId: string;
      movieTmdbId: number;
    }) => {
      setIsComplete(false);
      return ApiServices.createFilmContender({
        eventId: params.eventId,
        categoryId: params.categoryId,
        movieTmdbId: params.movieTmdbId,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.COMMUNITY_EVENT] });
      setIsComplete(true);
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationCreateContender;
