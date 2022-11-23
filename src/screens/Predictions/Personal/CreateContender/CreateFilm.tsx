import React, { useState } from 'react';
import SearchInput from '../../../../components/Inputs/SearchInput';
import TmdbServices from '../../../../services/tmdb';
import { iSearchData } from '../../../../services/tmdb/search';
import Snackbar from '../../../../components/Snackbar';
import { Body } from '../../../../components/Text';
import TmdbMovieCache from '../../../../services/cache/tmdbMovie';
import { TouchableHighlight, View } from 'react-native';
import { useCategory } from '../../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../../../store/types';
import COLORS from '../../../../constants/colors';
import MovieListSearch from '../../../../components/MovieList/MovieListSearch';
import LoadingStatueModal from '../../../../components/LoadingStatueModal';
import useMutationCreateContender from '../../../../hooks/createContender';
import theme from '../../../../constants/theme';
import { useAsyncEffect } from '../../../../util/hooks';

// TODO: should only be able to do this if logged in
const CreateFilm = () => {
  const { category: _category, event: _event } = useCategory();

  const category = _category as iCategory;
  const event = _event as iEvent;

  // when adding a contender to the list of overall contenders
  const { mutate, isComplete } = useMutationCreateContender();

  const [searchResults, setSearchResults] = useState<iSearchData>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [selectedTmdbId, setSelectedTmdbId] = useState<number | undefined>();

  const minReleaseYear = event.year - 1;

  useAsyncEffect(async () => {
    if (isComplete && selectedTmdbId) {
      const tmdbMovie = await TmdbMovieCache.get(selectedTmdbId);
      Snackbar.success(`Added ${tmdbMovie?.title || 'film'} to predictions`);
      setSelectedTmdbId(undefined);
      setSearchResults([]);
    }
  }, [isComplete]);

  const handleSearch = (s: string) => {
    if (s === '') {
      setSearchMessage('');
      return setSearchResults([]);
    }
    TmdbServices.searchMovies(s, minReleaseYear).then((res) => {
      setSelectedTmdbId(undefined);
      const r = res.data || [];
      setSearchResults(r);
      if (r.length === 0) {
        setSearchMessage('No Results');
      }
    });
  };

  const onConfirmContender = async () => {
    if (!selectedTmdbId) return;
    await mutate({
      eventId: event.id,
      categoryId: category.id,
      movieTmdbId: selectedTmdbId,
    });
  };

  // these are sort of "fake" values
  const movieData: iPrediction[] = searchResults.map((m) => ({
    ranking: 0,
    contenderId: m.tmdbId.toString(),
    contenderMovie: {
      id: m.tmdbId.toString(),
      tmdbId: m.tmdbId,
      studio: m.description,
    },
  }));

  // TODO: add button at bottom to save, which calls onConfirmContender

  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving changes...'} />
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View style={{ width: '100%', alignItems: 'center', height: '100%' }}>
          <SearchInput
            placeholder={'Search Movies'}
            handleSearch={(s: string) => handleSearch(s)}
            style={{ width: '80%', marginTop: '5%' }}
          />
          {searchResults.length === 0 ? (
            <Body style={{ marginTop: 40, color: COLORS.white }}>{searchMessage}</Body>
          ) : null}
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <MovieListSearch
              predictions={movieData}
              onSelect={(tmdbId) => setSelectedTmdbId(tmdbId)}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <TouchableHighlight
            style={{
              width: '50%',
              backgroundColor: selectedTmdbId ? COLORS.goldDark : COLORS.primaryLight,
              borderRadius: theme.borderRadius,
              borderWidth: 1,
              borderColor: COLORS.primaryLightest,
              alignItems: 'center',
              padding: 15,
              margin: 10,
            }}
            disabled={!selectedTmdbId}
            onPress={onConfirmContender}
            underlayColor={COLORS.primary}
          >
            <Body>Submit</Body>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

export default CreateFilm;
