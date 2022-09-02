import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import MovieDetails from '../../../components/MovieDetails';
import PerformanceDetails from '../../../components/PerformanceDetails';
import { CategoryType } from '../../../models';
import { HomeParamList } from '../../../navigation/types';

const ContenderDetails = () => {
  const {
    params: { categoryType, contender, personTmdb },
  } = useRoute<RouteProp<HomeParamList, 'ContenderDetails'>>();

  const movieTmdbId = contender.movie.tmdbId;

  return (
    <ScrollView contentContainerStyle={{ alignSelf: 'center', padding: '5%' }}>
      {categoryType === CategoryType.PERFORMANCE && personTmdb ? (
        <PerformanceDetails personId={personTmdb} movieId={movieTmdbId} />
      ) : (
        <MovieDetails tmdbId={movieTmdbId} />
      )}
    </ScrollView>
  );
};

export default ContenderDetails;
