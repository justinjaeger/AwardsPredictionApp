import React, { useState } from 'react';
import SearchInput from '../../../components/Inputs/SearchInput';
import TmdbServices from '../../../services/tmdb';
import { iSearchData } from '../../../services/tmdb/search';
import Snackbar from '../../../components/Snackbar';
import { Body } from '../../../components/Text';
import { View } from 'react-native';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../../types';
import COLORS from '../../../constants/colors';
import MovieListSearch from '../../../components/MovieList/MovieListSearch';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import { useAsyncEffect } from '../../../util/hooks';
import useQueryCommunityEvent from '../../../hooks/getCommunityEvent';
import { FAB } from '../../../components/Buttons/FAB';
import useMutationCreateActingContender from '../../../hooks/createActingContender';
import TmdbPersonCache from '../../../services/cache/tmdbPerson';
import { CategoryType } from '../../../API';
import BasicModal from '../../../components/BasicModal';

// TODO: should only be able to do this if logged in
const CreatePerformance = () => {
  const { category: _category, event: _event } = useCategory();

  const category = _category as iCategory;
  const event = _event as iEvent;

  // when adding a contender to the list of overall contenders
  const { mutate, isComplete } = useMutationCreateActingContender();

  const { data: communityData } = useQueryCommunityEvent(event);
  const communityPredictions = communityData ? communityData[category.id] || [] : [];

  const [personSearchResults, setPersonSearchResults] = useState<iSearchData>([]);
  const [movieSearchResults, setMovieSearchResults] = useState<iSearchData>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [selectedMovieTmdbId, setSelectedMovieTmdbId] = useState<number | undefined>();
  const [selectedPersonTmdbId, setSelectedPersonTmdbId] = useState<number | undefined>();
  const [resetSearchHack, setResetSearchHack] = useState<boolean>(false);
  const [showMovieSelectModal, setShowMovieSelectModal] = useState<boolean>(false);

  const minReleaseYear = event.year - 1;

  const resetSearch = () => {
    setSelectedMovieTmdbId(undefined);
    setSelectedPersonTmdbId(undefined);
    setPersonSearchResults([]);
    setMovieSearchResults([]);
    setSearchMessage('');
    setResetSearchHack(!resetSearchHack); // resets searchbar
  };

  useAsyncEffect(async () => {
    if (isComplete && selectedPersonTmdbId) {
      const tmdbPerson = await TmdbPersonCache.get(selectedPersonTmdbId);
      Snackbar.success(`Added ${tmdbPerson?.name || 'actor'} to predictions`);
      resetSearch();
    }
  }, [isComplete]);

  const handleSearch = (s: string) => {
    if (s === '') {
      resetSearch();
      return;
    }
    TmdbServices.searchPeople(s).then((res) => {
      setSelectedMovieTmdbId(undefined);
      setSelectedPersonTmdbId(undefined);
      const r = res.data || [];
      setPersonSearchResults(r);
      if (r.length === 0) {
        setSearchMessage('No Results');
      }
    });
  };

  const getPersonRecentMovies = async (personTmdbId: number) => {
    const { data: _searchData } = await TmdbServices.getTmdbPersonMovieCredits(
      personTmdbId,
      minReleaseYear,
    );
    if (!_searchData || _searchData.length === 0) {
      Snackbar.warning('This actor has no upcoming films');
      return;
    }
    if (_searchData) {
      setMovieSearchResults(_searchData);
      setShowMovieSelectModal(true);
    }
  };

  const onSelectPerson = async () => {
    if (!selectedPersonTmdbId) return;
    getPersonRecentMovies(selectedPersonTmdbId);
  };

  const onConfirmContender = async () => {
    if (!selectedMovieTmdbId || !selectedPersonTmdbId) return;
    // can check that selectedTmdbId is not already associated with a contender in our category list
    const maybeAlreadyExistingContender = communityPredictions.find(
      (p) => p.contenderPerson?.tmdbId === selectedPersonTmdbId,
    );
    if (maybeAlreadyExistingContender) {
      Snackbar.warning('This performance has already been added');
      return;
    }
    await mutate({
      eventId: event.id,
      categoryId: category.id,
      movieTmdbId: selectedMovieTmdbId,
      personTmdbId: selectedPersonTmdbId,
    });
  };

  // these are sort of "fake" values
  const movieData: iPrediction[] = movieSearchResults.map((m) => ({
    ranking: 0,
    contenderId: m.tmdbId.toString(),
    contenderMovie: {
      id: m.tmdbId.toString(),
      tmdbId: m.tmdbId,
    },
  }));

  // these are sort of "fake" values
  const personData: iPrediction[] = personSearchResults.map((p) => ({
    ranking: 0,
    contenderId: p.tmdbId.toString(),
    contenderPerson: {
      id: p.tmdbId.toString(),
      tmdbId: p.tmdbId,
    },
  }));

  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving performance...'} />
      <BasicModal
        visible={showMovieSelectModal}
        onClose={() => {
          setShowMovieSelectModal(false);
        }}
        width={'100%'}
        height={'50%'}
        header={{ title: 'For Which Movie?' }}
      >
        <>
          {movieSearchResults.length > 0 ? (
            <MovieListSearch
              predictions={movieData}
              onSelect={(tmdbId) => {
                if (selectedMovieTmdbId === tmdbId) {
                  setSelectedMovieTmdbId(undefined);
                } else {
                  setSelectedMovieTmdbId(tmdbId);
                }
              }}
              categoryType={CategoryType.FILM}
            />
          ) : null}
          <FAB
            iconName="plus"
            text="Select"
            onPress={() => {
              setShowMovieSelectModal(false);
              onConfirmContender();
            }}
            visible={selectedMovieTmdbId !== undefined}
            bottomPercentage={'15%'}
          />
        </>
      </BasicModal>
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
            resetSearchHack={resetSearchHack}
            placeholder={'Search Actors'}
            handleSearch={(s: string) => handleSearch(s)}
            style={{ width: '80%', marginTop: '5%' }}
          />
          {personData.length === 0 ? (
            <Body style={{ marginTop: 40, color: COLORS.white }}>{searchMessage}</Body>
          ) : null}
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
            }}
          >
            {personSearchResults.length > 0 ? (
              <View style={{ flex: 10 }}>
                <MovieListSearch
                  predictions={personData}
                  onSelect={(tmdbId) => {
                    if (selectedPersonTmdbId === tmdbId) {
                      setSelectedPersonTmdbId(undefined);
                    } else {
                      setSelectedPersonTmdbId(tmdbId);
                    }
                  }}
                  categoryType={CategoryType.PERFORMANCE}
                  disablePaddingBottom
                />
              </View>
            ) : null}
          </View>
        </View>
        <FAB
          iconName="plus"
          text="Add"
          onPress={onSelectPerson}
          visible={selectedPersonTmdbId !== undefined}
        />
      </View>
    </>
  );
};

export default CreatePerformance;