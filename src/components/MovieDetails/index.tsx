import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../../components/Buttons';
import Poster from '../../components/Images/Poster';
import { BodyLarge, SubHeader } from '../../components/Text';
import COLORS from '../../constants/colors';
import { PosterSize } from '../../constants/posterDimensions';
import { iCachedTmdbCredits, iCachedTmdbMovie } from '../../services/cache/types';
import TmdbServices from '../../services/tmdb';

type iMovieDetailsProps = {
  tmdbId: number;
  returnMovieDetails?: (md: iCachedTmdbMovie | undefined) => void;
};

const MovieDetails = (props: iMovieDetailsProps) => {
  const { tmdbId, returnMovieDetails } = props;

  const navigation = useNavigation();

  const [movieDetails, setMovieDetails] = useState<iCachedTmdbMovie | undefined>();
  const [castAndCrew, setCastAndCrew] = useState<iCachedTmdbCredits | undefined>();

  useEffect(() => {
    TmdbServices.getTmdbMovie(tmdbId).then((res) => {
      setMovieDetails(res.data);
      returnMovieDetails && returnMovieDetails(res.data);
    });
    TmdbServices.getTmdbMovieCredits(tmdbId).then((res) => {
      setCastAndCrew(res.data);
    });
  }, [tmdbId]);

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
    <View
      style={{
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.lightestGray,
        borderRadius: 20,
      }}
    >
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
            {movieDetails?.productionCompanies?.length > 1
              ? 'Production Companies'
              : 'Production Company'}
          </BodyLarge>
          <BodyLarge>{productionCompanies || ''}</BodyLarge>
        </View>
      </View>
    </View>
  );
};

export default MovieDetails;
