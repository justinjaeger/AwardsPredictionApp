import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../Buttons';
import Poster from '../Images/Poster';
import { BodyLarge, SubHeader } from '../Text';
import { PosterSize } from '../../constants/posterDimensions';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../services/cache/types';
import TmdbServices from '../../services/tmdb';

type iPerformanceDetailsProps = {
  personId: number;
  movieId: number;
};

const PerformanceDetails = (props: iPerformanceDetailsProps) => {
  const { personId, movieId } = props;

  const navigation = useNavigation();

  const [movieDetails, setContenderDetails] = useState<iCachedTmdbMovie | undefined>();
  const [personDetails, setPersonDetails] = useState<iCachedTmdbPerson | undefined>();

  // Set header title
  useLayoutEffect(() => {
    if (!movieDetails) return;
    const movieTitle = movieDetails.title;
    if (personDetails) {
      navigation.setOptions({
        headerTitle: `${personDetails.name} - ${movieTitle}`,
      });
    } else {
      navigation.setOptions({
        headerTitle: movieTitle,
      });
    }
  }, [navigation, personDetails, movieDetails]);

  useEffect(() => {
    TmdbServices.getTmdbMovie(movieId).then((res) => {
      setContenderDetails(res.data);
    });
    TmdbServices.getTmdbPerson(personId).then((res) => {
      setPersonDetails(res.data);
    });
  }, [movieId]);

  const productionCompanies = movieDetails?.productionCompanies?.join(', ');

  if (!movieDetails || !personDetails) {
    // TODO: return loading state
    return null;
  }

  return (
    <>
      <SubHeader style={{ margin: 10 }}>{personDetails.name || ''}</SubHeader>
      {personDetails ? (
        <Poster
          path={personDetails.profilePath}
          size={PosterSize.LARGE}
          title={personDetails.name}
        />
      ) : null}
      <TouchableText
        text={'View in Imdb'}
        onPress={() => {
          navigation.navigate('WebView', {
            uri: `https://www.imdb.com/name/${personDetails.imdbId}`,
            title: personDetails.name,
          });
        }}
      />
      <TouchableText
        text={'Filmography'}
        onPress={() => {
          navigation.navigate('WebView', {
            uri: `https://www.imdb.com/name/${personDetails.imdbId}/filmotype`,
            title: personDetails.name,
          });
        }}
      />
      <SubHeader style={{ margin: 10 }}>{movieDetails.title || ''}</SubHeader>
      {movieDetails ? (
        <Poster
          path={movieDetails.posterPath}
          size={PosterSize.LARGE}
          title={movieDetails.title}
        />
      ) : null}
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
          <BodyLarge style={{ fontWeight: '800', marginBottom: 5 }}>{'Plot'}</BodyLarge>
          <BodyLarge>{movieDetails?.plot || ''}</BodyLarge>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <BodyLarge
            style={{
              fontWeight: '800',
              marginTop: 5,
            }}
          >
            {movieDetails?.productionCompanies?.length > 1
              ? 'Production Companies'
              : 'Production Company'}
          </BodyLarge>
          <BodyLarge>{productionCompanies || ''}</BodyLarge>
        </View>
      </View>
    </>
  );
};

export default PerformanceDetails;
