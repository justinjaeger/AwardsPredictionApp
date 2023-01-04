import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import ApiServices from '../../services/graphql';
import { iPrediction } from '../../types';

const useMutationCreateContender = () => {
  const [isComplete, setIsComplete] = useState<boolean>(true);
  const [response, setResponse] = useState<iPrediction | undefined>(undefined);

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
    onSuccess: (res) => {
      setResponse(res.data);
      setIsComplete(true);
    },
  });

  return { mutate, isLoading, isComplete, response };
};

export default useMutationCreateContender;
