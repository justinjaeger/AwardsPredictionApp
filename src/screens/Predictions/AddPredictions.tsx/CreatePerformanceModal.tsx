import React, { useEffect, useState } from 'react';
import Snackbar from '../../../components/Snackbar';
import { useEvent } from '../../../context/EventContext';
import MovieListSearch from '../../../components/MovieList/MovieListSearch';
import { FAB } from '../../../components/Buttons/FAB';
import BasicModal from '../../../components/BasicModal';
import { CategoryType, iPrediction } from '../../../types/api';
import TmdbServices, { iSearchData } from '../../../services/tmdb';
import MovieListSelectable from '../../../components/MovieList/MovieListSelectable';
import { useAsyncEffect } from '../../../util/hooks';
import { SubmitButton } from '../../../components/Buttons';
import ListItemSkeleton from '../../../components/Skeletons/ListItemSkeleton';
import { PosterSize } from '../../../constants/posterDimensions';
import { View } from 'react-native';

const CreatePerformanceModal = ({
  visible,
  selectedPersonTmdbId,
  communityPredictions,
  onClose,
  onAddContender,
  addItemToPredictions,
}: {
  visible: boolean;
  selectedPersonTmdbId: number;
  communityPredictions: iPrediction[];
  onClose: () => void;
  onAddContender: (
    movieTmdbId: number,
    personTmdbId?: number,
    songTitle?: string,
    songArtist?: string,
  ) => void;
  addItemToPredictions: (prediction: iPrediction) => void;
}) => {
  const { event } = useEvent();
  const minReleaseYear = event!.year - 1;

  const communityPredictionsWithPerson = communityPredictions.filter(
    (p) => p.personTmdbId === selectedPersonTmdbId,
  );

  const [modalState, setModalState] = useState<'select' | 'create'>('select');
  const [moviesWithPerson, setMoviesWithPerson] = useState<iSearchData[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);

  // initial load...
  useEffect(() => {
    setModalState(communityPredictionsWithPerson.length > 0 ? 'select' : 'create');
  }, []);

  useAsyncEffect(async () => {
    if (modalState === 'create') {
      setIsLoadingMovies(true);
      const { data: _searchData } = await TmdbServices.getTmdbPersonMovieCredits(
        selectedPersonTmdbId,
        minReleaseYear,
      );
      console.log('_searchData', _searchData);
      setIsLoadingMovies(false);
      if (!_searchData || _searchData.length === 0) {
        Snackbar.warning('This actor has no upcoming films');
        return;
      }
      if (_searchData) {
        setMoviesWithPerson(_searchData);
      }
    }
  }, [modalState]);

  const onCloseModal = () => {
    onClose();
    setModalState('select');
    setIsLoadingMovies(false);
  };

  const [selectedExistingPrediction, setSelectedExistingPrediction] = useState<
    iPrediction | undefined
  >(undefined);
  const [selectedMovieTmdb, setSelectedMovieTmdb] = useState<number | undefined>(
    undefined,
  );

  return (
    <BasicModal
      visible={visible}
      onClose={onCloseModal}
      width={'100%'}
      height={'80%'}
      header={{
        title: modalState === 'create' ? 'For which movie?' : 'Select performance',
      }}
    >
      {modalState === 'create' ? (
        <>
          {!isLoadingMovies ? (
            <MovieListSearch
              data={moviesWithPerson}
              onSelect={(tmdbId) => {
                setSelectedMovieTmdb(selectedMovieTmdb === tmdbId ? undefined : tmdbId);
              }}
              categoryType={CategoryType.FILM}
            />
          ) : (
            <ListItemSkeleton posterWidth={PosterSize.MEDIUM} />
          )}
          <FAB
            iconName="plus"
            text="Select"
            onPress={() => {
              if (selectedMovieTmdb) {
                onAddContender(selectedMovieTmdb, selectedPersonTmdbId);
                onCloseModal();
              }
            }}
            visible={!!selectedMovieTmdb}
            bottomPercentage={'20%'}
          />
        </>
      ) : (
        <>
          <View style={{ height: '90%', position: 'relative' }}>
            <MovieListSelectable
              predictions={communityPredictionsWithPerson}
              selectedPredictions={
                selectedExistingPrediction ? [selectedExistingPrediction] : []
              }
              setSelectedPredictions={(ps) => {
                setSelectedExistingPrediction(
                  ps.length === 0 ? undefined : ps[ps.length - 1],
                );
              }}
            />
            {!selectedExistingPrediction ? (
              <SubmitButton
                style={{ position: 'absolute', bottom: 0, width: 100 }}
                text={'Add New Performance'}
                onPress={() => {
                  setModalState('create');
                }}
              />
            ) : null}
          </View>
          <FAB
            iconName="plus"
            text="Select"
            onPress={() => {
              if (selectedExistingPrediction) {
                addItemToPredictions(selectedExistingPrediction);
                onCloseModal();
              }
            }}
            visible={!!selectedExistingPrediction}
            bottomPercentage={'20%'}
          />
        </>
      )}
    </BasicModal>
  );
};

export default CreatePerformanceModal;
