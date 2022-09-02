import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../Buttons';
import Poster from '../Images/Poster';
import { BodyLarge, SubHeader } from '../Text';
import { PosterSize } from '../../constants/posterDimensions';
import { iCachedTmdbCredits, iCachedTmdbMovie } from '../../services/cache/types';
import TmdbServices from '../../services/tmdb';

type iFilmDetailsProps = {
  tmdbId: number;
  returnContenderDetails?: (md: iCachedTmdbMovie | undefined) => void;
};

const FilmDetails = (props: iFilmDetailsProps) => {
  const { tmdbId, returnContenderDetails } = props;

  const navigation = useNavigation();

  const [movieDetails, setContenderDetails] = useState<iCachedTmdbMovie | undefined>();
  const [castAndCrew, setCastAndCrew] = useState<iCachedTmdbCredits | undefined>();

  // Set header title
  useLayoutEffect(() => {
    if (movieDetails) {
      navigation.setOptions({
        headerTitle: movieDetails.title,
      });
    }
  }, [navigation, movieDetails]);

  useEffect(() => {
    TmdbServices.getTmdbMovie(tmdbId).then((res) => {
      setContenderDetails(res.data);
      returnContenderDetails && returnContenderDetails(res.data);
    });
    TmdbServices.getTmdbMovieCredits(tmdbId).then((res) => {
      setCastAndCrew(res.data);
    });
  }, [tmdbId, returnContenderDetails]);

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
    <>
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
          <BodyLarge style={{ fontWeight: '800', marginBottom: 5 }}>
            {'Directed by'}
          </BodyLarge>
          <BodyLarge>{directors || ''}</BodyLarge>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <BodyLarge style={{ fontWeight: '800', marginBottom: 5 }}>{'Cast'}</BodyLarge>
          <BodyLarge>{formattedCast || ''}</BodyLarge>
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

export default FilmDetails;
