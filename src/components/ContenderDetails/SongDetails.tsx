import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../Buttons';
import Poster from '../Images/Poster';
import { BodyLarge, SubHeader } from '../Text';
import { PosterSize } from '../../constants/posterDimensions';
import { iCachedTmdbMovie } from '../../services/cache/types';
import TmdbServices from '../../services/tmdb';
import { Movie, Song } from '../../models';

type iSongDetailsProps = {
  movie: Movie;
  song: Song;
};

const SongDetails = (props: iSongDetailsProps) => {
  const { movie, song } = props;

  const navigation = useNavigation();

  const [movieDetails, setMovieDetails] = useState<iCachedTmdbMovie | undefined>();

  const movieTmdbId = movie.tmdbId;

  // Set header title
  useLayoutEffect(() => {
    if (song) {
      navigation.setOptions({
        headerTitle: song.title,
      });
    }
  }, [navigation, song]);

  useEffect(() => {
    TmdbServices.getTmdbMovie(movieTmdbId).then((res) => {
      setMovieDetails(res.data);
    });
  }, [song]);

  if (!movieDetails) return null;

  return (
    <View style={{ width: '100%' }}>
      <SubHeader style={{ margin: 10 }}>{movieDetails.title || ''}</SubHeader>
      <Poster
        path={movieDetails.posterPath}
        size={PosterSize.LARGE}
        title={movieDetails.title}
      />
      <TouchableText
        text={'View in Imdb'}
        onPress={() => {
          navigation.navigate('WebView', {
            uri: `https://www.imdb.com/title/${movieDetails.imdbId}/`,
            title: movieDetails.title,
          });
        }}
      />
      <View style={{ alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <BodyLarge style={{ fontWeight: '800', marginBottom: 5 }}>{'Song'}</BodyLarge>
          <BodyLarge>{song?.title || ''}</BodyLarge>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <BodyLarge style={{ fontWeight: '800', marginBottom: 5 }}>{'Artist'}</BodyLarge>
          <BodyLarge>{song?.artist || ''}</BodyLarge>
        </View>
      </View>
    </View>
  );
};

export default SongDetails;
