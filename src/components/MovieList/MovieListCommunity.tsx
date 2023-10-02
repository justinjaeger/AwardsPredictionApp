import { Divider } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useEvent } from '../../context/EventContext';
import LastUpdatedText from '../LastUpdatedText';
import ContenderListItem, {
  iContenderListItemProps,
} from '../List/ContenderList/ContenderListItem';
import { BodyBold } from '../Text';
import { EventStatus, iPrediction } from '../../types/api';

type iMovieListProps = {
  predictions: iPrediction[];
  lastUpdatedString: string;
  isCollapsed?: boolean;
  disableHeader?: boolean;
};

const MovieListCommunity = ({
  predictions,
  isCollapsed,
  lastUpdatedString,
  disableHeader,
}: iMovieListProps) => {
  const { event: _event, category: _category } = useEvent();
  const event = _event!;
  const category = _category!;
  const { nomDateTime, status } = event;
  const { slots: _slots, type } = event.categories[category];
  const slots = _slots ?? 5;

  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>(); // this selection is whether the film is big or not

  const nominationsHaveHappened =
    (nomDateTime && nomDateTime < new Date()) || status === EventStatus.WINS_LIVE;

  return (
    <FlatList
      data={predictions}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListHeaderComponent={
        <>
          <LastUpdatedText lastUpdated={lastUpdatedString} />
          {predictions.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: theme.windowMargin,
                paddingTop: disableHeader ? 0 : undefined,
              }}
            >
              <View style={{ flexDirection: 'row' }} />
              {!disableHeader ? (
                <Animated.View
                  style={{
                    flexDirection: 'row',
                    width: 120,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {nominationsHaveHappened ? (
                    <View />
                  ) : (
                    <View>
                      <BodyBold style={{ textAlign: 'right' }}>Predict</BodyBold>
                      <BodyBold style={{ textAlign: 'right' }}>Nom</BodyBold>
                    </View>
                  )}
                  <View>
                    <BodyBold style={{ textAlign: 'right' }}>Predict</BodyBold>
                    <BodyBold style={{ textAlign: 'right' }}>Win</BodyBold>
                  </View>
                </Animated.View>
              ) : null}
            </View>
          ) : null}
        </>
      }
      renderItem={({ item: prediction, index }) => {
        const ranking = index + 1;
        const onPressItem = async (prediction: iPrediction) => {
          if (isCollapsed) return; // do nothing if is collapsed
          const id = prediction.contenderId;
          if (selectedContenderId === id) {
            setSelectedContenderId(undefined);
          } else {
            setSelectedContenderId(id);
          }
        };
        const listItemProps: iContenderListItemProps = {
          variant: 'community',
          prediction,
          ranking,
          isSelected: selectedContenderId === prediction.contenderId,
          onPressItem,
          onPressThumbnail: onPressItem,
          categoryType: type,
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
