import React, { useEffect, useState } from 'react';
import Snackbar from '../../../components/Snackbar';
import { Body } from '../../../components/Text';
import { View } from 'react-native';
import { useEvent } from '../../../context/EventContext';
import COLORS from '../../../constants/colors';
import MovieListSearch from '../../../components/MovieList/MovieListSearch';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import { FAB } from '../../../components/Buttons/FAB';
import useMutationCreateActingContender from '../../../hooks/mutations/useMutationCreateActingContender';
import BasicModal from '../../../components/BasicModal';
import { iCreateContenderProps } from '.';
import { SubmitButton } from '../../../components/Buttons';
import PerformanceListSelectable from '../../../components/MovieList/PerformanceListSelectable';
import { useSearch } from '../../../context/ContenderSearchContext';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import { CategoryType, Movie, Person, iPrediction } from '../../../types/api';
import TmdbServices, { iSearchData } from '../../../services/tmdb';
import { useTmdbDataStore } from '../../../context/TmdbDataStore';

/**
 * TODO: this file is sort of a mess
 * Because we force format everything to be an iPrediction
 * So we can display it in the conventional list
 */
const CreatePerformance = ({ onSelectPrediction }: iCreateContenderProps) => {
  const { store } = useTmdbDataStore();

  const { setIsLoadingSearch } = useSearch();
  const { category: _category, event: _event } = useEvent();

  const category = _category!;
  const event = _event!;

  // when adding a contender to the list of overall contenders
  const {
    mutate: createActingContender,
    isComplete,
    response,
  } = useMutationCreateActingContender();

  const { searchInput, debouncedSearch, resetSearchHack, setResetSearchHack } =
    useSearch();
  const { data: communityData } = useQueryGetCommunityPredictions();
  const communityPredictions = communityData?.categories[category].predictions || [];

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

  const getPerformancePrediction = (movieTmdbId: number, personTmdbId: number) => {
    const maybePerson = personTmdbId ? (store[personTmdbId] as Person) : undefined;
    // get performances associated with movie.
    const maybeMovie = movieTmdbId ? (store[movieTmdbId] as Movie) : undefined;
    const maybePerformance =
      maybeMovie &&
      maybePerson &&
      communityPredictions.find(
        (p) =>
          p.movieTmdbId === maybeMovie.tmdbId && p.personTmdbId === maybePerson.tmdbId,
      );
    return maybePerformance;
  };

  // handles the search
  useEffect(() => {
    handleSearch(searchInput);
  }, [debouncedSearch]);

  // block runs after createContender mutation succeeds
  useEffect(() => {
    if (response && selectedPersonTmdbId && selectedMovieTmdbId) {
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
    TmdbServices.searchPeople(s)
      .then((res) => {
        setSelectedMovieTmdbId(undefined);
        setSelectedPersonTmdbId(undefined);
        const r = res.data || [];
        setPersonSearchResults(r);
        if (r.length === 0) {
          setSearchMessage('No Results');
        }
      })
      .finally(() => setIsLoadingSearch(false));
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

  const communityMoviesWithPerson = communityPredictions.filter(
    (p) => p.movieTmdbId === (store[selectedMovieTmdbId!] as Movie)?.tmdbId,
  );

  const onSelectPerson = async () => {
    if (!selectedPersonTmdbId) return;
    setModalState(communityMoviesWithPerson.length > 0 ? 'select' : 'create');
    getPersonRecentMovies(selectedPersonTmdbId);
  };

  const onConfirmContender = async () => {
    if (!selectedMovieTmdbId || !selectedPersonTmdbId) return;
    // can check that selectedTmdbId is not already associated with a contender in our category list
    const maybeAlreadyExistingPrediction = getPerformancePrediction(
      selectedMovieTmdbId,
      selectedPersonTmdbId,
    );
    if (maybeAlreadyExistingPrediction) {
      // this performance has already been added
      onSelectPrediction(maybeAlreadyExistingPrediction);
      return;
    }
    await createActingContender({
      eventId: event._id,
      category,
      movieTmdbId: selectedMovieTmdbId,
      personTmdbId: selectedPersonTmdbId,
    });
  };

  // Format is iPrediction to display in the list
  const movieSearchResultsFormatted: iPrediction[] = movieSearchResults.map((m) => ({
    ranking: 0,
    contenderId: m.tmdbId.toString(),
    movieTmdbId: m.tmdbId,
  }));
  const personSearchResultsFormatted: iPrediction[] = personSearchResults.map((p) => ({
    ranking: 0,
    contenderId: p.tmdbId.toString(),
    movieTmdbId: p.tmdbId,
    personTmdbId: p.tmdbId,
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
                predictions={movieSearchResultsFormatted}
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
            data={communityMoviesWithPerson}
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
          {personSearchResultsFormatted.length === 0 ? (
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
                  predictions={personSearchResultsFormatted}
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

const SelectExistingPerformance = ({
  data,
  getPerformancePrediction,
  onCreateNew,
  onSelectPrediction,
}: {
  data: iPrediction[];
  getPerformancePrediction: (
    personTmdbId: number,
    movieTmdbId: number,
  ) => iPrediction | undefined;
  onCreateNew: () => void;
  onSelectPrediction: (p: iPrediction) => void;
}) => {
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
