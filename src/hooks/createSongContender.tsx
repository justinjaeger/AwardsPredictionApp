import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ApiServices from '../services/graphql';
import { QueryKeys } from '../types';

const useMutationCreateSongContender = () => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: {
      eventId: string;
      categoryId: string;
      movieTmdbId: number;
      artist: string;
      title: string;
    }) => {
      setIsComplete(false);
      return ApiServices.createSongContender({
        eventId: params.eventId,
        categoryId: params.categoryId,
        movieTmdbId: params.movieTmdbId,
        artist: params.artist,
        title: params.title,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.COMMUNITY_EVENT] });
      setIsComplete(true);
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationCreateSongContender;
