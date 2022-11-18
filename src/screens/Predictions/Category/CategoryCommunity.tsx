import React, { useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';
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
  const { display, toggleDisplay, gridOpacity, listOpacity } = props;

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
          alignItems: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
          }}
        >
          <>
            <CategoryHeader
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <HeaderButton
                  onPress={() => {
                    toggleDisplay();
                  }}
                  icon={display === 'grid' ? 'list' : display === 'list' ? 'grid' : ''}
                />
              </View>
              <View>
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
              </View>
            </CategoryHeader>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 100,
                marginTop: theme.windowMargin,
              }}
            >
              <Animated.View style={{ opacity: gridOpacity, position: 'absolute' }}>
                <MovieGrid predictions={predictions} />
              </Animated.View>
              <Animated.View style={{ opacity: listOpacity }}>
                {predictions.map((prediction, i) => (
                  <ContenderListItem
                    tab={'community'}
                    prediction={prediction}
                    ranking={i + 1}
                    selected={selectedContenderId === prediction.contenderId}
                    toggleSelected={(id: string) => {
                      if (selectedContenderId === id) {
                        setSelectedContenderId(undefined);
                      } else {
                        setSelectedContenderId(id);
                      }
                    }}
                    onPressItem={(item) => {
                      setSelectedContenderId(item.contenderId);
                    }}
                    onPressThumbnail={displayContenderInfo}
                  />
                ))}
              </Animated.View>
            </ScrollView>
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
          </>
        </View>
      </View>
    </BackgroundWrapper>
  );
};

export default CategoryCommunity;
