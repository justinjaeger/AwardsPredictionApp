import React from 'react';
import { Animated, View } from 'react-native';
import HeaderButton from '../../../components/HeaderButton';
import HistoryHeader from '../../../components/HistoryHeader';
import MovieGrid from '../../../components/MovieGrid';
import MovieListCommunity from '../../../components/MovieList/MovieListCommunity';
import { Body, BodyBold } from '../../../components/Text';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { useCollapsible } from '../../../hooks/animatedState/useCollapsible';
import { useDisplay } from '../../../hooks/animatedState/useDisplay';
import usePredictionData from '../../../hooks/queries/usePredictionData';
import { iCategory } from '../../../types';
import { formatLastUpdated } from '../../../util/formatDateTime';
import { CategoryHeader } from '../styles';

const CategoryCommunity = () => {
  const {
    display,
    delayedDisplay,
    toggleDisplay,
    gridOpacity,
    listOpacity,
  } = useDisplay();
  const {
    collapsedOpacity,
    expandedOpacity,
    isCollapsed,
    toggleCollapsed,
  } = useCollapsible();

  const { category: _category, date } = useCategory();

  const category = _category as iCategory;

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { predictionData } = usePredictionData('community');
  const predictions = predictionData?.[category.id]?.predictions || [];

  const lastUpdated = predictionData?.[category.id]?.updatedAt;
  const lastUpdatedString = formatLastUpdated(new Date(lastUpdated || ''));
  console.log('lastUpdatedString', lastUpdatedString); // TODO: can do something with this later

  if (!predictions) {
    return null;
  }

  return (
    <>
      <CategoryHeader>
        <View style={{ flexDirection: 'row' }}>
          <HeaderButton
            onPress={() => {
              toggleDisplay();
            }}
            icon={display === 'grid' ? 'list' : 'grid'}
          />
          <Animated.View style={{ opacity: listOpacity }}>
            <HeaderButton
              onPress={toggleCollapsed}
              icon={isCollapsed ? 'collapse' : 'expand'}
            />
          </Animated.View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {date === undefined ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Body>{`Updated: ${lastUpdatedString}`}</Body>
            </View>
          ) : null}
          <HistoryHeader />
        </View>
      </CategoryHeader>
      {predictions && predictions.length === 0 ? (
        <View
          style={{
            width: '100%',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BodyBold>
            {date === undefined
              ? 'Community predictions not yet tallied'
              : 'No predictions for this date'}
          </BodyBold>
        </View>
      ) : null}
      <Animated.ScrollView
        style={{
          display: delayedDisplay === 'grid' ? 'flex' : 'none',
          opacity: gridOpacity,
          width: '100%',
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
      <Animated.View
        style={{
          opacity: listOpacity,
          display: delayedDisplay === 'list' ? 'flex' : 'none',
        }}
      >
        <Animated.View
          style={{
            display: !isCollapsed ? 'flex' : 'none',
            opacity: expandedOpacity,
            width: '100%',
          }}
        >
          <MovieListCommunity predictions={predictions} />
        </Animated.View>
        <Animated.View
          style={{
            display: isCollapsed ? 'flex' : 'none',
            opacity: collapsedOpacity,
          }}
        >
          <MovieListCommunity predictions={predictions} isCollapsed />
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default CategoryCommunity;
