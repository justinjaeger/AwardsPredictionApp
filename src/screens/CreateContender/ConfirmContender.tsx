import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import Poster from '../../components/Images/Poster';
import { BodyLarge, SubHeader } from '../../components/Text';
import { CreateContenderParamList } from '../../navigation/types';
import { iCachedTmdbCredits, iCachedTmdbMovie } from '../../services/cache/types';
import DS from '../../services/datastore';
import TmdbServices from '../../services/tmdb';

// move this somewhere else

// in this screen, do a query with all the details displayed, including the poster
// if the user submits, make sure there's no additional information that needs to be submitted (in the case of an actor, would be the person. in the case of a song, would be the song title.)
const ConfirmContender = () => {
  const {
    params: { tmdbId, category },
  } = useRoute<RouteProp<CreateContenderParamList, 'ConfirmContender'>>();
  const navigation = useNavigation();

  const [movieDetails, setMovieDetails] = useState<iCachedTmdbMovie | undefined>();
  const [castAndCrew, setCastAndCrew] = useState<iCachedTmdbCredits | undefined>();

  useEffect(() => {
    // TODO: combine these
    TmdbServices.getTmdbMovie(tmdbId).then((res) => {
      setMovieDetails(res.data);
    });
    TmdbServices.getTmdbMovieCredits(tmdbId).then((res) => {
      setCastAndCrew(res.data);
    });
    // make request to get the movie's details (these will be cached using the tmdbId as the)
  }, [tmdbId]);

  const onConfirmContender = async () => {
    if (!movieDetails) return;
    const { data: movie } = await DS.getOrCreateMovie(tmdbId);
    if (!movie) return;
    await DS.getOrCreateContender(category, movie);
  };

  const directors = castAndCrew?.directors?.map((d) => d.name).join(', ');

  const formattedCast = castAndCrew?.cast
    ?.map((c) => c.name)
    .filter((c, i) => i < 10) // display 10 cast members max
    .join(', ');

  const productionCompanies = movieDetails?.productionCompanies?.join(', ');

  if (!movieDetails || !castAndCrew) {
    // TODO: return loading state
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 40,
        width: '100%',
        paddingBottom: 100,
      }}
    >
      <SubmitButton text={'Confirm Contender'} onPress={onConfirmContender} />
      <SubHeader style={{ margin: 10 }}>{movieDetails.title || ''}</SubHeader>
      {movieDetails?.posterPath ? <Poster path={movieDetails.posterPath} /> : null}
      <TouchableText
        text={'View in Imdb'}
        onPress={() => {
          navigation.navigate('WebView', {
            uri: `https://www.imdb.com/title/${movieDetails.imdbId}`,
            title: movieDetails.title,
          });
        }}
      />
      <TouchableText
        text={'See Cast'}
        onPress={() => {
          navigation.navigate('WebView', {
            uri: `https://www.imdb.com/title/${movieDetails.imdbId}/fullcredits/cast`,
            title: movieDetails.title,
          });
        }}
      />
      <TouchableText
        text={'See Crew'}
        onPress={() => {
          navigation.navigate('WebView', {
            uri: `https://www.imdb.com/title/${movieDetails.imdbId}/fullcredits`,
            title: movieDetails.title,
          });
        }}
      />
      <View style={{ alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <BodyLarge style={{ fontWeight: '800', marginBottom: 5, width: '50%' }}>
            {'Plot'}
          </BodyLarge>
          <BodyLarge>{movieDetails?.plot || ''}</BodyLarge>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <BodyLarge style={{ fontWeight: '800', marginBottom: 5, width: '50%' }}>
            {'Directed by'}
          </BodyLarge>
          <BodyLarge>{directors || ''}</BodyLarge>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <BodyLarge style={{ fontWeight: '800', marginBottom: 5, width: '50%' }}>
            {'Cast'}
          </BodyLarge>
          <BodyLarge>{formattedCast || ''}</BodyLarge>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <BodyLarge style={{ fontWeight: '800', marginBottom: 5, width: '50%' }}>
            {movieDetails?.productionCompanies.length > 1
              ? 'Production Companies'
              : 'Production Company'}
          </BodyLarge>
          <BodyLarge>{productionCompanies || ''}</BodyLarge>
        </View>
      </View>
    </ScrollView>
  );
};

export default ConfirmContender;
