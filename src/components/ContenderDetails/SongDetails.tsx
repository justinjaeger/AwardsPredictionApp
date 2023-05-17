import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { TouchableText } from '../Buttons';
import Poster from '../Images/Poster';
import { Body, SubHeader } from '../Text';
import { iCachedTmdbMovie } from '../../services/cache/types';
import TmdbServices from '../../services/tmdb';
import { useAsyncEffect } from '../../util/hooks';
import ApiServices from '../../services/graphql';
import { GetSongQuery } from '../../API';
import { getHeaderTitle } from '../../constants';

type iSongDetailsProps = {
  movieTmdbId: number;
  songId: string;
};

const SongDetails = (props: iSongDetailsProps) => {
  const { movieTmdbId, songId } = props;

  const navigation = useNavigation();

  const [movieDetails, setMovieDetails] = useState<iCachedTmdbMovie | undefined>();
  const [song, setSong] = useState<GetSongQuery>();

  useAsyncEffect(async () => {
    const { data: song } = await ApiServices.getSongById(songId);
    setSong(song);
  }, [songId]);

  const songTitle = song?.getSong?.title;
  const songArtist = song?.getSong?.artist;

  // Set header title
  useLayoutEffect(() => {
    if (songTitle) {
      navigation.setOptions({
        headerTitle: getHeaderTitle(songTitle),
      });
    }
  }, [navigation, songTitle]);

  useEffect(() => {
    TmdbServices.getTmdbMovie(movieTmdbId).then((res) => {
      setMovieDetails(res.data);
    });
  }, [song]);

  if (!movieDetails) return null;

  return (
    <View style={{ width: '100%' }}>
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
      <View style={{ alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <Body style={{ fontWeight: '800', marginBottom: 5 }}>{'Song'}</Body>
          <Body>{songTitle || ''}</Body>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <Body style={{ fontWeight: '800', marginBottom: 5 }}>{'Artist'}</Body>
          <Body>{songArtist || ''}</Body>
        </View>
      </View>
    </View>
  );
};

export default SongDetails;
