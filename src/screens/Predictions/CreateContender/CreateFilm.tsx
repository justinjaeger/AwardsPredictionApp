import React, { useEffect, useState } from 'react';
import { Body } from '../../../components/Text';
import { View } from 'react-native';
import { useEvent } from '../../../context/EventContext';
import COLORS from '../../../constants/colors';
import MovieListSearch from '../../../components/MovieList/MovieListSearch';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import { FAB } from '../../../components/Buttons/FAB';
import { iCreateContenderProps } from '.';
import { CategoryType } from '../../../types/api';
import TmdbServices, { iSearchData } from '../../../services/tmdb';
import SearchInput from '../../../components/Inputs/SearchInput';
import MovieListSelectable from '../../../components/MovieList/MovieListSelectable';
import useMutationCreateContender from '../../../hooks/mutations/useMutationCreateContender';

const CreateFilm = ({
  letUserCreateContenders,
  onSelectPrediction,
  communityPredictions,
  selectedPredictions,
  onSave,
  setSelectedPredictions,
}: iCreateContenderProps) => {
  const { category: _category, event: _event } = useEvent();

  const category = _category!;
  const event = _event!;

  // when adding a contender to the list of overall contenders
  const {
    mutate: getOrCreateContender,
    isComplete,
    response,
  } = useMutationCreateContender();

  const [searchResults, setSearchResults] = useState<iSearchData[]>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [selectedTmdbId, setSelectedTmdbId] = useState<number | undefined>();

  const minReleaseYear = event.year - 1;

  const resetSearch = () => {
    setSelectedTmdbId(undefined);
    setSearchMessage('');
    setSearchResults([]);
  };

  // block runs after createContender mutation succeeds
  useEffect(() => {
    if (response) {
      onSelectPrediction({
        contenderId: response._id,
        movieTmdbId: response.movieTmdbId,
        personTmdbId: response.personTmdbId,
        songId: response.songId,
        ranking: 0, // whatever
      });
      resetSearch();
    }
  }, [response]);

  const handleSearch = async (searchInput: string) => {
    let Request = TmdbServices.searchMovies(searchInput, minReleaseYear);
    // number of digits in search (trying to identify an id)
    const digitCount = parseInt(searchInput, 10).toString().length;
    if ([5, 6, 7, 8].includes(digitCount)) {
      // search by id instead if they put in a 6 digit number
      Request = TmdbServices.searchMovieById(searchInput);
    }
    const res = await Request;
    setSelectedTmdbId(undefined);
    const r = res.data || [];
    setSearchResults(r);
    if (r.length === 0) {
      setSearchMessage('No Results');
    }
  };

  // TODO: we might want to modify this func
  const onConfirmContender = async () => {
    if (!selectedTmdbId) return;
    // can check that selectedTmdbId is not already associated with a contender in our category list
    const maybeAlreadyExistingPrediction = communityPredictions.find(
      (p) => p.movieTmdbId === selectedTmdbId,
    );
    if (maybeAlreadyExistingPrediction) {
      // this film has already been added to community predictions
      onSelectPrediction(maybeAlreadyExistingPrediction);
      return;
    }
    // if it doesn't exist in our category list, it MIGHT still exist in our db.
    await getOrCreateContender({
      eventId: event._id,
      eventYear: event.year,
      categoryName: category,
      movieTmdbId: selectedTmdbId,
    });
  };

  return (
    <>
      {letUserCreateContenders ? (
        <SearchInput
          placeholder={'Search Movies'}
          handleSearch={handleSearch}
          onReset={() => {
            resetSearch();
            setSelectedPredictions([]);
          }}
        />
      ) : null}
      <LoadingStatueModal visible={!isComplete} text={'Saving film...'} />
      {searchResults.length ? (
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
                data={searchResults}
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
      ) : (
        <>
          <MovieListSelectable
            predictions={communityPredictions}
            selectedPredictions={selectedPredictions}
            setSelectedPredictions={(ps) => setSelectedPredictions(ps)}
          />
          <FAB
            iconName="checkmark-outline"
            text="Done"
            onPress={onSave}
            visible={!searchResults.length}
          />
        </>
      )}
    </>
  );
};

export default CreateFilm;
