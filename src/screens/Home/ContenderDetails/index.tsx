import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import MovieDetails from '../../../components/MovieDetails';
import { HomeParamList } from '../../../navigation/types';
import TmdbMovieCache from '../../../services/cache/tmdbMovie';
import { iCachedTmdbMovie } from '../../../services/cache/types';

const ContenderDetails = () => {
  const {
    params: { contender },
  } = useRoute<RouteProp<HomeParamList, 'ContenderDetails'>>();
  const navigation = useNavigation();

  const [movie, setMovie] = useState<iCachedTmdbMovie | undefined>();

  const tmdbId = contender.movie.tmdbId;

  useEffect(() => {
    TmdbMovieCache.get(tmdbId).then((m) => {
      setMovie(m);
    });
  }, []);

  // Set header title
  useLayoutEffect(() => {
    if (movie) {
      navigation.setOptions({
        headerTitle: movie.title,
      });
    }
  }, [navigation, movie]);

  return (
    <ScrollView contentContainerStyle={{ alignSelf: 'center', padding: '5%' }}>
      <MovieDetails tmdbId={tmdbId} />
    </ScrollView>
  );
};

export default ContenderDetails;
