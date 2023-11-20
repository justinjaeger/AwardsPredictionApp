import React, { useCallback, useState } from 'react';
import { FlatList, Keyboard } from 'react-native';
import { useEvent } from '../../context/EventContext';
import { removePredictionFromList } from '../../util/removePredictionFromList';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import { iPrediction } from '../../types/api';
import { getTotalNumPredicting } from '../../util/getNumPredicting';
import COLORS from '../../constants/colors';
import { hexToRgb } from '../../util/hexToRgb';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../navigation/types';

type iMovieListProps = {
  predictions: iPrediction[];
  selectedPredictions: iPrediction[]; // for "add predictions"
  // Do either/or for the below. "setSelectedPrediction" is more of a hack for the "add performance/song" modal
  setSelectedPrediction?: (p: iPrediction) => void;
  setSelectedPredictions?: React.Dispatch<React.SetStateAction<iPrediction[]>>; // for "add predictions"
};

const MovieListSelectable = ({
  predictions,
  selectedPredictions,
  setSelectedPrediction,
  setSelectedPredictions,
}: iMovieListProps) => {
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { event: _event, category: _category } = useEvent();
  const category = _category!;
  const event = _event!;
  const { type } = event.categories[category];

  const onPressItem = useCallback(async (prediction: iPrediction) => {
    navigation.navigate('ContenderInfoModal', { prediction });
  }, []);

  const onToggleItem = useCallback(async (prediction: iPrediction) => {
    Keyboard.dismiss();
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

  const [numToShow, setNumToShow] = useState<number>(20);

  const onEndReached = () => {
    setNumToShow(numToShow + 10);
  };

  const selectedContenderIds = (selectedPredictions || []).map((sp) => sp.contenderId);

  return (
    <FlatList
      data={predictions.slice(0, numToShow)}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
      onScroll={() => {
        Keyboard.dismiss();
      }}
      onScrollEndDrag={(e) => {
        // Fetches more at bottom of scroll. Note the high event throttle to prevent too many requests
        // get position of current scroll
        const currentOffset = e.nativeEvent.contentOffset.y;
        // get max bottom of scroll
        const maxOffset =
          e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
        // if we're close to the bottom fetch more
        if (currentOffset > maxOffset - 200) {
          onEndReached();
        }
      }}
      onEndReachedThreshold={0.5} // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down
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
