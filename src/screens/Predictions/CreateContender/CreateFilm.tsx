import React, { useEffect, useState } from 'react';
import { Body } from '../../../components/Text';
import { View } from 'react-native';
import { useEvent } from '../../../context/EventContext';
import COLORS from '../../../constants/colors';
import MovieListSearch from '../../../components/MovieList/MovieListSearch';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import { FAB } from '../../../components/Buttons/FAB';
import { CategoryType, iPrediction } from '../../../types/api';
import TmdbServices, { iSearchData } from '../../../services/tmdb';
import SearchInput from '../../../components/Inputs/SearchInput';
import MovieListSelectable from '../../../components/MovieList/MovieListSelectable';
import useMutationCreateContender from '../../../hooks/mutations/useMutationCreateContender';
import Snackbar from '../../../components/Snackbar';
import { CATEGORY_TYPE_TO_STRING } from '../../../constants/categories';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { getPhaseUserIsPredicting } from '../../../util/getPhaseUserIsPredicting';
import { usePredictions } from '../AddPredictions.tsx/usePredictions';
import BackButton from '../../../components/Buttons/BackButton';

const CreateFilm = () => {
  const navigation = useTypedNavigation<PredictionsParamList>();

  const { category: _category, event: _event } = useEvent();
  const category = _category!;
  const event = _event!;

  const { shortlistDateTime, isHidden, type } = event.categories[category];

  const phaseUserIsPredicting = getPhaseUserIsPredicting(event, shortlistDateTime);
  const letUserCreateContenders = !isHidden && phaseUserIsPredicting === undefined;

  // when adding a contender to the list of overall contenders
  const {
    mutate: getOrCreateContender,
    isComplete,
    response,
  } = useMutationCreateContender();

  const {
    selectedPredictions,
    setSelectedPredictions,
    communityPredictions,
    selectedContenderIds,
    onSave,
  } = usePredictions();

  const [searchResults, setSearchResults] = useState<iSearchData[]>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [selectedTmdbId, setSelectedTmdbId] = useState<number | undefined>();

  const minReleaseYear = event.year - 1;

  // set custom back arrow functionality
  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => <BackButton onPress={onSave} />,
    });
  }, [navigation]);

  const onSelectPredictionFromSearch = (prediction: iPrediction) => {
    const contenderId = prediction.contenderId;
    const isAlreadySelected = selectedContenderIds.includes(contenderId);
    if (isAlreadySelected) {
      // alert user that contender is already selected
      Snackbar.success(
        `This ${CATEGORY_TYPE_TO_STRING[
          type
        ].toLowerCase()} is already in your predictions`,
      );
    } else {
      Snackbar.success('Added to list');
      setSelectedPredictions((ps) => [...ps, prediction]);
    }
  };

  const resetSearch = () => {
    setSelectedTmdbId(undefined);
    setSearchMessage('');
    setSearchResults([]);
  };

  // block runs after createContender mutation succeeds
  useEffect(() => {
    if (response) {
      onSelectPredictionFromSearch({
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
      onSelectPredictionFromSearch(maybeAlreadyExistingPrediction);
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
          onReset={() => resetSearch()}
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
