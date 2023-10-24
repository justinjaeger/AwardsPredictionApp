import React, { useEffect } from 'react';
import { useEvent } from '../../../context/EventContext';
import { CATEGORY_TYPE_TO_STRING } from '../../../constants/categories';
import Snackbar from '../../../components/Snackbar';
import { PredictionsParamList } from '../../../navigation/types';
import CreateContender from '../CreateContender';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import BackButton from '../../../components/Buttons/BackButton';
import { useTypedNavigation } from '../../../util/hooks';
import { usePredictions } from './usePredictions';
import { iPrediction } from '../../../types/api';
import { getPhaseUserIsPredicting } from '../../../util/getPhaseUserIsPredicting';

const AddPredictions = () => {
  const navigation = useTypedNavigation<PredictionsParamList>();

  const { category: _category, event: _event } = useEvent();
  const category = _category!;
  const event = _event!;

  const { shortlistDateTime, isHidden, type } = event.categories[category];

  const phaseUserIsPredicting = getPhaseUserIsPredicting(event, shortlistDateTime);
  const letUserCreateContenders = !isHidden && phaseUserIsPredicting === undefined;

  const {
    selectedPredictions,
    setSelectedPredictions,
    communityPredictions,
    onSave,
    selectedContenderIds,
  } = usePredictions();

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
      const newSelected = [...selectedPredictions, prediction];
      setSelectedPredictions(newSelected);
    }
  };

  return (
    <BackgroundWrapper>
      <CreateContender
        onSelectPrediction={onSelectPredictionFromSearch}
        letUserCreateContenders={letUserCreateContenders}
        selectedPredictions={selectedPredictions}
        setSelectedPredictions={setSelectedPredictions}
        communityPredictions={communityPredictions}
        onSave={onSave}
      />
    </BackgroundWrapper>
  );
};

export default AddPredictions;
