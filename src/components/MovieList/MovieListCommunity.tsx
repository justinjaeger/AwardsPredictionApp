import React from 'react';
import { Divider } from '@ui-kitten/components';
import { FlatList, View } from 'react-native';
import COLORS from '../../constants/colors';
import { useEvent } from '../../context/EventContext';
import LastUpdatedText from '../LastUpdatedText';
import ContenderListItem, {
  iContenderListItemProps,
} from '../List/ContenderList/ContenderListItem';
import { iPrediction } from '../../types/api';
import { getTotalNumPredicting } from '../../util/getNumPredicting';

export const PREDICT_STAT_WIDTH = 120;

type iMovieListProps = {
  predictions: iPrediction[];
  lastUpdatedString: string;
  disableHeader?: boolean;
};

const MovieListCommunity = ({
  predictions,
  lastUpdatedString,
  disableHeader,
}: iMovieListProps) => {
  const { event: _event, category: _category } = useEvent();
  const event = _event!;
  const category = _category!;
  const { slots: _slots, type } = event.categories[category];
  const slots = _slots ?? 5;

  const totalNumPredictingTop = getTotalNumPredicting(
    predictions?.[0]?.numPredicting ?? {},
  );

  return (
    <FlatList
      data={predictions}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListHeaderComponent={
        <>
          <LastUpdatedText lastUpdated={lastUpdatedString} />
          <View style={{ height: 10 }} />
        </>
      }
      renderItem={({ item: prediction, index }) => {
        const ranking = index + 1;
        const onPressItem = async (prediction: iPrediction) => {
          // TODO: Pull up a modal with more info
        };
        const listItemProps: iContenderListItemProps = {
          variant: 'community',
          prediction,
          ranking,
          onPressItem,
          onPressThumbnail: onPressItem,
          categoryType: type,
          totalNumPredictingTop,
        };
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
            <ContenderListItem {...listItemProps} />
          </>
        );
      }}
    />
  );
};

export default MovieListCommunity;
