import React, { useState } from 'react';
import { Animated, View } from 'react-native';
import { iCategoryListProps } from '.';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import HeaderButton from '../../../components/HeaderButton';
import ContenderListItem from '../../../components/List/ContenderList/ContenderListItem';
import MovieGrid from '../../../components/MovieGrid';
import { BodyLarge } from '../../../components/Text';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import useQueryCommunityOrPersonalEvent from '../../../hooks/getCommunityOrPersonalEvent';
import { iCategory, iEvent } from '../../../store/types';
import { CategoryHeader } from '../styles';

// NOTE: Has a lot in common with ContenderListDraggable
const CategoryCommunity = (props: iCategoryListProps) => {
  const { display, delayedDisplay, toggleDisplay, gridOpacity, listOpacity } = props;

  const { category: _category, displayContenderInfo, event: _event } = useCategory();

  const category = _category as iCategory;
  const event = _event as iEvent;

  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>();

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { data: predictionData, isLoading } = useQueryCommunityOrPersonalEvent(
    'community',
    event,
  );
  const predictions = (predictionData || {})[category.id];

  if (isLoading || !predictions) {
    return null;
  }

  return (
    <BackgroundWrapper>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <CategoryHeader>
          <View style={{ flexDirection: 'row' }}>
            <HeaderButton
              onPress={() => {
                toggleDisplay();
              }}
              icon={display === 'grid' ? 'list' : display === 'list' ? 'grid' : ''}
            />
          </View>
          <Animated.View
            style={{
              flexDirection: 'row',
              width: 120,
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: listOpacity,
            }}
          >
            <View>
              <BodyLarge style={{ textAlign: 'right' }}>Predict</BodyLarge>
              <BodyLarge style={{ textAlign: 'right' }}>Nom</BodyLarge>
            </View>
            <View>
              <BodyLarge style={{ textAlign: 'right' }}>Predict</BodyLarge>
              <BodyLarge style={{ textAlign: 'right' }}>Win</BodyLarge>
            </View>
          </Animated.View>
        </CategoryHeader>
        <Animated.ScrollView
          style={{
            display: delayedDisplay === 'grid' ? 'flex' : 'none',
            opacity: gridOpacity,
          }}
          contentContainerStyle={{
            paddingBottom: 100,
            marginTop: theme.windowMargin,
          }}
        >
          <Animated.View style={{ opacity: gridOpacity }}>
            <MovieGrid predictions={predictions} />
          </Animated.View>
        </Animated.ScrollView>
        <Animated.FlatList
          data={predictions}
          keyExtractor={(item) => item.contenderId}
          style={{
            display: delayedDisplay === 'list' ? 'flex' : 'none',
            opacity: listOpacity,
            width: '100%',
          }}
          renderItem={({ item: prediction, index: i }) => (
            <ContenderListItem
              variant={'community'}
              prediction={prediction}
              ranking={i + 1}
              selected={selectedContenderId === prediction.contenderId}
              onPressItem={(item) => {
                const id = item.contenderId;
                if (selectedContenderId === id) {
                  setSelectedContenderId(undefined);
                } else {
                  setSelectedContenderId(id);
                }
              }}
              onPressThumbnail={(prediction) =>
                displayContenderInfo(
                  prediction.contenderId,
                  prediction.contenderPerson?.tmdbId,
                )
              }
            />
          )}
        />
        {predictions && predictions.length === 0 ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BodyLarge>No films in this list</BodyLarge>
          </View>
        ) : null}
      </View>
    </BackgroundWrapper>
  );
};

export default CategoryCommunity;
