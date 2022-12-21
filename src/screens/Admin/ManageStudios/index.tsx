import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { ListMoviesQuery } from '../../../API';
import ApiServices from '../../../services/graphql';
import { useAsyncEffect } from '../../../util/hooks';
import StudioItem from './StudioItem';

const ManageStudios = () => {
  const [movies, setMovies] = useState<ListMoviesQuery>();

  useAsyncEffect(async () => {
    const { data } = await ApiServices.getAllMovies();
    setMovies(data);
  }, []);

  const ms = movies?.listMovies?.items;

  if (!ms) return null;

  const sortedItems = ms.sort((m) => {
    if (!m) return 0;
    return !!m.studio === false ? -1 : 1;
  });

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      {sortedItems.map((m) => {
        if (!m) return null;
        return (
          <StudioItem
            movieTmdbId={m.tmdbId}
            movieId={m.id}
            movieStudio={m.studio || undefined}
          />
        );
      })}
    </ScrollView>
  );
};

export default ManageStudios;
