import React, { useEffect } from 'react';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../../types';
import { CATEGORY_TYPE_TO_STRING } from '../../../constants/categories';
import Snackbar from '../../../components/Snackbar';
import { PredictionsParamList } from '../../../navigation/types';
import MovieListSelectable from '../../../components/MovieList/MovieListSelectable';
import SearchInput from '../../../components/Inputs/SearchInput';
import { SearchProvider, useSearch } from '../../../context/ContenderSearchContext';
import CreateContender from '../CreateContender';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import BackButton from '../../../components/Buttons/BackButton';
import { CategoryIsShortlisted, CategoryType, EventStatus } from '../../../API';
import { useTypedNavigation } from '../../../util/hooks';
import { usePredictions } from './usePredictions';
import { FAB } from '../../../components/Buttons/FAB';
import { Animated } from 'react-native';
import { useCategoryDisplay } from '../../../hooks/animatedState/useDisplay';
import { CategoryDisplayFab } from '../../../components/Buttons/DisplayFAB';

export type iCreateContenderProps = {
  onSelectPrediction: (p: iPrediction) => void;
};

const AddPredictions = () => {
  const navigation = useTypedNavigation<PredictionsParamList>();
  const { category: _category, event: _event } = useCategory();

  const category = _category as iCategory;
  const event = _event as iEvent;

  const letUserCreateContenders =
    category.isShortlisted === CategoryIsShortlisted.FALSE &&
    ![EventStatus.WINS_LIVE, EventStatus.ARCHIVED].includes(event.status);

  const {
    predictionsInList,
    selectedPredictions,
    setSelectedPredictions,
    onSave,
    selectedContenderIds,
  } = usePredictions();
  const { delayedDisplay, expandedOpacity, collapsedOpacity } = useCategoryDisplay();

  const { isSearching } = useSearch();

  // set custom back arrow functionality
  useEffect(() => {
    navigation.setOptions({
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
          category.type
        ].toLowerCase()} is already in your predictions`,
      );
    } else {
      Snackbar.success('Added to list');
      const newSelected = [...selectedPredictions, prediction];
      setSelectedPredictions(newSelected);
    }
  };

  return (
    <>
      {letUserCreateContenders ? (
        <SearchInput
          placeholder={
            category.type === CategoryType.PERFORMANCE ? 'Search Actors' : 'Search Movies'
          }
        />
      ) : null}
      {isSearching ? (
        <CreateContender onSelectPrediction={onSelectPredictionFromSearch} />
      ) : (
        <>
          <Animated.View
            style={{
              display: delayedDisplay === 'list' ? 'flex' : 'none',
              opacity: expandedOpacity,
            }}
          >
            <MovieListSelectable
              predictions={predictionsInList}
              selectedPredictions={selectedPredictions}
              setSelectedPredictions={(ps) => setSelectedPredictions(ps)}
            />
          </Animated.View>
          <Animated.View
            style={{
              display: delayedDisplay === 'list-collapsed' ? 'flex' : 'none',
              opacity: collapsedOpacity,
            }}
          >
            <MovieListSelectable
              predictions={predictionsInList}
              selectedPredictions={selectedPredictions}
              setSelectedPredictions={(ps) => setSelectedPredictions(ps)}
              isCollapsed
            />
          </Animated.View>
        </>
      )}
      <CategoryDisplayFab skipGrid />
      <FAB
        iconName="checkmark-outline"
        text="Done"
        onPress={onSave}
        visible={!isSearching} // crutial!! Or else it will overlap the search add button
      />
    </>
  );
};

const AddPredictionsWithProvider = () => (
  <SearchProvider>
    <BackgroundWrapper>
      <AddPredictions />
    </BackgroundWrapper>
  </SearchProvider>
);

export default AddPredictionsWithProvider;
