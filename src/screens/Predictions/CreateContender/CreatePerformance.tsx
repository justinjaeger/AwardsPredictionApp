import React, { useEffect, useState } from 'react';
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
import useQueryCommunityEvent from '../../../hooks/queries/getCommunityEvent';
import { FAB } from '../../../components/Buttons/FAB';
import useMutationCreateActingContender from '../../../hooks/mutations/createActingContender';
import BasicModal from '../../../components/BasicModal';
import { iCreateContenderProps } from '.';
import { CategoryType, ContenderVisibility, PredictionType } from '../../../API';
import { SubmitButton } from '../../../components/Buttons';
import PerformanceListSelectable from '../../../components/MovieList/PerformanceListSelectable';
import { useSearch } from '../../../context/ContenderSearchContext';

// TODO: should only be able to do this if logged in
const CreatePerformance = (props: iCreateContenderProps) => {
  const { onSelectPrediction } = props;

  const { category: _category, event: _event } = useCategory();

  const category = _category as iCategory;
  const event = _event as iEvent;

  // when adding a contender to the list of overall contenders
  const { mutate, isComplete, response } = useMutationCreateActingContender();

  const {
    searchInput,
    debouncedSearch,
    resetSearchHack,
    setResetSearchHack,
  } = useSearch();
  const { data: communityData } = useQueryCommunityEvent({ event, includeHidden: true }); // because we use this to see if contender exists, we want to includes hidden contenders
  const communityPredictions = communityData?.[category.id]?.predictions || [];

  const [personSearchResults, setPersonSearchResults] = useState<iSearchData>([]);
  const [movieSearchResults, setMovieSearchResults] = useState<iSearchData>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [selectedMovieTmdbId, setSelectedMovieTmdbId] = useState<number | undefined>();
  const [selectedPersonTmdbId, setSelectedPersonTmdbId] = useState<number | undefined>();
  const [showMovieSelectModal, setShowMovieSelectModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState<'select' | 'create'>('select');

  const minReleaseYear = event.year - 1;

  const resetSearch = () => {
    setSelectedMovieTmdbId(undefined);
    setSelectedPersonTmdbId(undefined);
    setPersonSearchResults([]);
    setMovieSearchResults([]);
    setSearchMessage('');
    setResetSearchHack(!resetSearchHack); // resets searchbar
  };

  const getPerformancePrediction = (personTmdbId: number, movieTmdbId: number) => {
    return communityPredictions.find(
      (p) =>
        p.contenderPerson?.tmdbId === personTmdbId &&
        p.contenderMovie?.tmdbId === movieTmdbId,
    );
  };

  // handles the search
  useEffect(() => {
    handleSearch(searchInput);
  }, [debouncedSearch]);

  // block runs after createContender mutation succeeds
  useEffect(() => {
    if (response && selectedPersonTmdbId && selectedMovieTmdbId) {
      onSelectPrediction(response);
      resetSearch();
    }
  }, [response]);

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
    console.log('selectedPersonTmdbId', selectedPersonTmdbId);
    if (!selectedPersonTmdbId) return;
    // get performances associated with movie. if songs associated, show modal to select song. if no songs associated, show modal to create song
    const movies = communityPredictions.filter(
      (p) => p.contenderMovie?.tmdbId === selectedMovieTmdbId,
    );
    setModalState(movies.length === 0 ? 'create' : 'select');
    getPersonRecentMovies(selectedPersonTmdbId);
  };

  const onConfirmContender = async () => {
    if (!selectedMovieTmdbId || !selectedPersonTmdbId) return;
    // can check that selectedTmdbId is not already associated with a contender in our category list
    const maybeAlreadyExistingPrediction = getPerformancePrediction(
      selectedPersonTmdbId,
      selectedMovieTmdbId,
    );
    if (maybeAlreadyExistingPrediction) {
      // this performance has already been added
      onSelectPrediction(maybeAlreadyExistingPrediction);
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
    accolade: undefined,
    visibility: ContenderVisibility.VISIBLE,
    predictionType: PredictionType.NOMINATION, // they only add predictions for nominations
    contenderId: m.tmdbId.toString(),
    contenderMovie: {
      id: m.tmdbId.toString(),
      tmdbId: m.tmdbId,
    },
  }));

  // these are sort of "fake" values
  const personData: iPrediction[] = personSearchResults.map((p) => ({
    ranking: 0,
    accolade: undefined,
    visibility: ContenderVisibility.VISIBLE,
    predictionType: PredictionType.NOMINATION, // they only add predictions for nominations
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
        header={{
          title: modalState === 'create' ? 'For Which Movie?' : 'Select Performance',
        }}
      >
        {modalState === 'create' ? (
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
        ) : (
          <SelectExistingPerformance
            data={communityPredictions.filter(
              (p) => p.contenderMovie?.tmdbId === selectedMovieTmdbId,
            )}
            getPerformancePrediction={getPerformancePrediction}
            onCreateNew={() => setModalState('create')}
            onSelectPrediction={onSelectPrediction}
          />
        )}
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
                    console.log('tmdbId', tmdbId);
                    if (selectedPersonTmdbId === tmdbId) {
                      setSelectedPersonTmdbId(undefined);
                    } else {
                      setSelectedPersonTmdbId(tmdbId);
                    }
                  }}
                  disablePaddingBottom
                  categoryType={CategoryType.PERFORMANCE}
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

const SelectExistingPerformance = (props: {
  data: iPrediction[];
  getPerformancePrediction: (
    personTmdbId: number,
    movieTmdbId: number,
  ) => iPrediction | undefined;
  onCreateNew: () => void;
  onSelectPrediction: (p: iPrediction) => void;
}) => {
  const { data, getPerformancePrediction, onCreateNew, onSelectPrediction } = props;

  const [selectedPerformance, setSelectedPerformance] = useState<
    { personTmdbId: number; movieTmdbId: number } | undefined
  >(undefined);

  return (
    <>
      <View style={{ height: '84%' }}>
        <PerformanceListSelectable
          predictions={data}
          onSelect={(personTmdbId: number, movieTmdbId: number) => {
            if (!personTmdbId) return;
            const songPrediction = getPerformancePrediction(personTmdbId, movieTmdbId);
            if (selectedPerformance?.personTmdbId === personTmdbId) {
              setSelectedPerformance(undefined);
            } else if (songPrediction) {
              setSelectedPerformance({ personTmdbId, movieTmdbId });
            }
          }}
          disablePaddingBottom
        />
      </View>
      <View style={{ height: '10%' }}>
        {selectedPerformance === undefined ? (
          <SubmitButton text={'Create New Song'} onPress={onCreateNew} />
        ) : null}
      </View>
      <FAB
        iconName="plus"
        text="Add"
        onPress={() => {
          if (selectedPerformance) {
            const prediction = getPerformancePrediction(
              selectedPerformance.personTmdbId,
              selectedPerformance.movieTmdbId,
            );
            if (prediction) {
              onSelectPrediction(prediction);
            }
          }
        }}
        visible={selectedPerformance !== undefined}
        bottomPercentage={'5%'}
      />
    </>
  );
};

export default CreatePerformance;
