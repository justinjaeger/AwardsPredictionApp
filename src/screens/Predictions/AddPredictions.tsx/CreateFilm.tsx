import React, { useEffect, useState } from 'react';
import { SubHeader } from '../../../components/Text';
import { View } from 'react-native';
import COLORS from '../../../constants/colors';
import MovieListSearch from '../../../components/MovieList/MovieListSearch';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import { FAB } from '../../../components/Buttons/FAB';
import { CategoryType } from '../../../types/api';
import SearchInput from '../../../components/Inputs/SearchInput';
import MovieListSelectable from '../../../components/MovieList/MovieListSelectable';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { getBiggestPhaseThatHasHappened } from '../../../util/getBiggestPhaseThatHasHappened';
import { usePredictions } from './usePredictions';
import BackButton from '../../../components/Buttons/BackButton';
import useFilmSearch from './useContenderSearch';
import CreatePerformanceModal from './CreatePerformanceModal';
import CreateSongModal from './CreateSongModal';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { getCategoryIsHidden } from '../../../util/getCategoryIsHidden';

const CreateFilm = () => {
  const navigation = useTypedNavigation<PredictionsParamList>();

  const { event: _event, categoryData, category: _category } = useRouteParams();
  const event = _event!;
  const category = _category!;

  const { type } = categoryData!;
  const categoryIsHidden = getCategoryIsHidden(event, category);

  const biggestPhaseThatHasHappened = getBiggestPhaseThatHasHappened(event, category);
  const letUserCreateContenders =
    !categoryIsHidden && biggestPhaseThatHasHappened === undefined;

  const {
    selectedPredictions,
    setSelectedPredictions,
    communityPredictions,
    selectedContenderIds,
    onSave,
  } = usePredictions();

  const {
    searchResults,
    searchMessage,
    isSavingFilm,
    selectedSearchTmdbId,
    setSelectedSearchTmdbId,
    handleSearch,
    resetSearch,
    onAddContender,
    addItemToPredictions,
  } = useFilmSearch({
    categoryType: type,
    communityPredictions,
    selectedContenderIds,
    setSelectedPredictions,
  });

  const [selectedPersonTmdbId, setSelectedPersonTmdbId] = useState<number | undefined>(
    undefined,
  );
  const [selectedMovieTmdbIdForSong, setSelectedMovieTmdbIdForSong] = useState<
    number | undefined
  >(undefined);
  // set custom back arrow functionality
  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => <BackButton onPress={onSave} />,
    });
  }, [navigation]);

  return (
    <>
      <LoadingStatueModal visible={isSavingFilm} text={'Saving film...'} />
      {selectedPersonTmdbId !== undefined ? (
        <CreatePerformanceModal
          visible={selectedPersonTmdbId !== undefined}
          onClose={() => setSelectedPersonTmdbId(undefined)}
          selectedPersonTmdbId={selectedPersonTmdbId}
          communityPredictions={communityPredictions}
          onAddContender={onAddContender}
          addItemToPredictions={addItemToPredictions}
        />
      ) : null}
      {selectedMovieTmdbIdForSong !== undefined ? (
        <CreateSongModal
          visible={selectedMovieTmdbIdForSong !== undefined}
          onClose={() => setSelectedMovieTmdbIdForSong(undefined)}
          selectedMovieTmdbId={selectedMovieTmdbIdForSong}
          communityPredictions={communityPredictions}
          onAddContender={onAddContender}
          addItemToPredictions={addItemToPredictions}
        />
      ) : null}
      {letUserCreateContenders ? (
        <SearchInput
          placeholder={`Search ${type === CategoryType.PERFORMANCE ? 'actors' : 'films'}`}
          handleSearch={handleSearch}
          onReset={() => resetSearch()}
        />
      ) : null}
      {searchMessage ? (
        <SubHeader style={{ marginTop: 40, color: COLORS.white }}>
          {searchMessage}
        </SubHeader>
      ) : searchResults.length ? (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            flex: 1,
          }}
        >
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
                if (selectedSearchTmdbId === tmdbId) {
                  setSelectedSearchTmdbId(undefined);
                } else {
                  setSelectedSearchTmdbId(tmdbId);
                }
              }}
              categoryType={CategoryType.FILM}
            />
          </View>
          <FAB
            iconName="checkmark"
            text="Add"
            onPress={() => {
              if (type === CategoryType.PERFORMANCE && selectedSearchTmdbId) {
                setSelectedPersonTmdbId(selectedSearchTmdbId);
              } else if (type === CategoryType.SONG) {
                setSelectedMovieTmdbIdForSong(selectedSearchTmdbId);
              } else if (type === CategoryType.FILM && selectedSearchTmdbId) {
                onAddContender(selectedSearchTmdbId);
              }
            }}
            visible={selectedSearchTmdbId !== undefined}
          />
        </View>
      ) : (
        <>
          <MovieListSelectable
            predictions={communityPredictions}
            selectedPredictions={selectedPredictions}
            setSelectedPredictions={setSelectedPredictions}
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
