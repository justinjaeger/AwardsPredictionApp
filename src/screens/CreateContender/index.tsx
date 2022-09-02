import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import SearchInput from '../../components/Inputs/SearchInput';
import SearchResultsList from '../../components/List/SearchResultsList';
import { CreateContenderParamList } from '../../navigation/types';
import TmdbServices from '../../services/tmdb';
import { iSearchMoviesData } from '../../services/tmdb/search';
import DS from '../../services/datastore';
import Snackbar from '../../components/Snackbar';
import MovieDetails from '../../components/MovieDetails';
import { Body } from '../../components/Text';
import TmdbMovieCache from '../../services/cache/tmdbMovie';

const MAX_CHAR_COUNT = 100;

// TODO: should only be able to do this if logged in
const CreateContender = () => {
  const {
    params: { category },
  } = useRoute<RouteProp<CreateContenderParamList, 'CreateContender'>>();
  const navigation = useNavigation();

  const event = category.event;
  const minYearToSearchFor = event.year - 1;

  const [results, setResults] = useState<iSearchMoviesData>([]);
  const [tmdbId, setTmdbId] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMessage, setSearchMessage] = useState<string>('');

  const handleSearch = (s: string) => {
    if (s === '') {
      setSearchMessage('');
      return setResults([]);
    }
    TmdbServices.searchMovies(s, minYearToSearchFor).then((res) => {
      setTmdbId(undefined);
      const r = res.data || [];
      setResults(r);
      if (r.length === 0) {
        setSearchMessage('No Results');
      }
    });
  };

  const onSelectSearchResult = async (tmdbId: number) => {
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

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        paddingBottom: 100,
      }}
    >
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
          {results.length === 0 ? (
            <Body style={{ marginTop: 40 }}>{searchMessage}</Body>
          ) : null}
          <SearchResultsList
            data={results.map((r) => ({
              title: r.title,
              description:
                r.plot.length > MAX_CHAR_COUNT
                  ? r.plot.slice(0, MAX_CHAR_COUNT) + '...'
                  : r.plot,
              onPress: () => onSelectSearchResult(r.tmdbId),
            }))}
          />
        </>
      )}
    </ScrollView>
  );
};

export default CreateContender;
