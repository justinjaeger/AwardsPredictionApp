import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import ApiServices from '../../services/graphql';
import { iPrediction } from '../../types';

const useMutationCreateSongContender = () => {
  const [isComplete, setIsComplete] = useState<boolean>(true);
  const [response, setResponse] = useState<iPrediction | undefined>(undefined);

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
    onSuccess: (res) => {
      setResponse(res.data);
      setIsComplete(true);
    },
  });

  return { mutate, isLoading, isComplete, response };
};

export default useMutationCreateSongContender;
