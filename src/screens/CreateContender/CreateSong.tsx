import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SubmitButton } from '../../components/Buttons';
import SearchInput from '../../components/Inputs/SearchInput';
import SearchResultsList from '../../components/List/SearchResultsList';
import TmdbServices from '../../services/tmdb';
import { iSearchData } from '../../services/tmdb/search';
import DS from '../../services/datastore';
import Snackbar from '../../components/Snackbar';
import ContenderDetails from '../../components/ContenderDetails';
import { Body } from '../../components/Text';
import { iCreateContenderProps } from '.';
import { CategoryType, Movie } from '../../models';
import { IconButton } from '../../components/Buttons/IconButton';
import { View } from 'react-native';
import FormInput from '../../components/Inputs/FormInput';

const MAX_CHAR_COUNT = 100;

// TODO: should only be able to do this if logged in
const CreateSong = (props: iCreateContenderProps) => {
  const { category } = props;

  const navigation = useNavigation();

  const event = category.event;
  const minReleaseYear = event.year - 1;

  const [searchResults, setSearchResults] = useState<iSearchData>([]);
  const [movie, setMovie] = useState<Movie | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [songTitle, setSongTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');

  const handleSearch = (s: string) => {
    if (s === '') {
      setSearchMessage('');
      return setSearchResults([]);
    }
    TmdbServices.searchMovies(s, minReleaseYear).then((res) => {
      setMovie(undefined);
      const r = res.data || [];
      setSearchResults(r);
      if (r.length === 0) {
        setSearchMessage('No Results');
      }
    });
  };

  const onSelectMovie = async (tmdbId: number) => {
    try {
      const { data: movie } = await DS.getOrCreateMovie(tmdbId);
      if (movie) {
        setMovie(movie);
      }
    } catch (err) {
      console.error('error selecting search result', err);
    }
  };

  const onConfirmSong = async () => {
    if (!movie) return;
    setLoading(true);
    const { data: song } = await DS.getOrCreateSong(songTitle, artist, movie);
    if (!song) return;
    await DS.getOrCreateSongContender(category, movie, song);
    navigation.goBack();
    Snackbar.success(`Added ${song.title || 'film'} to predictions`);
    setLoading(false);
  };

  const removeFilm = () => {
    setMovie(undefined);
  };

  const movieData = searchResults.map((m) => ({
    title: m.title,
    description: m.description
      ? m.description.length > MAX_CHAR_COUNT
        ? m.description.slice(0, MAX_CHAR_COUNT) + '...'
        : m.description
      : '',
    image: m.image,
    onPress: () => onSelectMovie(m.tmdbId),
  }));

  return (
    <>
      {movie ? (
        <>
          <View style={{ width: '90%' }}>
            <FormInput
              label="Song Title"
              value={songTitle}
              setValue={setSongTitle}
              textContentType={'name'}
            />
            <FormInput
              label="Artist"
              value={artist}
              setValue={setArtist}
              textContentType={'name'}
            />
            <SubmitButton
              text={'Confirm'}
              onPress={onConfirmSong}
              loading={loading}
              disabled={songTitle.length === 0 || artist.length === 0}
            />
          </View>
          <View>
            <View style={{ position: 'absolute', right: 10, top: 10, zIndex: 2 }}>
              <IconButton iconProps={{ name: 'close-outline' }} onPress={removeFilm} />
            </View>
            <ContenderDetails
              movie={movie}
              categoryType={CategoryType.FILM} // Imporant because we're entering details in the screen and can't display them yet
            />
          </View>
        </>
      ) : (
        <>
          <SearchInput
            placeholder={'Search Movies'}
            handleSearch={(s: string) => handleSearch(s)}
            style={{ width: '80%' }}
          />
          {searchResults.length === 0 ? (
            <Body style={{ marginTop: 40 }}>{searchMessage}</Body>
          ) : null}
          <SearchResultsList data={movieData} />
        </>
      )}
    </>
  );
};

export default CreateSong;
