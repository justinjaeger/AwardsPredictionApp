import React, { useCallback, useState } from 'react';
import { Divider } from '@ui-kitten/components';
import { FlatList } from 'react-native';
import COLORS from '../../constants/colors';
import LastUpdatedText from '../LastUpdatedText';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import { iPrediction } from '../../types/api';
import { getTotalNumPredicting } from '../../util/getNumPredicting';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../navigation/types';
import { useRouteParams } from '../../hooks/useRouteParams';
import useDevice from '../../util/device';
import { getSlotsInPhase } from '../../util/getSlotsInPhase';
import useQueryGetEventAccolades from '../../hooks/queries/useQueryGetEventAccolades';

export const PREDICT_STAT_WIDTH = 120;

type iMovieListProps = {
  predictions: iPrediction[];
  lastUpdatedString: string;
};

// TODO: Might want to combine with MovieListCommunity eventually
const MovieListCommunity = ({ predictions, lastUpdatedString }: iMovieListProps) => {
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { isPad } = useDevice();
  const {
    eventId,
    event: _event,
    category: _category,
    categoryData,
    yyyymmdd,
    phase,
    noShorts,
    isLeaderboard,
  } = useRouteParams();
  const showAccolades = !!yyyymmdd;
  const event = _event!;
  const category = _category!;

  const { data: contenderIdsToPhase } = useQueryGetEventAccolades(eventId);

  const { slots: _slots, type } = categoryData!;
  const slotsInPhase = getSlotsInPhase(phase, categoryData);
  const slots = showAccolades ? slotsInPhase : _slots ?? 5;

  const totalNumPredictingTop = getTotalNumPredicting(
    predictions?.[0]?.numPredicting ?? {},
  );

  const [numToShow, setNumToShow] = useState<number>(20);

  const onEndReached = () => {
    setNumToShow(numToShow + 10);
  };

  const onPressItem = useCallback(async (prediction: iPrediction) => {
    navigation.navigate('ContenderInfoModal', {
      prediction,
      category,
      eventId: event._id,
      yyyymmdd,
      phase,
      noShorts,
      isLeaderboard,
    });
  }, []);

  return (
    <FlatList
      data={predictions.slice(0, numToShow)}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListHeaderComponent={<LastUpdatedText lastUpdated={lastUpdatedString} />}
      onScroll={(e) => {
        // Fetches more at bottom of scroll. Note the high event throttle to prevent too many requests
        // get position of current scroll
        const currentOffset = e.nativeEvent.contentOffset.y;
        // get max bottom of scroll
        const maxOffset =
          e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
        // if we're close to the bottom fetch more
        if (currentOffset > maxOffset - 200 && onEndReached) {
          onEndReached();
        }
      }}
      scrollEventThrottle={500}
      onEndReachedThreshold={isPad ? 0.8 : 0.5} // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down
      showsVerticalScrollIndicator={false}
      renderItem={({ item: prediction, index }) => {
        const accolade = contenderIdsToPhase?.[prediction.contenderId];
        return (
          <>
            {index === slots && !showAccolades ? (
              <Divider
                style={{
                  margin: 10,
                  borderWidth: 0.5,
                  borderColor: COLORS.secondary,
                }}
              />
            ) : null}
            <ContenderListItem
              prediction={prediction}
              ranking={index + 1}
              showHistogram
              onPressItem={() => onPressItem(prediction)}
              categoryType={type}
              totalNumPredictingTop={totalNumPredictingTop}
              accolade={accolade}
              isUnaccaloded={showAccolades && !accolade}
            />
          </>
        );
      }}
    />
  );
};

export default MovieListCommunity;
