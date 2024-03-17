import React, { useCallback } from 'react';
import { Divider } from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import COLORS from '../../constants/colors';
import LastUpdatedText from '../LastUpdatedText';
import ContenderListItem, {
  getContenderListItemHeight,
} from '../List/ContenderList/ContenderListItem';
import { iPrediction } from '../../models';
import { getTotalNumPredicting } from '../../util/getNumPredicting';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../navigation/types';
import { useRouteParams } from '../../hooks/useRouteParams';
import { getSlotsInPhase } from '../../util/getSlotsInPhase';
import useQueryGetEventAccolades from '../../hooks/queries/useQueryGetEventAccolades';
import { FlashList } from '@shopify/flash-list';
import { SubHeader } from '../Text';
import { getPredictionStatsFromPredictions } from '../../util/getNumCorrectPredictions';
import theme from '../../constants/theme';
import { yyyymmddToDate } from '../../util/yyyymmddToDate';

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
  const slotsWhichAreCorrect =
    isLeaderboard && phase ? getSlotsInPhase(phase, categoryData) : _slots || 5;
  const totalNumPredictingTop = getTotalNumPredicting(
    predictions?.[0]?.numPredicting ?? {},
  );

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

  const isHistoryAndIsPreNominations =
    yyyymmdd &&
    event.nomDateTime &&
    yyyymmddToDate(yyyymmdd) < new Date(event.nomDateTime);
  const nominationsHavePassed =
    !isHistoryAndIsPreNominations &&
    event?.nomDateTime &&
    new Date(event.nomDateTime) < new Date();

  // for leaderboard: get riskiness of all contenders that user earned points for
  const { numCorrectPredictions } = showAccolades
    ? getPredictionStatsFromPredictions({
        predictions: predictions,
        communityPredictions: predictions,
        totalUsersPredicting,
        slots: slotsWhichAreCorrect,
        contenderIdsToPhase,
        phase,
      })
    : { numCorrectPredictions: 0 };

  return (
    <FlashList
      data={predictions}
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
            >{`${numCorrectPredictions}/${slotsWhichAreCorrect}`}</SubHeader>
          ) : null}
        </>
      }
      showsVerticalScrollIndicator={false}
      renderItem={({ item: prediction, index }) => {
        const accolade = contenderIdsToPhase?.[prediction.contenderId];
        const accoladeMatchesPhase = phase === accolade;
        return (
          <>
            {index === slotsWhichAreCorrect ? (
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
              displayNoExtraSlots={nominationsHavePassed}
            />
          </>
        );
      }}
      estimatedItemSize={getContenderListItemHeight(width)}
    />
  );
};

export default MovieListCommunity;
