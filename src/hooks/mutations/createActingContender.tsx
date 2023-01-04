import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import ApiServices from '../../services/graphql';
import { iPrediction } from '../../types';

const useMutationCreateActingContender = () => {
  const [isComplete, setIsComplete] = useState<boolean>(true);
  const [response, setResponse] = useState<iPrediction | undefined>(undefined);

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
    onSuccess: (res) => {
      setResponse(res.data);
      setIsComplete(true);
    },
  });

  return { mutate, isLoading, isComplete, response };
};

export default useMutationCreateActingContender;
