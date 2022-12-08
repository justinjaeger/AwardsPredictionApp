import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../Buttons';
import Poster from '../Images/Poster';
import { Body, SubHeader } from '../Text';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../services/cache/types';
import TmdbServices from '../../services/tmdb';
import { getHeaderTitle } from '../../constants';

type iPerformanceDetailsProps = {
  personTmdbId: number;
  movieTmdbId?: number | undefined;
};

const PerformanceDetails = (props: iPerformanceDetailsProps) => {
  const { personTmdbId, movieTmdbId } = props;

  const navigation = useNavigation();

  const [movieDetails, setContenderDetails] = useState<iCachedTmdbMovie | undefined>();
  const [personDetails, setPersonDetails] = useState<iCachedTmdbPerson | undefined>();

  // Set header title
  useLayoutEffect(() => {
    if (!movieDetails) return;
    const movieTitle = movieDetails.title;
    if (personDetails) {
      navigation.setOptions({
        headerTitle: getHeaderTitle(`${personDetails.name} - ${movieTitle}`),
      });
    } else {
      navigation.setOptions({
        headerTitle: getHeaderTitle(movieTitle),
      });
    }
  }, [navigation, personDetails, movieDetails]);

  useEffect(() => {
    if (movieTmdbId) {
      TmdbServices.getTmdbMovie(movieTmdbId).then((res) => {
        setContenderDetails(res.data);
      });
    }
  }, [movieTmdbId]);

  useEffect(() => {
    TmdbServices.getTmdbPerson(personTmdbId).then((res) => {
      setPersonDetails(res.data);
    });
  }, []);

  const productionCompanies = movieDetails?.productionCompanies?.join(', ');

  if (!personDetails) {
    // TODO: return loading state
    return null;
  }

  return (
    <>
      <SubHeader style={{ margin: 10 }}>{personDetails.name || ''}</SubHeader>
      {personDetails ? (
        <Poster path={personDetails.profilePath} title={personDetails.name} />
      ) : null}
      <TouchableText
        text={'View in Imdb'}
        onPress={() => {
          navigation.navigate('WebView', {
            uri: `https://www.imdb.com/name/${personDetails.imdbId}/`,
            title: personDetails.name,
          });
        }}
      />
      <TouchableText
        text={'Filmography'}
        onPress={() => {
          navigation.navigate('WebView', {
            uri: `https://www.imdb.com/name/${personDetails.imdbId}/filmotype/`,
            title: personDetails.name,
          });
        }}
      />
      {movieDetails ? (
        <>
          <SubHeader style={{ margin: 10 }}>{movieDetails.title || ''}</SubHeader>
          <Poster path={movieDetails.posterPath} title={movieDetails.title} />
          <TouchableText
            text={'View in Imdb'}
            onPress={() => {
              navigation.navigate('WebView', {
                uri: `https://www.imdb.com/title/${movieDetails.imdbId}/`,
                title: movieDetails.title,
              });
            }}
          />
          <TouchableText
            text={'See Cast'}
            onPress={() => {
              navigation.navigate('WebView', {
                uri: `https://www.imdb.com/title/${movieDetails.imdbId}/fullcredits/cast/`,
                title: movieDetails.title,
              });
            }}
          />
          <TouchableText
            text={'See Crew'}
            onPress={() => {
              navigation.navigate('WebView', {
                uri: `https://www.imdb.com/title/${movieDetails.imdbId}/fullcredits/`,
                title: movieDetails.title,
              });
            }}
          />
          <View style={{ alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'column', marginTop: 5 }}>
              <Body>{movieDetails?.plot || ''}</Body>
            </View>
            <View style={{ flexDirection: 'column', marginTop: 5 }}>
              <Body
                style={{
                  fontWeight: '800',
                  marginTop: 5,
                }}
              >
                {movieDetails?.productionCompanies?.length > 1
                  ? 'Production Companies'
                  : 'Production Company'}
              </Body>
              <Body>{productionCompanies || ''}</Body>
            </View>
          </View>
        </>
      ) : null}
    </>
  );
};

export default PerformanceDetails;
