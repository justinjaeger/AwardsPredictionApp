import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import MongoApi from '../../services/api/requests';
import { CategoryName, Contender, WithId } from '../../types/api';
import { useTmdbDataStore } from '../../context/TmdbDataStore';

const useMutationCreateSongContender = () => {
  const { storeTmdbDataFromContender } = useTmdbDataStore();

  const [isComplete, setIsComplete] = useState<boolean>(true);
  const [response, setResponse] = useState<WithId<Contender> | undefined>(undefined);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: {
      eventId: string;
      category: CategoryName;
      movieTmdbId: number;
      artist: string;
      title: string;
    }) => {
      setIsComplete(false);
      return MongoApi.createContender({
        eventId: params.eventId,
        categoryName: params.category,
        movieTmdbId: params.movieTmdbId,
        songTitle: params.title,
        songArtist: params.artist,
      });
    },
    onSuccess: ({ data }) => {
      // put the movie data in the cache
      if (data) {
        storeTmdbDataFromContender(data);
      }
      setResponse(data ?? undefined);
      setIsComplete(true);
    },
  });

  return { mutate, isLoading, isComplete, response };
};

export default useMutationCreateSongContender;
