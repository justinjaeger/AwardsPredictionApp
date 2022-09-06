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
    <ScrollView
      contentContainerStyle={{
        alignSelf: 'center',
        paddingTop: '5%',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <ContenderDetails
        movieTmdbId={movieTmdbId}
        personTmdbId={personTmdb}
        song={contender.song || undefined}
        categoryType={categoryType}
      />
    </ScrollView>
  );
};

export default ContenderDetailsScreen;
