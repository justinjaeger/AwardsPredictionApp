import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import ContenderDetails from '../../../components/ContenderDetails';
import { HomeParamList } from '../../../navigation/types';

const ContenderDetailsScreen = () => {
  const {
    params: { categoryType, contender, personTmdb },
  } = useRoute<RouteProp<HomeParamList, 'ContenderDetails'>>();

  const movieTmdbId = contender.movie.tmdbId;

  return (
    <ScrollView contentContainerStyle={{ alignSelf: 'center', padding: '5%' }}>
      <ContenderDetails
        movieTmdbId={movieTmdbId}
        personTmdbId={personTmdb}
        categoryType={categoryType}
      />
    </ScrollView>
  );
};

export default ContenderDetailsScreen;
