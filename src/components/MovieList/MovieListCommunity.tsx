import React, { useCallback, useState } from 'react';
import { Divider } from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import COLORS from '../../constants/colors';
import LastUpdatedText from '../LastUpdatedText';
import ContenderListItem, {
  getContenderListItemHeight,
} from '../List/ContenderList/ContenderListItem';
import { Phase, iPrediction } from '../../models';
import { getTotalNumPredicting } from '../../util/getNumPredicting';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../navigation/types';
import { useRouteParams } from '../../hooks/useRouteParams';
import useDevice from '../../util/device';
import { getSlotsInPhase } from '../../util/getSlotsInPhase';
import useQueryGetEventAccolades from '../../hooks/queries/useQueryGetEventAccolades';
import { FlashList } from '@shopify/flash-list';
import { SubHeader } from '../Text';
import { getPredictionStatsFromPredictions } from '../../util/getNumCorrectPredictions';
import theme from '../../constants/theme';

export const PREDICT_STAT_WIDTH = 120;

type iMovieListProps = {
  predictions: iPrediction[];
  lastUpdatedString: string;
  totalUsersPredicting?: number;
};

// TODO: Might want to combine with MovieListCommunity eventually
const MovieListCommunity = ({
  predictions,
  lastUpdatedString,
  totalUsersPredicting,
}: iMovieListProps) => {
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { isPad } = useDevice();
  const { width } = useWindowDimensions();
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

  const nominationsHaveNotHappened =
    phase && [Phase.SHORTLIST, Phase.NOMINATION].includes(phase);
  const displayNoExtraSlots = !nominationsHaveNotHappened && !yyyymmdd;

  // for leaderboard: get riskiness of all contenders that user earned points for
  const { numCorrectPredictions } = showAccolades
    ? getPredictionStatsFromPredictions({
        predictions,
        communityPredictions: predictions,
        totalUsersPredicting,
        slots,
        contenderIdsToPhase,
      })
    : { numCorrectPredictions: 0 };

  return (
    <FlashList
      data={predictions.slice(0, numToShow)}
      keyExtractor={(item) => item.contenderId}
      contentContainerStyle={{ paddingBottom: 200 }}
      ListHeaderComponent={
        <>
          <LastUpdatedText lastUpdated={lastUpdatedString} />
          {showAccolades ? (
            <SubHeader
              style={{
                alignSelf: 'flex-end',
                marginRight: theme.windowMargin,
                marginTop: 5, // bc last updated text appears
                marginBottom: 10,
              }}
            >{`${numCorrectPredictions}/${slots}`}</SubHeader>
          ) : null}
        </>
      }
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
        const accoladeMatchesPhase = phase === accolade;
        return (
          <>
            {index === slots ? (
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
              isUnaccaloded={showAccolades && !accoladeMatchesPhase}
              displayNoExtraSlots={displayNoExtraSlots}
            />
          </>
        );
      }}
      estimatedItemSize={getContenderListItemHeight(width)}
    />
  );
};

export default MovieListCommunity;
