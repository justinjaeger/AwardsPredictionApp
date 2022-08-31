import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import MovieDetails from '../../components/MovieDetails';
import { CreateContenderParamList } from '../../navigation/types';
import { iCachedTmdbMovie } from '../../services/cache/types';
import DS from '../../services/datastore';

// refactor: move this somewhere else (except confirm button). this could essentially be the "movie view" page where you click on a movie poster and then can view the full screen of it

// in this screen, do a query with all the details displayed, including the poster
// if the user submits, make sure there's no additional information that needs to be submitted (in the case of an actor, would be the person. in the case of a song, would be the song title.)
const ConfirmContender = () => {
  const {
    params: { tmdbId, category },
  } = useRoute<RouteProp<CreateContenderParamList, 'ConfirmContender'>>();
  const navigation = useNavigation();

  const [movieDetails, setMovieDetails] = useState<iCachedTmdbMovie | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const onConfirmContender = async () => {
    if (!movieDetails) return;
    setLoading(true);
    const { data: movie } = await DS.getOrCreateMovie(tmdbId);
    if (!movie) return;
    await DS.getOrCreateContender(category, movie);
    setLoading(false);
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        width: '100%',
        paddingBottom: 100,
      }}
    >
      <SubmitButton
        text={'Confirm Contender'}
        onPress={onConfirmContender}
        loading={loading}
        style={{ marginTop: 20 }}
      />
      <View style={{ width: '90%', marginTop: 10 }}>
        <MovieDetails
          tmdbId={tmdbId}
          returnMovieDetails={(md: iCachedTmdbMovie | undefined) => setMovieDetails(md)}
        />
      </View>
    </ScrollView>
  );
};

export default ConfirmContender;
