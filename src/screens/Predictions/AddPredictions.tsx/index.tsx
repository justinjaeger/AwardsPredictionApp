import React, { useEffect, useState } from 'react';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../../types';
import { CATEGORY_TYPE_TO_STRING } from '../../../constants/categories';
import Snackbar from '../../../components/Snackbar';
import { RouteProp, useRoute } from '@react-navigation/native';
import { PredictionsParamList } from '../../../navigation/types';
import useQueryCommunityEvent from '../../../hooks/queries/getCommunityEvent';
import MovieListSelectable from '../../../components/MovieList/MovieListSelectable';
import { useWindowDimensions } from 'react-native';
import SearchInput from '../../../components/Inputs/SearchInput';
import {
  ContenderSearchProvider,
  useContenderSearch,
} from '../../../context/ContenderSearchContext';
import CreateContender from '../CreateContender';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import theme from '../../../constants/theme';
import BackButton from '../../../components/Buttons/BackButton';
import { CategoryIsShortlisted, EventStatus } from '../../../API';
import { useTypedNavigation } from '../../../util/hooks';

export type iCreateContenderProps = {
  onSelectPrediction: (p: iPrediction) => void;
};

// TODO: should only be able to do this if logged in
const AddPredictions = () => {
  const {
    params: { initialPredictions, onFinish },
  } = useRoute<RouteProp<PredictionsParamList, 'AddPredictions'>>();
  const { width } = useWindowDimensions();

  const navigation = useTypedNavigation<PredictionsParamList>();
  const { category: _category, event: _event } = useCategory();

  const category = _category as iCategory;
  const event = _event as iEvent;

  const letUserCreateContenders =
    category.isShortlisted === CategoryIsShortlisted.FALSE &&
    ![EventStatus.WINS_LIVE, EventStatus.ARCHIVED].includes(event.status);

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { data: communityData } = useQueryCommunityEvent({ event });
  const communityDataPredictions = communityData?.[category.id]?.predictions || [];

  const [selectedPredictions, setSelectedPredictions] = useState<iPrediction[]>(
    initialPredictions,
  );
  const [hiddenPredictions, setHiddenPredictions] = useState<iPrediction[]>([]); // for predictions that communityPredictions isn't aware of
  const { isSearching } = useContenderSearch();

  const selectedContenderIds = selectedPredictions.map((sp) => sp.contenderId);
  const initiallySelectedContenderIds = initialPredictions.map((p) => p.contenderId);
  const communityPredictions = communityData
    ? [...communityDataPredictions, ...hiddenPredictions]
    : [];

  // TODO: can move this into a hook
  useEffect(() => {
    // get all selectedPredictions that communityData doesn't include so we can include them in list
    // want to only add new ones to hiddenPredictions if we unselect, we don't want it to go away
    const communityDataContenderIds = communityDataPredictions.map((p) => p.contenderId);
    const hiddenPredictionContenderIds = hiddenPredictions.map((p) => p.contenderId);
    const newHiddenPredictions = selectedPredictions.filter(
      (p) =>
        !communityDataContenderIds.includes(p.contenderId) &&
        !hiddenPredictionContenderIds.includes(p.contenderId),
    );
    setHiddenPredictions([...hiddenPredictions, ...newHiddenPredictions]);
  }, [selectedPredictions.length]);

  // set custom back arrow functionality
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={onSave} />,
    });
  }, [navigation]);

  const onSave = async () => {
    // Below: we have to re-order the predictions so that the NEW films are at the bottom, so it doesn't change the previous order
    // films that we JUST added
    const addedContenderIds = selectedContenderIds.filter(
      (id) => !initiallySelectedContenderIds.includes(id),
    );
    // films that we JUST deleted
    const deletedContenderIds = initiallySelectedContenderIds.filter(
      (id) => !selectedContenderIds.includes(id),
    );
    // films that remain on the list
    const notDeletedContenderIds = initiallySelectedContenderIds.filter(
      (id) => !deletedContenderIds.includes(id),
    );
    // place the films that were UNCHANGED at the top, in the same order, with the new ones at the bottom
    const updatedContenderIds = [...notDeletedContenderIds, ...addedContenderIds];
    // doesn't need to be a reduce, but since "find" can technically return a null value, even though it shouldn't, this is more typesafe
    const sortedPredictions = updatedContenderIds.reduce((acc: iPrediction[], id) => {
      const prediction = selectedPredictions.find((p) => p.contenderId === id);
      if (prediction) {
        acc.push(prediction);
      }
      return acc;
    }, []);
    onFinish(sortedPredictions);
    navigation.goBack();
  };

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
          placeholder={'Search Movies'}
          style={{ width, padding: theme.windowMargin }}
        />
      ) : null}
      {isSearching ? (
        <CreateContender onSelectPrediction={onSelectPredictionFromSearch} />
      ) : (
        <MovieListSelectable
          predictions={communityPredictions}
          selectedPredictions={selectedPredictions}
          setSelectedPredictions={(ps) => setSelectedPredictions(ps)}
        />
      )}
    </>
  );
};

const AddPredictionsWithProvider = () => (
  <ContenderSearchProvider>
    <BackgroundWrapper>
      <AddPredictions />
    </BackgroundWrapper>
  </ContenderSearchProvider>
);

export default AddPredictionsWithProvider;
