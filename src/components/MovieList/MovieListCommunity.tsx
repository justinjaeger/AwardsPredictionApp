import React, { useState } from 'react';
import { Divider } from '@ui-kitten/components';
import { FlatList, View } from 'react-native';
import COLORS from '../../constants/colors';
import { useEvent } from '../../context/EventContext';
import LastUpdatedText from '../LastUpdatedText';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import { iPrediction } from '../../types/api';
import { getTotalNumPredicting } from '../../util/getNumPredicting';

export const PREDICT_STAT_WIDTH = 120;

type iMovieListProps = {
  predictions: iPrediction[];
  lastUpdatedString: string;
};

const MovieListCommunity = ({ predictions, lastUpdatedString }: iMovieListProps) => {
  const { event: _event, category: _category } = useEvent();
  const event = _event!;
  const category = _category!;
  const { slots: _slots, type } = event.categories[category];
  const slots = _slots ?? 5;

  const totalNumPredictingTop = getTotalNumPredicting(
    predictions?.[0]?.numPredicting ?? {},
  );

  const [numToShow, setNumToShow] = useState<number>(20);

  const onEndReached = () => {
    setNumToShow(numToShow + 10);
  };

  return (
    <FlatList
      data={predictions.slice(0, numToShow)}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListHeaderComponent={
        <>
          <LastUpdatedText lastUpdated={lastUpdatedString} />
          <View style={{ height: 10 }} />
        </>
      }
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
      renderItem={({ item: prediction, index }) => (
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
            key={prediction.contenderId}
            variant={'community'}
            prediction={prediction}
            ranking={index + 1}
            onPressItem={(prediction: iPrediction) => {
              // TODO: Pull up a modal with more info
            }}
            onPressThumbnail={undefined}
            categoryType={type}
            totalNumPredictingTop={totalNumPredictingTop}
          />
        </>
      )}
    />
  );
};

export default MovieListCommunity;
