import React, { useEffect, useState } from 'react';
import { Body } from '../../../components/Text';
import { View } from 'react-native';
import { useEvent } from '../../../context/EventContext';
import COLORS from '../../../constants/colors';
import MovieListSearch from '../../../components/MovieList/MovieListSearch';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import useMutationCreateFilmContender from '../../../hooks/mutations/useMutationCreateFilmContender';
import { FAB } from '../../../components/Buttons/FAB';
import { useSearch } from '../../../context/SearchContext';
import { iCreateContenderProps } from '.';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import { useTmdbDataStore } from '../../../context/TmdbDataStore';
import { CategoryType, Movie, iPrediction } from '../../../types/api';
import TmdbServices, { iSearchData } from '../../../services/tmdb';

// TODO: should only be able to do this if logged in
const CreateFilm = ({ onSelectPrediction }: iCreateContenderProps) => {
  const { store } = useTmdbDataStore();

  const { setIsLoadingSearch } = useSearch();
  const { category: _category, event: _event } = useEvent();

  const category = _category!;
  const event = _event!;

  // when adding a contender to the list of overall contenders
  const { mutate, isComplete, response } = useMutationCreateFilmContender();

  const { searchInput, debouncedSearch, resetSearchHack, setResetSearchHack } =
    useSearch();
  const { data: communityData } = useQueryGetCommunityPredictions(); // because we use this to see if contender exists, we want to includes hidden contenders
  const communityPredictions = communityData?.categories[category].predictions || [];

  const [searchResults, setSearchResults] = useState<iSearchData>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [selectedTmdbId, setSelectedTmdbId] = useState<number | undefined>();

  const minReleaseYear = event.year - 1;

  const resetSearch = () => {
    setSelectedTmdbId(undefined);
    setSearchMessage('');
    setSearchResults([]);
    setResetSearchHack(!resetSearchHack); // resets searchbar
  };

  const getFilmPrediction = (movieTmdbId: number) => {
    const maybeMovie = movieTmdbId ? (store[movieTmdbId] as Movie) : undefined;
    const maybeExistingPrediction =
      maybeMovie && communityPredictions.find((p) => p.movieTmdbId === maybeMovie.tmdbId);
    return maybeExistingPrediction;
  };

  // handles the search
  useEffect(() => {
    handleSearch(searchInput);
  }, [debouncedSearch]);

  // block runs after createContender mutation succeeds
  useEffect(() => {
    if (response) {
      onSelectPrediction({
        contenderId: response._id,
        movieTmdbId: response.movieTmdbId,
        personTmdbId: response.personTmdbId,
        songId: response.songId,
        ranking: 0,
      });
      resetSearch();
    }
  }, [response]);

  const handleSearch = (s: string) => {
    if (s === '') {
      resetSearch();
      return;
    }
    setIsLoadingSearch(true);
    let Request = TmdbServices.searchMovies(s, minReleaseYear);
    // number of digits in search (trying to identify an id)
    const digitCount = parseInt(s, 10).toString().length;
    if ([5, 6, 7, 8].includes(digitCount)) {
      // search by id instead if they put in a 6 digit number
      Request = TmdbServices.searchMovieById(s);
    }
    Request.then((res) => {
      setSelectedTmdbId(undefined);
      const r = res.data || [];
      setSearchResults(r);
      if (r.length === 0) {
        setSearchMessage('No Results');
      }
    }).finally(() => setIsLoadingSearch(false));
  };

  const onConfirmContender = async () => {
    if (!selectedTmdbId) return;
    // can check that selectedTmdbId is not already associated with a contender in our category list
    const maybeAlreadyExistingPrediction = getFilmPrediction(selectedTmdbId);
    if (maybeAlreadyExistingPrediction) {
      // this film has already been added to community predictions
      onSelectPrediction(maybeAlreadyExistingPrediction);
      return;
    }
    await mutate({
      eventId: event._id,
      category,
      movieTmdbId: selectedTmdbId,
    });
  };

  // these are sort of "fake" values
  const movieSearchResultsFormatted: iPrediction[] = searchResults.map((m) => ({
    id: m.tmdbId.toString(),
    ranking: 0,
    contenderId: m.tmdbId.toString(),
    movieTmdbId: m.tmdbId,
  }));

  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving film...'} />
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View style={{ width: '100%', alignItems: 'center', height: '100%' }}>
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
              predictions={movieSearchResultsFormatted}
              onSelect={(tmdbId) => {
                if (selectedTmdbId === tmdbId) {
                  setSelectedTmdbId(undefined);
                } else {
                  setSelectedTmdbId(tmdbId);
                }
              }}
              categoryType={CategoryType.FILM}
            />
          </View>
        </View>
        <FAB
          iconName="checkmark"
          text="Add"
          onPress={onConfirmContender}
          visible={selectedTmdbId !== undefined}
        />
      </View>
    </>
  );
};

export default CreateFilm;
