import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useEvent } from '../../../context/EventContext';
import { PredictionsParamList } from '../../../navigation/types';
import { iPrediction } from '../../../types/api';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import { sortPredictions } from '../../../util/sortPredictions';

/**
 * Lists all community predictions with the ones you've selected
 */
export const usePredictions = () => {
  const {
    params: { initialPredictions, onFinish },
  } = useRoute<RouteProp<PredictionsParamList, 'AddPredictions'>>();
  const navigation = useNavigation();
  const { category: _category } = useEvent();
  const category = _category!;

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { data: communityPredictionData } = useQueryGetCommunityPredictions();
  const communityPredictions = sortPredictions(
    communityPredictionData?.categories[category].predictions ?? [],
  );

  const [selectedPredictions, setSelectedPredictions] =
    useState<iPrediction[]>(initialPredictions);

  const selectedContenderIds = selectedPredictions.map((sp) => sp.contenderId);
  const initiallySelectedContenderIds = initialPredictions.map((p) => p.contenderId);

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

  // TODO: what happens to movies we just added?
  // It gets put at the bottom of "selectedPredictions"
  const totallyNewContenders = selectedPredictions.filter(
    (sp) =>
      !initiallySelectedContenderIds.find((id) => id === sp.contenderId) &&
      !communityPredictions.find((p) => p.contenderId === sp.contenderId),
  );
  // put totally new contenders at the top
  const communityPredictionsWithJustAddedAtTop = [
    ...totallyNewContenders,
    ...communityPredictions.filter(
      (p) => !totallyNewContenders.find((newP) => newP.contenderId === p.contenderId),
    ),
  ];

  return {
    communityPredictions: communityPredictionsWithJustAddedAtTop,
    selectedPredictions,
    setSelectedPredictions,
    selectedContenderIds,
    initiallySelectedContenderIds,
    onSave,
  };
};
