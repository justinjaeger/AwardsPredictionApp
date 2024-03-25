import React, { useCallback } from 'react';
import { FlatList, Keyboard } from 'react-native';
import { removePredictionFromList } from '../../util/removePredictionFromList';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import { iPrediction } from '../../models';
import { getTotalNumPredicting } from '../../util/getNumPredicting';
import COLORS from '../../constants/colors';
import { hexToRgb } from '../../util/hexToRgb';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../navigation/types';
import { useRouteParams } from '../../hooks/useRouteParams';
import { filterDuplicates } from '../../util/filterDuplicates';
import { triggerHaptic } from '../../util/hapticFeedback';

type iMovieListProps = {
  predictions: iPrediction[];
  selectedPredictions: iPrediction[]; // for "add predictions"
  // Do either/or for the below. "setSelectedPrediction" is more of a hack for the "add performance/song" modal
  setSelectedPrediction?: (p: iPrediction) => void;
  setSelectedPredictions?: React.Dispatch<React.SetStateAction<iPrediction[]>>; // for "add predictions"
  anyTapSelectsItem?: boolean;
};

const MovieListSelectable = ({
  predictions,
  selectedPredictions,
  setSelectedPrediction,
  setSelectedPredictions,
  anyTapSelectsItem,
}: iMovieListProps) => {
  const navigation = useNavigation<PredictionsNavigationProp>();
  const {
    categoryData,
    category: _category,
    eventId: _eventId,
    yyyymmdd,
    phase,
    noShorts,
    isLeaderboard,
    event,
  } = useRouteParams();
  const { type } = categoryData!;
  const category = _category!;
  const eventId = _eventId!;

  const onPressItem = useCallback(async (prediction: iPrediction) => {
    if (anyTapSelectsItem) {
      onToggleItem(prediction);
      return;
    }
    navigation.navigate('ContenderInfoModal', {
      prediction,
      category,
      eventId,
      yyyymmdd,
      phase,
      noShorts,
      isLeaderboard,
    });
  }, []);

  const onToggleItem = useCallback(async (prediction: iPrediction) => {
    Keyboard.dismiss();
    triggerHaptic();
    setSelectedPrediction && setSelectedPrediction(prediction);
    setSelectedPredictions &&
      setSelectedPredictions((sp) => {
        const selectedContenderIds = sp.map((p) => p.contenderId);
        const contenderId = prediction.contenderId;
        const isAlreadySelected = selectedContenderIds.includes(contenderId);
        const newSelected = isAlreadySelected
          ? removePredictionFromList(sp, prediction)
          : [...sp, prediction];
        return newSelected;
      });
  }, []);

  const totalNumPredictingTop = getTotalNumPredicting(
    predictions?.[0]?.numPredicting ?? {},
  );

  const selectedContenderIds = (selectedPredictions || []).map((sp) => sp.contenderId);
  const combinedPredictions = filterDuplicates<iPrediction>(
    [...predictions, ...selectedPredictions],
    (p) => p.contenderId,
  );

  const nominationsHavePassed =
    event?.nomDateTime && new Date(event.nomDateTime) < new Date();

  return (
    <FlatList
      data={combinedPredictions}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 300 }}
      keyboardShouldPersistTaps={'always'}
      renderItem={({ item: prediction, index: i }) => {
        const highlighted = selectedContenderIds.includes(prediction.contenderId);

        return (
          <ContenderListItem
            prediction={prediction}
            ranking={i + 1}
            onPressItem={() => {
              onPressItem(prediction);
            }}
            categoryType={type}
            showHistogram
            displayNoExtraSlots={nominationsHavePassed}
            totalNumPredictingTop={totalNumPredictingTop}
            iconRightProps={{
              iconName: highlighted ? 'checkmark-circle-2' : 'radio-button-off',
              iconColor: highlighted ? COLORS.secondaryLight : COLORS.primaryLight,
              onPress: () => {
                onToggleItem(prediction);
              },
              iconSize: 32,
              underlayColor: hexToRgb(COLORS.secondaryDark, 0.2),
            }}
          />
        );
      }}
    />
  );
};

export default MovieListSelectable;
