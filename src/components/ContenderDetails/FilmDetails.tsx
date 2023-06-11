import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../Buttons';
import Poster from '../Images/Poster';
import { Body, SubHeader } from '../Text';
import { PosterSize } from '../../constants/posterDimensions';
import { iCachedTmdbMovie } from '../../services/cache/types';
import TmdbServices from '../../services/tmdb';
import { getHeaderTitle } from '../../constants';
import { MainScreenNavigationProp } from '../../navigation/types';

type iFilmDetailsProps = {
  movieTmdbId: number;
  movieStudio?: string | undefined;
};

// TODO: based on category.name (CategoryName), display a distinct piece of information with the film like who the directors or screenwriters are
// That would be more like ContenderDetails, which is actually helpful because we want to see more details about the CONTENDER, not necessarily the movie
// This is also where we want to take a look at stats in the future, so we do need the contender passed into the details screen

const FilmDetails = (props: iFilmDetailsProps) => {
  const { movieTmdbId, movieStudio } = props;

  const navigation = useNavigation<MainScreenNavigationProp>();

  const [movieDetails, setContenderDetails] = useState<iCachedTmdbMovie | undefined>();

  // Set header title
  useLayoutEffect(() => {
    if (movieDetails) {
      navigation.setOptions({
        headerTitle: getHeaderTitle(movieDetails.title),
      });
    }
  }, [navigation, movieDetails]);

  useEffect(() => {
    TmdbServices.getTmdbMovie(movieTmdbId).then((res) => {
      setContenderDetails(res.data);
    });
  }, [movieTmdbId]);

  const formattedCast = movieDetails?.cast;
  const directors = movieDetails?.categoryInfo?.DIRECTOR;

  const productionCompanies = movieDetails?.productionCompanies?.join(', ');

  if (!movieDetails) {
    // TODO: return loading state
    return null;
  }

  return (
    <>
      <SubHeader style={{ margin: 10 }}>{movieDetails.title || ''}</SubHeader>
      {movieDetails ? (
        <Poster
          path={movieDetails.posterPath}
          width={PosterSize.LARGE}
          title={movieDetails.title}
        />
      ) : null}
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
          <Body style={{ fontWeight: '800', marginBottom: 5 }}>{'Distributor'}</Body>
          <Body>{movieStudio || ''}</Body>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <Body style={{ fontWeight: '800', marginBottom: 5 }}>{'Plot'}</Body>
          <Body>{movieDetails?.plot || ''}</Body>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <Body style={{ fontWeight: '800', marginBottom: 5 }}>{'Directed by'}</Body>
          <Body>{directors ? JSON.stringify(directors) : ''}</Body>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <Body style={{ fontWeight: '800', marginBottom: 5 }}>{'Cast'}</Body>
          <Body>{formattedCast || ''}</Body>
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
  );
};

export default FilmDetails;
