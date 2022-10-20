import React, { useState } from 'react';
import { SubmitButton } from '../../components/Buttons';
import SearchInput from '../../components/Inputs/SearchInput';
import SearchResultsList from '../../components/List/SearchResultsList';
import TmdbServices from '../../services/tmdb';
import { iSearchData } from '../../services/tmdb/search';
import Snackbar from '../../components/Snackbar';
import ContenderDetails from '../../components/ContenderDetails';
import { Body } from '../../components/Text';
import TmdbMovieCache from '../../services/cache/tmdbMovie';
import { iCreateContenderProps } from '.';
import { IconButton } from '../../components/Buttons/IconButton';
import { View } from 'react-native';
import { useTypedNavigation } from '../../util/hooks';
import { CreateContenderParamList } from '../../navigation/types';
import ApiServices from '../../services/graphql';
import { CategoryType, GetMovieQuery } from '../../API';

const MAX_CHAR_COUNT = 100;

// TODO: should only be able to do this if logged in
const CreateFilm = (props: iCreateContenderProps) => {
  const { categoryId, categoryType, eventYear } = props;

  const navigation = useTypedNavigation<CreateContenderParamList>();

  const minReleaseYear = eventYear - 1;

  const [searchResults, setSearchResults] = useState<iSearchData>([]);
  const [movie, setMovie] = useState<GetMovieQuery>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMessage, setSearchMessage] = useState<string>('');

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
      const { data: movie } = await ApiServices.getOrCreateMovie(tmdbId);
      const movieId = movie?.getMovie?.id;
      if (movieId) {
        const { data: contender } = await ApiServices.getOrCreateFilmContender({
          categoryId,
          movieId,
        });
        if (!contender) {
          return;
        }
      }
      setMovie(movie);
    } catch (err) {
      console.error('error selecting search result', err);
    }
  };

  const onConfirmContender = async () => {
    const m = movie?.getMovie;
    if (!m) return;
    setLoading(true);
    await ApiServices.getOrCreateFilmContender({
      categoryId,
      movieId: m.id,
    });
    setLoading(false);
    navigation.goBack();
    const tmdbMovie = await TmdbMovieCache.get(m.tmdbId);
    Snackbar.success(`Added ${tmdbMovie?.title || 'film'} to predictions`);
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
    onPress: () => {
      onSelectMovie(m.tmdbId);
    },
  }));

  const m = movie?.getMovie;

  return (
    <>
      {m ? (
        <>
          <View style={{ position: 'absolute', right: 30, top: 10, zIndex: 2 }}>
            <IconButton iconProps={{ name: 'close-outline' }} onPress={removeFilm} />
          </View>
          <SubmitButton text={'Confirm'} onPress={onConfirmContender} loading={loading} />
          <ContenderDetails
            movieTmdbId={m.tmdbId}
            categoryType={CategoryType[categoryType]}
          />
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

export default CreateFilm;
