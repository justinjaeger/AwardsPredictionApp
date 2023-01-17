import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useCategory } from '../../../context/CategoryContext';
import useQueryCommunityEvent from '../../../hooks/queries/getCommunityEvent';
import { PredictionsParamList } from '../../../navigation/types';
import { iCategory, iEvent, iPrediction } from '../../../types';

export const usePredictions = () => {
  const {
    params: { initialPredictions, onFinish },
  } = useRoute<RouteProp<PredictionsParamList, 'AddPredictions'>>();
  const navigation = useNavigation();
  const { category: _category, event: _event } = useCategory();

  const category = _category as iCategory;
  const event = _event as iEvent;

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { data: communityData } = useQueryCommunityEvent({ event });
  const communityDataPredictions = communityData?.[category.id]?.predictions || [];

  const [selectedPredictions, setSelectedPredictions] = useState<iPrediction[]>(
    initialPredictions,
  );

  const [hiddenPredictions, setHiddenPredictions] = useState<iPrediction[]>([]); // for predictions that communityPredictions isn't aware of

  const selectedContenderIds = selectedPredictions.map((sp) => sp.contenderId);
  const initiallySelectedContenderIds = initialPredictions.map((p) => p.contenderId);
  const communityPredictions = communityData
    ? [...communityDataPredictions, ...hiddenPredictions]
    : [];

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

  return {
    predictionsInList: communityPredictions,
    selectedPredictions,
    setSelectedPredictions,
    selectedContenderIds,
    initiallySelectedContenderIds,
    onSave,
  };
};
