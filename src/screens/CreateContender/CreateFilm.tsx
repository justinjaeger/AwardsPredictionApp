import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SubmitButton } from '../../components/Buttons';
import SearchInput from '../../components/Inputs/SearchInput';
import SearchResultsList from '../../components/List/SearchResultsList';
import TmdbServices from '../../services/tmdb';
import { iSearchData } from '../../services/tmdb/search';
import DS from '../../services/datastore';
import Snackbar from '../../components/Snackbar';
import MovieDetails from '../../components/MovieDetails';
import { Body } from '../../components/Text';
import TmdbMovieCache from '../../services/cache/tmdbMovie';
import { iCreateContenderProps } from '.';

const MAX_CHAR_COUNT = 100;

// TODO: should only be able to do this if logged in
const CreateFilm = (props: iCreateContenderProps) => {
  const { category } = props;

  const navigation = useNavigation();

  const event = category.event;
  const minReleaseYear = event.year - 1;

  const [searchResults, setSearchResults] = useState<iSearchData>([]);
  const [tmdbId, setTmdbId] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMessage, setSearchMessage] = useState<string>('');

  const handleSearch = (s: string) => {
    if (s === '') {
      setSearchMessage('');
      return setSearchResults([]);
    }
    TmdbServices.searchMovies(s, minReleaseYear).then((res) => {
      setTmdbId(undefined);
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
        const { data: contender } = await DS.getContender(category, movie);
        if (contender) {
          Snackbar.error('This movie has already been added');
          return;
        }
      }
      setTmdbId(tmdbId);
    } catch (err) {
      console.error('error selecting search result', err);
    }
  };

  const onConfirmContender = async () => {
    if (!tmdbId) return;
    setLoading(true);
    const { data: movie } = await DS.getOrCreateMovie(tmdbId);
    if (!movie) return;
    await DS.getOrCreateContender(category, movie);
    setLoading(false);
    navigation.goBack();
    const m = await TmdbMovieCache.get(tmdbId);
    Snackbar.success(`Added ${m?.title || 'film'} to list`);
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
      <SearchInput
        placeholder={'Search Movies'}
        handleSearch={(s: string) => handleSearch(s)}
        style={{ width: '80%' }}
      />
      {tmdbId ? (
        <>
          <SubmitButton text={'Confirm'} onPress={onConfirmContender} loading={loading} />
          <MovieDetails tmdbId={tmdbId} />
        </>
      ) : (
        <>
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
